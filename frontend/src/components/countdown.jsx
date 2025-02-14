import video from "../assets/countdown.mp4";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Countdown = () => {

    const [showCountdown, setShowCountdown] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        const timer = setTimeout(() => {
            setShowCountdown(false);
            navigate("/homePage")
        }, 5000); // Adjust this duration to match your video length
    
        return () => clearTimeout(timer); // Cleanup timer
        }, [])
        
    return (

    <div
      className={`min-h-screen flex items-center justify-center text-white overflow-hidden relative bg-black`}
    >
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

        </div>
    )
}

export default Countdown