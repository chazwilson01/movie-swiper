import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        try {
            // Send signup request to backend
            const response = await fetch("http://localhost:10000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Signup failed. Email may already be in use.");
            }

            setSuccessMessage("Signup successful! Redirecting to login...");
            setError("");

            // Redirect to login after a short delay
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(error.message);
            setSuccessMessage("");
        }
    };

    return (
        <div style={styles.container} className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            <h1 style={styles.title}>Sign Up</h1>
            <form onSubmit={handleSignup} style={styles.form}>
                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}

                <div style={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <button type="submit" style={styles.button}>Sign Up</button>
            </form>

            <p>
                Already have an account?{" "}
                <button style={styles.linkButton} onClick={() => navigate("/login")}>
                    Login
                </button>
            </p>
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
    linkButton: { background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" },
    error: { color: "red" },
    success: { color: "green" },
};

export default SignupPage;
