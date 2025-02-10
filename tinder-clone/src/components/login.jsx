import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required!");
            return;
        }

        // Login request
        try {
            const response = await fetch("http://localhost:10000/login", {
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
                state: {
                    error:''
                }
            })
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={styles.container} className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            <h1 style={styles.title}>Login</h1>
            <form onSubmit={handleLogin} style={styles.form}>
                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>Login</button>
            </form>

            <button
                style={styles.signupButton}
                onClick={() => navigate("/signup")}
            >
                Sign Up
            </button>
        </div>
    );
}

const styles = {
    container: { width: "300px", margin: "100px auto", textAlign: "center" },
    title: { marginBottom: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "15px" },
    inputGroup: { textAlign: "left" },
    input: { width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" },
    button: { padding: "10px", backgroundColor: "#007bff", color: "white", borderRadius: "5px" },
    signupButton: { marginTop: "20px", padding: "10px", backgroundColor: "#28a745", color: "white", borderRadius: "5px" },
    error: { color: "red" },
};

export default LoginPage;
