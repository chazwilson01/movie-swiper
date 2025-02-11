import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./spinner";
import "./signup.css";

const isLocal = window.location.hostname === "localhost";
const API_BASE_URL = isLocal 
    ? "http://localhost:10000" 
    : "https://movie-swiper-backend.onrender.com";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("sessionId");
        setAnimate(true); // Trigger animation on mount
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError(["Email and password are required!"]);
            return;
        }
    
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                if (data.errors) {
                    setError(data.errors.map(err => err.msg));
                } else {
                    setError([data.message || "Signup failed. Please try again."]);
                }
                setSuccessMessage("");
                return;
            }
    
            setSuccessMessage("Signup successful! Redirecting to login...");
            setError([]);

            setLoading(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(["Something went wrong. Please try again."]);
            setSuccessMessage("");
        }
    };

    return (
        <>
        {loading ? (
            <LoadingSpinner />
        ) : (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
                <div className={`bg-purple-950 bg-opacity-90 text-white p-8 rounded-xl shadow-lg w-full max-w-md ${animate ? 'animate-signup' : ''}`}>
                    <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
                    
                    {error.length > 0 && (
                        <div className="text-red-400 text-sm text-center mb-4">
                            {error.map((err, index) => (
                                <p key={index}>{err}</p>
                            ))}
                        </div>
                    )}
                    {successMessage && <p className="text-green-400 text-sm text-center mb-4">{successMessage}</p>}

                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        <div className="inputs flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="px-4 py-2 rounded-lg bg-purple-900 text-white border border-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-4 py-2 rounded-lg bg-purple-900 text-white border border-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="px-4 py-2 rounded-lg bg-purple-900 text-white border border-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="px-4 py-2 rounded-lg bg-purple-900 text-white border border-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-200 py-2 text-white font-bold rounded-lg shadow-md"
                        >
                            Sign Up
                        </button>
                        
                        <div className="signup flex gap-1 justify-center">
                            <p className="text-center text-sm mt-4">Already have an account?</p>
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-indigo-400 hover:text-indigo-300 ml-1 font-semibold text-sm"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    );
}

export default SignupPage;
