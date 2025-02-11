import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
const isLocal = window.location.hostname === "localhost";
const API_BASE_URL = isLocal 
    ? "http://localhost:10000" 
    : "https://movie-swiper-backend.onrender.com";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("sessionId");
        setAnimate(true); // Trigger animation on mount
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid login credentials");
            }

            const data = await response.json();
            console.log("Login successful:", data);
            setError("");
            sessionStorage.setItem("authUser", JSON.stringify(data));

            navigate("/joinSession", {
                state: { error: '' }
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            <div className={`bg-purple-950 bg-opacity-90 text-white p-8 rounded-xl shadow-lg w-full max-w-md ${animate ? 'animate-login' : ''}`}>
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                
                {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-200 py-2 text-white font-bold rounded-lg shadow-md"
                    >
                        Login
                    </button>
                    
                    <div className="signup flex gap-1 justify-center">
                        <p className="text-center text-sm mt-4">Don't have an account?</p>
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="text-indigo-400 hover:text-indigo-300 ml-1 font-semibold text-sm"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
