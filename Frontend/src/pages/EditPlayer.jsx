import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Alert } from "@mui/material";
import { PlayerForm } from "../components/player";
import { LoadingSpinner } from "../components/common";
import { MESSAGES, PLAYER_CONSTANTS } from "../utils/constants";
import { getPlayerById, updatePlayer } from "../api/playerApi";

const EditPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingPlayer, setFetchingPlayer] = useState(true);
    const [error, setError] = useState("");
    const [availableNationalities, setAvailableNationalities] = useState([]);
    const [availablePositions, setAvailablePositions] = useState([]);

    useEffect(() => {
        fetchPlayerAndOptions();
    }, [id]);

    const fetchPlayerAndOptions = async () => {
        try {
            setFetchingPlayer(true);
            setError("");

            // Fetch player data
            const playerResponse = await getPlayerById(id);
            setPlayer(playerResponse.data);

            // Always use fallback data instead of API for nationalities and positions
            setAvailableNationalities(
                PLAYER_CONSTANTS.FALLBACK_DATA.NATIONALITIES
            );
            setAvailablePositions(PLAYER_CONSTANTS.FALLBACK_DATA.POSITIONS);
        } catch (err) {
            console.error("Error fetching player data:", err);
            if (err.response?.status === 404) {
                setError("Player not found");
            } else {
                // Use fallback data for options
                setAvailableNationalities(
                    PLAYER_CONSTANTS.FALLBACK_DATA.NATIONALITIES
                );
                setAvailablePositions(PLAYER_CONSTANTS.FALLBACK_DATA.POSITIONS);

                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "Failed to load player data"
                );
            }
        } finally {
            setFetchingPlayer(false);
        }
    };

    const handleSubmit = async (playerData) => {
        try {
            setLoading(true);
            setError("");

            const response = await updatePlayer(id, playerData);
            const updatedPlayer = response.data;

            navigate(`/players/${updatedPlayer.id}`, {
                state: {
                    message: MESSAGES.SUCCESS.PLAYER_UPDATED,
                    type: "success",
                },
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    MESSAGES.ERRORS.GENERIC
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/players/${id}`);
    };

    if (fetchingPlayer) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <LoadingSpinner message="Loading player data..." />
            </Container>
        );
    }

    if (error && !player) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Box mt={2}>
                    <Typography variant="body2">
                        <a href="/" style={{ color: "inherit" }}>
                            Return to players list
                        </a>
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Player
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Update {player?.firstName} {player?.lastName}'s information.
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {player && (
                <PlayerForm
                    player={player}
                    availableNationalities={availableNationalities}
                    availablePositions={availablePositions}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={loading}
                    error={error}
                />
            )}
        </Container>
    );
};

export default EditPlayer;
