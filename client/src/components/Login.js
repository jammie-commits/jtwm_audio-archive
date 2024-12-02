import React, { useState } from "react";
import api from "../api";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { username, password });
            localStorage.setItem("token", response.data.access_token);
            alert("Login successful!");
        } catch (error) {
            alert("Invalid credentials!");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5">Login</Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
