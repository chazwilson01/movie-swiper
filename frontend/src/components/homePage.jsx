import React, { useEffect } from "react";
import "./homePage.css"; // Import your custom CSS file
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("sessionId");
  }, []);

  const handleJoinSession = () => {
    navigate("/joinSession", {
      state: {
        error: "",
      },
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center 
        text-white overflow-hidden relative bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 p-4`}
    >
      {/* Main Content with Movie Screen Effect */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 text-center">
        {/* White Movie Screen with Glowing Effect */}
        <div
          className={`w-full max-w-xs sm:max-w-md md:max-w-4xl h-64 sm:h-80 bg-stone-300 
          rounded-lg shadow-2xl flex items-center justify-center p-4 relative overflow-hidden`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-indigo-900 animate-fade-in">
            Welcome to Movie Swiper
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xs sm:max-w-md">
          Take the stress out of movie night in a fun and interactive way!
        </p>

        {/* Buttons */}
        <div className="hp-btns mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button
            className="w-[60vw] sm:w-auto bg-purple-600 text-white py-3 px-6 rounded-lg 
            font-semibold shadow-lg hover:bg-purple-500 transition-transform 
            transform hover:scale-105"
            onClick={handleJoinSession}
          >
            Get Started
          </button>
          <button
            className="w-[60vw] sm:w-auto bg-gray-700 text-white py-3 px-6 rounded-lg 
            font-semibold shadow-lg hover:bg-gray-600 transition-transform 
            transform hover:scale-105"
            onClick={() => {
              navigate("/about");
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
