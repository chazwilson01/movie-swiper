import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import "./about.css"

const AboutPage = () => {
    const [startSwipe, setStartSwipe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("sessionId");
    }, []);

    const toggleStartSwipe = () => {
        setStartSwipe(!startSwipe);
    };

    const handleJoinSession = () => {
        navigate('/joinSession', { state: { error: '' } });
    };

    return (
        <>
            {!startSwipe ? (
                <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl bg-stone-200 text-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10 animate-fade-in sm:max-h-2xl">
                        <div className="flex flex-col gap-6 mb-5 animate-slide-in-down text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-indigo-900">
                                About Movie Swiper
                            </h1>
                            <p className="text-base md:text-lg leading-relaxed text-gray-800">
                                Welcome to <strong>Movie Swiper</strong>! Deciding what movie to watch shouldn’t feel like a never-ending debate. 
                                Our app makes it easy for you and another person to join a session and swipe through movies until you match. 
                                No more endless scrolling—just swipe, match, and enjoy!
                            </p>

                            <div className="flex flex-row items-center justify-center gap-4 mt-6">
                                <button
                                    onClick={toggleStartSwipe}
                                    className="w-[35%] h-[20%] sm:w-auto md:text-sm text-xs bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-indigo-500 transition-transform transform hover:scale-105"
                                >
                                    How to Get Started
                                </button>
                                <button
                                    onClick={handleJoinSession}
                                    className="w-[35%] h-[20%] sm:w-auto sm:h-auto bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105 md:text-sm text-xs"
                                >
                                    Start Swiping
                                </button>
                            </div>

                            <div className="mt-8 flex flex-row items-center justify-center text-xs sm:text-sm gap-4">
                                <img
                                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                                    alt="TMDB Logo"
                                    className="w-12 sm:w-16 h-12 sm:h-16"
                                />
                                <p className="leading-snug text-gray-800 text-center sm:text-left">
                                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl bg-stone-200 text-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10 animate-fade-in overflow-y-auto sm:max-h-2xl">
                        <div className="flex flex-col gap-6 mb-5 animate-slide-in-down">
                            <h1 className="text-2xl sm:text-xl font-bold tracking-wide text-indigo-900 text-center sm:text-left">
                                How to Get Started
                            </h1>
                            <ol className="list-decimal list-inside space-y-4 text-gray-800 text-sm sm:text-base">
                                <li>
                                    <strong>Create an Account</strong>
                                    <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                                        <li>Sign up for a new account.</li>
                                        <li>Log in if you already have an account.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Start Swiping</strong>
                                    <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                                        <li>Navigate to the <em>Start Swiping</em> section.</li>
                                        <li>Create a session code.</li>
                                        <li>Share the session code with a friend to join the same session.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Match and Watch</strong>
                                    <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                                        <li>Swipe right on movies you like.</li>
                                        <li>If both users swipe right on the same movie, it's a match!</li>
                                        <li>Plan your movie night and enjoy!</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Session Rules</strong>
                                    <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                                        <li>If both users leave, the session will be deleted.</li>
                                        <li>If one user remains, the other can rejoin using the same session code.</li>
                                    </ul>
                                </li>
                            </ol>

                            <div className="flex justify-center mt-6">
                                <button 
                                    onClick={toggleStartSwipe} 
                                    className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-indigo-500 transition-transform transform hover:scale-105 flex items-center"
                                >
                                    <ArrowBackIosIcon fontSize='medium' className="mr-2"/> Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AboutPage;
