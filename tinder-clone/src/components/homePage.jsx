import React from 'react';
import './HomePage.css';
import Footer from './footer';
const HomePage = () => {
    return (
        <>
        <div className="home-page-container flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden">
            {/* Static Filmstrip */}
            <div className="film-strip static-filmstrip">
                {/* Frames inside the reel */}
                <div className="film-frame empty-frame"></div>
                <div className="film-frame">
                    <h1 className="text-5xl font-extrabold text-white text-center">Movie Swiper</h1>
                </div>
                <div className="film-frame">
                    <p className="text-lg text-white text-center max-w-lg mx-auto">
                        Discover new movies with a swipe! Match with your favorite films and explore new recommendations in a fun, interactive way.
                    </p>
                </div>
                <div className="film-frame empty-frame"></div>
            </div>
        </div>
        </>
    );
};

export default HomePage;
