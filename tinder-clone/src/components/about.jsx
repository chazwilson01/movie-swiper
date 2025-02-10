import React, { useState } from 'react';
import "./about.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const [startSwipe, setStartSwipe] = useState(false);
    const navigate = useNavigate()
    const toggleStartSwipe = () => {
        setStartSwipe(!startSwipe);
    };

    const handleJoinSession = () => {
        navigate('/joinSession', {
          state: {
            error: ''
          }
        })
      }

    return (
        <>
            
            {!startSwipe ? (
                <>

                    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white flex items-center justify-center px-6 py-12">
                                    <div className="max-w-4xl bg-stone-200 text-gray-900 rounded-3xl shadow-2xl pt-12 md:p-16 md:pb-5 animate-fade-in">
                                        <div className="flex flex-col gap-8 mb-5 p-0 animate-slide-in-down">
                    <h1 className="text-5xl font-bold tracking-wide text-indigo-900">
                        About Movie Swiper
                    </h1>
                    <p className="text-lg leading-relaxed text-gray-800 mt-4">
                        Welcome to <strong>Movie Swiper</strong>! Deciding what movie to watch shouldn’t feel like a never-ending debate. 
                        Our app takes the struggle out of the equation by letting you and another person 
                        join a session and swipe through movies until you both match on one. 
                        It's simple, fun, and perfect for movie nights with friends, family, or that special someone. No more endless scrolling—just swipe, match, and enjoy your movie!
                    </p>

                    <div className="flex md:flex-row items-center justify-center gap-6 mt-8">
                        <div className="w-full md:w-auto">
                            <button
                                onClick={toggleStartSwipe}
                                className="block bg-indigo-600 text-white py-4 px-8 rounded-lg font-semibold shadow-lg hover:bg-indigo-500 transition-transform transform hover:scale-105"
                            >
                                How to get Started
                            </button>
                        </div>
                        <div className="w-full md:w-auto">
                            <button
                                onClick={handleJoinSession}
                                className="block bg-gray-800 text-white py-4 px-8 rounded-lg font-semibold shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
                            >
                                Start Swiping
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center text-sm gap-4">
                        <img
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                            alt="TMDB Logo"
                            className="w-16 h-16"
                        />
                        <p className="leading-snug text-gray-800">
                            This product uses the TMDB API but is not endorsed or certified by TMDB.
                        </p>
                    </div>
                    </div>
                    </div>
                </div>
                </>
            ) : (
                <>
                <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white flex items-center justify-center px-6 py-12">
                    <div className="max-w-4xl bg-stone-200 text-gray-900 rounded-3xl shadow-2xl pt-12 md:pb-3 md:p-16 animate-fade-in">
                        <div className="flex flex-col gap-8 mb-5 p-0 animate-slide-in-down">
    
                    <div className="text-lg leading-relaxed mt-4 flex flex-col gap-5">
                        
                        <h1 className="text-3xl font-bold tracking-wide text-indigo-900">
                            How to Get Started
                        </h1>
                        <ol className="list-decimal list-inside space-y-6 text-gray-800">
                            <li>
                                <strong>Create an Account</strong>
                                <ul className="list-disc list-inside pl-6 space-y-2 mt-2">
                                    <li>Sign up for a new account.</li>
                                    <li>Log in if you already have an account.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Start Swiping</strong>
                                <ul className="list-disc list-inside pl-6 space-y-2 mt-2">
                                    <li>Navigate to the <em>Start Swiping</em> section.</li>
                                    <li>Create a session code.</li>
                                    <li>Share the session code with the person you're matching with to join the same session</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Match and Watch</strong>
                                <ul className="list-disc list-inside pl-6 space-y-2 mt-2">
                                    <li>Swipe right on movies you like.</li>
                                    <li>When both users swipe right on the same movie, it's a match!</li>
                                    <li>Plan your movie night and enjoy!</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Session Rules</strong>
                                <ul className="list-disc list-inside pl-6 space-y-2 mt-2">
                                    <li>If both of you leave, the session will be deleted.</li>
                                    <li>If one person is in the session, the other can rejoin by using the same session code.</li>
                                </ul>
                            </li>
                        </ol>

                        
                    </div>

                    <button 
                        onClick={toggleStartSwipe} 
                        className="bg-indigo-600 text-white 
                                py-4 px-8 rounded-lg font-semibold shadow-lg 
                                hover:bg-indigo-500 transition-transform transform 
                                hover:scale-105 w-20"
                        >
                            <ArrowBackIosIcon fontSize='medium'/>
                        </button>


                    </div>
                    </div>
                </div>
                </>
            )}
                    
        </>
    );
};

export default AboutPage;
