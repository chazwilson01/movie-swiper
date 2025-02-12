import React, { useEffect, useState } from 'react';
import "./homePage.css"; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';
import video from "../assets/countdown.mp4";

const HomePage = () => {
  const [showCountdown, setShowCountdown] = useState(true);
   const navigate = useNavigate();
    
  useEffect(() => {
    sessionStorage.removeItem('sessionId');

    // Hide countdown after the video ends (assuming the video is 5 seconds long)
    const timer = setTimeout(() => {
      setShowCountdown(false);
    }, 5000); // Adjust this duration to match your video length

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleJoinSession = () => {
    navigate('/joinSession', {
      state: {
        error: ''
      }
    })
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center text-white overflow-hidden relative ${
        showCountdown ? "bg-black" : "bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800"
      }`}
    >
      {/* Main Content with Movie Screen Effect */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
        {/* White Movie Screen with Glowing Effect */}
        
          {showCountdown ? (
            <div
            className={`w-full max-w-4xl h-[50vh] bg-black rounded-lg shadow-2xl flex items-center justify-center p-0 relative overflow-hidden`}
          >
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => setShowCountdown(false)} // Hide countdown when video ends
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            </div>

          ) : (

            <div
            className={`w-full max-w-4xl h-96 ${showCountdown ? "bg-black" : "bg-stone-300"} rounded-lg shadow-2xl flex items-center justify-center p-0 relative overflow-hidden`}
          >
            <>
              <h1 className="text-6xl font-bold text-indigo-900 animate-fade-in">
                Welcome to Movie Swiper
              </h1>
            </>

            </div>
          )}

        {showCountdown ? (
            null
        ) : (
            <>
            <div className="hp-txt mt-8 text-center">
                <p className="text-2xl text-gray-300 leading-relaxed max-w-md">
                    Take the stress out of movie night in a fun and interactive way!
                </p>
            </div>

            <div className="hp-btns mt-6 flex items-center justify-center gap-4">
                <button className="bg-purple-600 text-white py-3 px-6 rounded-lg 
                font-semibold shadow-lg hover:bg-purple-500 transition-transform 
                transform hover:scale-105"
                onClick={handleJoinSession}
                >
                Get Started
                </button>
                <button 
                className="bg-gray-700 text-white py-3 px-6 rounded-lg 
                font-semibold shadow-lg hover:bg-gray-600 transition-transform 
                transform hover:scale-105"
                onClick={() => {navigate("/about")}}
                >
                Learn More
                </button>
            </div>
            </>
        )}

    </div>

    </div>
  );
};

export default HomePage;