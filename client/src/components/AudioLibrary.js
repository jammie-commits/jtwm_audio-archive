// client/src/components/AudioLibrary.js
import React, { useEffect, useState } from "react";
import api from "../api";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

function AudioLibrary() {
    const [audioFiles, setAudioFiles] = useState([]);

    useEffect(() => {
        const fetchAudioFiles = async () => {
            try {
                const response = await api.get("/audios", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setAudioFiles(response.data);
            } catch (error) {
                console.error("Failed to fetch audio files", error);
            }
        };
        fetchAudioFiles();
    }, []);

    return (
        <Container maxWidth= "lg" sx = {{ mt: 5 }
}>
    <Typography variant="h4" gutterBottom >
        Audio Library
            </Typography>
            < Grid container spacing = { 4} >
            {
                audioFiles.map((audio) => (
                    <Grid item key = { audio.id } xs = { 12} sm = { 6} md = { 4} >
                    <Card>
                    <CardMedia
                component="img"
                height = "140"
                image = "https://via.placeholder.com/150" // Replace with your audio thumbnail URL
                alt = { audio.title }
                    />
                    <CardContent>
                    <Typography gutterBottom variant = "h5" >
                    { audio.title }
                    </Typography>
                    < Typography variant = "body2" color = "text.secondary" >
                    { audio.author }
                    </Typography>
                    </CardContent>
                    < Button
                size = "small"
                color = "primary"
                onClick = {() => alert("Play audio feature not yet implemented!")}
                >
                Play
                </Button>
                < Button
size = "small"
color = "secondary"
onClick = {() => alert("Download feature not yet implemented!")}
              >
    Download
    </Button>
    </Card>
    </Grid>
        ))}
</Grid>
    </Container>
  );
}

export default AudioLibrary;
