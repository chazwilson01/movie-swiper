import React from "react";
import "./spinner.css"
const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            <div className="flex flex-col justify-center items-center gap-2">
            <div className="movie-reel">
                <div className="reel-center"></div>
                <div className="reel-hole reel-hole-1"></div>
                <div className="reel-hole reel-hole-2"></div>
                <div className="reel-hole reel-hole-3"></div>
                <div className="reel-hole reel-hole-4"></div>
                <div className="reel-hole reel-hole-5"></div>
=            </div>
                <p className="text-white text-2xl mt-4 animate-fade">Signup successful! Redirecting to login...</p>
            </div>
           
        </div>
    );
};

export default LoadingSpinner;
