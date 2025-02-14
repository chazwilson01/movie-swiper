import React, { useState, useEffect, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import './cards.css';
import SwipeButtons from './swipeButtons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import MatchPopup from './match';
import { set } from 'mongoose';

const API_KEY = 'a05a0cbf8d9c0dc8cff08cf2b0fa97fc';
const isLocal = window.location.hostname === "localhost";
const SOCKET_URL = isLocal 
    ? "http://localhost:10000" 
    : "https://movie-swiper-backend.onrender.com";


const Card = () => {

    const location = useLocation()
    const [movies, setMovies] = useState([]);
    const [preloadedMovies, setPreloadedMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showOverview, setShowOverview] = useState(false);
    const [lastDirection, setLastDirection] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isReturn, setIsReturn] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [currentMatch, setCurrentMatch] = useState(null)
    const [userJoined, setUserJoined] = useState(false)
    const [userLeft, setUserLeft] = useState(false)
    const [otherEmail, setOtherEmail] = useState('')
    const [initialFetch, setInitialFetch] = useState(true);

    const [swipeHistory, setSwipeHistory] = useState([])
    const [pages, setPages] = useState(Array.from({ length: 3 }, (_, i) => i + 1));  // Pages 1 to 30


    const currentIndexRef = useRef(currentIndex);
    const childRefs = useMemo(() => Array(movies.length).fill(0).map(() => React.createRef()), [movies]);

    const socket = useRef(null);

    const navigate = useNavigate();
    // Connect to Socket.io
    useEffect(() => {
        const storedSessionId = location.state?.sessionId || sessionStorage.getItem("sessionId");



        if(!location.state || !location.state.sessionId) {
            navigate("/joinSession", {
                state: {
                    error: "Unauthorized Access"
                }
            })
            return
        }

        setSessionId(storedSessionId)
        socket.current = io(SOCKET_URL);

        
        const authUser = JSON.parse(sessionStorage.getItem('authUser'));
        const userEmail = authUser.email
        
        console.log(location.state)
        // Join a session (sessionId can be dynamically set)
        socket.current.emit('joinSession', { sessionId, userEmail });

        socket.current.on('sessionJoined', (data) => {
            console.log('Session joined successfully:', data);
            setLoading(false)
        });

        socket.current.on('sessionFull', (data) => {
            navigate('/joinSession', {
                state: { error: data.message },
            });
        });

        // Listen for match events
        socket.current.on('match', (data) => {
            

            setTimeout(() => {
                console.log('Match found:', data);
                console.log(data.imgUrl)
                setCurrentMatch(data);}, 500)

        });

        
    
        // Handle another user joining
        socket.current.on('userJoined', (data) => {
            setUserJoined(data.usersInSession === 2)
            setUserLeft(false)
            const authUser = JSON.parse(sessionStorage.getItem('authUser'));
            console.log(data)
            const otherEmail = data.emails.find(email => email !== authUser.email);
            console.log(otherEmail)
            setOtherEmail(otherEmail)
            console.log('Another user joined the session:', data.userId);

        });

         // Handle session ending
         socket.current.on('userLeft', (data) => {
            setUserJoined(false)
            setUserLeft(true)
            console.log(data.message)// Notify the user
            // navigate('/homePage');  // Navigate to another page
        });

        socket.current.on("swipeHistory", (swipes) => {
            console.log("SWIPE HISOTRY _ ___________________", swipes.swipes)
            setSwipeHistory(swipes.swipes)
            setMovies([])
            setPages(Array.from({ length: 3 }, (_, i) => i + 1))
    
        
        })

        return () => {
            console.log("ENTEREDEDEDEDEDEDEDED")
            // Disconnect socket when component unmounts
            socket.current.emit("leaveSession", {sessionId})
            socket.current.disconnect();
        };
    }, []);

    // Check authentication
    

    const preloadImage = (url) => {
        const img = new Image();
        img.src = url;
    };

    const fetchMovies = async (initial = false) => {

        console.log(pages)
        if (pages.length === 0) {
            console.log("No more pages to fetch.");
            return;  // Stop fetching if all pages have been used
        }

        const randomIndex = Math.floor(Math.pow(Math.random(), 3) * pages.length);
        const randomPage = pages[randomIndex];
        try {
            console.log("Fetching movies...");    
            // Fetch movies from the TMDB API
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${randomPage}&sort_by=popularity.desc`
            );
            const data = await response.json();
    
            console.log("Fetched movies:", data.results);
            console.log("Swipe history:", swipeHistory);
    
            // Filter out movies the user has already swiped on
            const filteredMovies = data.results.filter((newMovie) => {
                const alreadyFetched = movies.some((existingMovie) => existingMovie.id === newMovie.id);
                const alreadySwiped = swipeHistory.some((swipedMovie) => Number(swipedMovie.movieId) === newMovie.id);
                // console.log("ALREADY FETCHED:", alreadyFetched)
                // console.log("ALREADY SWIPED:", alreadySwiped)
                return !alreadyFetched && !alreadySwiped;
            });
    
            console.log("Filtered movies:", filteredMovies);
    
            // Preload movie images
            filteredMovies.forEach((movie) => {
                const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`;
                preloadImage(imageUrl);
            });
    
            // Update state with the filtered movies
            if (initial) {
                setMovies(filteredMovies);
                setCurrentIndex(filteredMovies.length - 1);
                currentIndexRef.current = filteredMovies.length - 1;
            } else {
                setPreloadedMovies(filteredMovies);
            }

            setPages((prevPages) => prevPages.filter((page) => page !== randomPage));

        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    

    


    useEffect(() => {
        if (initialFetch || swipeHistory.length > 0 || page > 1) {
            console.log("Fetching movies...");
            fetchMovies(page === 1);
            setInitialFetch(false);  // Disable further fetches based on `initialFetch`
        }
    }, [swipeHistory, page]);

    // Emit swipe event and handle local swipe logic
    const swiped = (direction, movieId, index, movieTitle, imgURL) => {
        console.log(page, currentIndex)
        console.log("movies", movies)
        setLastDirection(direction);
        currentIndexRef.current = index - 1;
        setCurrentIndex(index - 1);
        setIsReturn(true);

        if (direction === 'right') {
            // Emit the swipe event to the server
            const authUser = JSON.parse(sessionStorage.getItem('authUser'));  // Parse the JSON string

            console.log(authUser.email)
            socket.current.emit('swipe', {
                sessionId: sessionId,
                userId: authUser.email,  // Replace with actual user ID
                movieId,
                direction,
                movieTitle, 
                imgURL 
            });
        }

        if(index === 3) setPage(() => page + 1);


        if (index === 2) {
            setTimeout(() => {
                setMovies((prevMovies) => {
                    console.log('entered')
                    console.log("Preloaded movies", preloadedMovies)
                    const updatedMovies = [...preloadedMovies, ...prevMovies.slice(0, currentIndex + 1)];
                    setPreloadedMovies([]);
                    setCurrentIndex(updatedMovies.length - 2);
                    currentIndexRef.current = updatedMovies.length - 1;
                    return updatedMovies;
                });
            }, 500);
        }
    };

    const outOfFrame = (movieTitle, index) => {
        console.log(`${movieTitle} (${index}) left the screen!`);
    };

    const swipe = async (dir) => {
        if (currentIndex >= 0 && currentIndex < movies.length) {
            await childRefs[currentIndex]?.current?.swipe(dir);
        }
    };

    const goBack = async () => {
        if (!isReturn || currentIndex >= movies.length - 1) return;
        const newIndex = currentIndex + 1;
        currentIndexRef.current = newIndex;
        setIsReturn(false);
        setCurrentIndex(newIndex);
        await childRefs[newIndex]?.current?.restoreCard();
    };
    
    

    const handleEndSession =  async (sessionId) => {
        // try {
        //     const response = await fetch(`http://localhost:8002/swipe/${sessionId}`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (response.ok) {
        //         const result = await response.json();
        //         console.log('Session deleted successfully:', result);
        //     } else {
        //         console.error('Failed to delete session:', response.statusText);
        //     }

        //     socket.current.disconnect()
        //     setSessionId('')
        // } catch (error) {
        //     console.error('Error:', error);
        // }

        setSessionId('')
        setUserJoined(false)
        setUserLeft(true)
        setCurrentMatch(false)
        navigate("/joinSession", {
            state: {
                error: ''
            }
        })

    }
    if(loading){
        return <div className='bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 w-[100vw] h-[100vh]'></div>
    }
    
    return (
        <div className="cards bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            <div className="absolute inset-x-0 top-26 flex items-center justify-center gap-1.5 text-zinc-100 text-sm tracking-wide fade-in-delayed">
                <span className={`relative w-3 h-3 rounded-full ${userJoined ? 'bg-emerald-400' : 'bg-red-500'}`}>
                    <span className={`absolute inset-0 rounded-full ${userJoined ? 'bg-emerald-400 animate-ping' : 'bg-red-500 animate-ping'}`}></span>
                </span>
                <span>{userJoined ? `${otherEmail} has joined` : userLeft ? `${otherEmail} has left` : 'No other user has joined'}</span>
            </div>

            <div className="cardContainer fade-in">
                {movies.map((movie, index) => {
                    const { title, overview, poster_path, backdrop_path } = movie;
                    const imageUrl = `https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`;

                    return (
                        <TinderCard
                            ref={childRefs[index]}
                            className="swipe"
                            key={movie.id}
                            onSwipe={(dir) => swiped(dir, movie.id, index, title, imageUrl)}
                            preventSwipe={['up', 'down']}
                        >
                            <div style={{ backgroundImage: `url(${imageUrl})` }} className="card fade-in-card">
                                <div className="card_content">
                                    <h3>{title}</h3>

                                    {showOverview && <p className="card-overview">{overview}</p>}

                                    <button
                                        className="toggle-button"
                                        onClick={() => setShowOverview(!showOverview)}
                                    >
                                        {showOverview ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </button>
                                </div>
                            </div>
                        </TinderCard>
                    );
                })}
            </div>

            <SwipeButtons
                onFavorite={() => swipe('right')}
                onDislike={() => swipe('left')}
                goBack={goBack}
            />    

            {currentMatch ? (
                <MatchPopup
                    match={currentMatch}
                    onClose={() => setCurrentMatch(null)}
                    onEndSwiping={() => {
                        handleEndSession(sessionId);
                    }}
                />
            ) : null}
        </div>

    );
}    

export default Card;
