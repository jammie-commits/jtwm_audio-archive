// src/components/SignUp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To redirect after successful signup

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // To store error messages
    const [loading, setLoading] = useState(false); // To handle loading state
    const navigate = useNavigate(); // To navigate to the login page after signup

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(""); // Clear previous errors

        // Prepare the data to be sent to the backend
        const userData = { username, email, password };

        // Make an API request to the backend to register the user
        axios
            .post("http://localhost:5000/api/signup", userData)
            .then((response) => {
                // On successful signup, you can redirect to the login page
                navigate("/login");
            })
            .catch((error) => {
                // Handle errors (e.g., username already exists, server error)
                setError(error.response?.data?.message || "An error occurred during signup.");
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>} {/* Show error message */}
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
