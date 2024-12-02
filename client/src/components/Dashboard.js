// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Assuming the JWT token is stored in localStorage after login
        const token = localStorage.getItem("access_token");
        if (!token) {
            // Redirect to login if not logged in
            navigate("/login");
        } else {
            // Fetch user data (e.g., username, subscription status) from your API
            axios
                .get("http://localhost:5000/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the user data:", error);
                });
        }
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to your Dashboard!</h1>
            {userData ? (
                <div>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Subscription Status:</strong> {userData.subscription_active ? "Active" : "Inactive"}</p>
                    <button onClick={() => navigate("/subscriptions")}>View Subscription Plans</button>
                </div>
            ) : (
                <p>Loading your data...</p>
            )}
        </div>
    );
}

export default Dashboard;
