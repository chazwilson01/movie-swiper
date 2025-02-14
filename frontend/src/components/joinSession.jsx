import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './JoinSession.css';

const JoinSession = () => {
    const [sessionId, setSessionId] = useState('');
    const socket = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(location.state?.error || '');

    useEffect(() => {
        sessionStorage.removeItem("sessionId");
    }, []);

    const handleSessionJoined = (event) => {
        event.preventDefault(); // Prevents the form from refreshing the page

        const authUser = JSON.parse(sessionStorage.getItem('authUser'));
        if (!authUser) {
            setError('No User is Signed In');
            return;
        }

        sessionStorage.setItem("sessionId", sessionId);

        navigate("/app", {
            state: { sessionId: sessionId }
        });
    };

    return (
        <div className="join-session-container bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            <motion.div
                className="join-session-box bg-stone-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <h2 className="join-session-title text-indigo-900">Create or Join a Session</h2>

                {/* Form to handle Enter key */}
                <form onSubmit={handleSessionJoined}>
                    <input
                        type="text"
                        placeholder="Enter session ID (e.g., fortnite)"
                        value={sessionId}
                        onChange={(e) => setSessionId(e.target.value)}
                        className="join-session-input"
                    />

                    {error && <p className="join-session-error">{error}</p>}

                    {/* Button will be triggered on Enter press */}
                    <button type="submit" className="join-session-button">
                        Join Session
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default JoinSession;
