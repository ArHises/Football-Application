import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Alert } from "@mui/material";
import { PlayerForm } from "../components/player";
import { LoadingSpinner } from "../components/common";
import { MESSAGES, PLAYER_CONSTANTS } from "../utils/constants";
import {
    createPlayer,
    fetchAvailableNationalities,
    fetchAvailablePositions,
} from "../api/playerApi";

const CreatePlayer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [availableNationalities, setAvailableNationalities] = useState([]);
    const [availablePositions, setAvailablePositions] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        fetchFormOptions();
    }, []);

    const fetchFormOptions = async () => {
        try {
            setLoadingOptions(true);

            // Always use fallback data instead of API
            setAvailableNationalities(
                PLAYER_CONSTANTS.FALLBACK_DATA.NATIONALITIES
            );
            setAvailablePositions(PLAYER_CONSTANTS.FALLBACK_DATA.POSITIONS);
        } catch (err) {
            console.error("Error setting form options:", err);
            // Use fallback data when anything fails
            setAvailableNationalities(
                PLAYER_CONSTANTS.FALLBACK_DATA.NATIONALITIES
            );
            setAvailablePositions(PLAYER_CONSTANTS.FALLBACK_DATA.POSITIONS);
        } finally {
            setLoadingOptions(false);
        }
    };

    const handleSubmit = async (playerData) => {
        try {
            setLoading(true);
            setError("");

            const response = await createPlayer(playerData);
            const newPlayer = response.data;

            navigate("/", {
                state: {
                    message: MESSAGES.SUCCESS.PLAYER_CREATED,
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
        navigate("/");
    };

    if (loadingOptions) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <LoadingSpinner message="Loading form options..." />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Player
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Fill in the player's information to add them to the system.
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <PlayerForm
                player={null}
                availableNationalities={availableNationalities}
                availablePositions={availablePositions}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
                error={error}
            />
        </Container>
    );
};

export default CreatePlayer;
