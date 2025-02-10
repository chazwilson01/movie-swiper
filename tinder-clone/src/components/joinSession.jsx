import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './JoinSession.css';


const JoinSession = () => {
    const [sessionId, setSessionId] = useState('');
    const socket = useRef(null);
    const location = useLocation()
    const navigate = useNavigate();
    const [error, setError] =  useState(location.state.error)

    const handleSessionJoined = () => {
        const authUser = JSON.parse(sessionStorage.getItem('authUser'));
        if (!authUser) {
            alert('User is not authenticated');
            return;
        }

        navigate("/app", {
            state: {
                sessionId: sessionId
            }
        })




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

                <input
                    type="text"
                    placeholder="Enter session ID (e.g., fortnite)"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    className="join-session-input"
                />

                {error && <p className="join-session-error">{error}</p>}

                <button
                    onClick={handleSessionJoined}
                    className="join-session-button"
                >
                    Join Session
                </button>
            </motion.div>
        </div>
    );
};

export default JoinSession;
