import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Box,
    Button,
    Divider,
    Avatar,
} from "@mui/material";
import { ArrowBack, Edit, Delete, Person } from "@mui/icons-material";
import { getPlayerById, deletePlayer } from "../../api/playerApi";
import { LoadingSpinner, ErrorAlert, DeleteConfirmationModal } from "../common";
import { formatters } from "../../utils";
import styles from "../../styles/components/PlayerDetail.module.css";

const PlayerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        loadPlayer();
    }, [id]);

    const loadPlayer = async () => {
        try {
            setLoading(true);
            const response = await getPlayerById(id);
            setPlayer(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to load player details: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = () => {
        setDeleteModalOpen(true);
        setDeleteError(null);
    };

    const handleDeleteConfirm = async (playerId) => {
        try {
            setDeleteLoading(true);
            setDeleteError(null);
            await deletePlayer(playerId);
            setDeleteModalOpen(false);
            navigate("/");
        } catch (err) {
            let errorMessage = "Failed to delete player";

            if (err.response?.status === 500) {
                errorMessage =
                    "Server error: The delete operation failed. This might be due to database constraints or server configuration issues.";
            } else if (err.response?.status === 404) {
                errorMessage =
                    "Player not found. It may have already been deleted.";
                setDeleteModalOpen(false);
                setTimeout(() => navigate("/"), 1000);
            } else if (err.response?.data?.message) {
                errorMessage += `: ${err.response.data.message}`;
            } else if (err.response?.data) {
                errorMessage += `: ${err.response.data}`;
            } else {
                errorMessage += `: ${err.message}`;
            }

            setDeleteError(errorMessage);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setDeleteError(null);
    };

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return "N/A";

        let birthDate;

        // Handle dd-MM-yyyy format from backend
        if (dateOfBirth.includes("-") && dateOfBirth.split("-").length === 3) {
            const parts = dateOfBirth.split("-");
            if (parts[0].length === 2) {
                // dd-MM-yyyy format
                const [day, month, year] = parts;
                birthDate = new Date(year, month - 1, day);
            } else {
                // yyyy-MM-dd format
                birthDate = new Date(dateOfBirth);
            }
        } else {
            // Try to parse as regular date
            birthDate = new Date(dateOfBirth);
        }

        if (isNaN(birthDate.getTime())) return "N/A";

        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            return age - 1;
        }
        return age;
    };

    if (loading)
        return (
            <LoadingSpinner showMessage message="Loading player details..." />
        );
    if (error) return <ErrorAlert error={error} onRetry={loadPlayer} />;
    if (!player)
        return <ErrorAlert error="Player not found" showRetry={false} />;

    return (
        <div className={styles.container}>
            {/* Header */}
            <Box className={styles.header}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate("/")}
                    className={styles.backButton}>
                    Back to Players
                </Button>
                <Box className={styles.actions}>
                    <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={handleEdit}
                        className={styles.editButton}>
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDelete}
                        className={styles.deleteButton}>
                        Delete
                    </Button>
                </Box>
            </Box>

            {/* Player Card */}
            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    {/* Player Header */}
                    <Box className={styles.playerHeader}>
                        <Avatar className={styles.avatar}>
                            <Person fontSize="large" />
                        </Avatar>
                        <Box className={styles.playerInfo}>
                            <Typography
                                variant="h4"
                                className={styles.playerName}>
                                {player.firstName} {player.lastName}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                className={styles.playerId}>
                                Player ID: {player.id}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Player Details Grid */}
                    <Grid container spacing={3} justifyContent="space-around">
                        {/* Basic Information */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography
                                variant="h6"
                                className={styles.sectionTitle}>
                                Basic Information
                            </Typography>
                            <Box className={styles.infoSection}>
                                <Box className={styles.infoItem}>
                                    <Typography className={styles.label}>
                                        Date of Birth:
                                    </Typography>
                                    <Typography className={styles.value}>
                                        {formatters.formatDate(
                                            player.dateOfBirth
                                        )}
                                    </Typography>
                                </Box>
                                <Box className={styles.infoItem}>
                                    <Typography className={styles.label}>
                                        Age:
                                    </Typography>
                                    <Typography className={styles.value}>
                                        {calculateAge(player.dateOfBirth)} years
                                        old
                                    </Typography>
                                </Box>
                                <Box className={styles.infoItem}>
                                    <Typography className={styles.label}>
                                        Height:
                                    </Typography>
                                    <Typography className={styles.value}>
                                        {formatters.formatHeight(
                                            player.heightCm
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Professional Information */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography
                                variant="h6"
                                className={styles.sectionTitle}>
                                Professional Information
                            </Typography>
                            <Box className={styles.infoSection}>
                                <Box className={styles.infoItem}>
                                    <Typography className={styles.label}>
                                        Nationalities:
                                    </Typography>
                                    <Box className={styles.chipContainer}>
                                        {player.nationalities
                                            ?.sort((a, b) => a.localeCompare(b))
                                            .map((nationality) => (
                                                <Chip
                                                    key={nationality}
                                                    label={nationality}
                                                    className={styles.chip}
                                                    variant="outlined"
                                                />
                                            )) || (
                                            <Typography
                                                className={styles.value}>
                                                N/A
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                                <Box className={styles.infoItem}>
                                    <Typography className={styles.label}>
                                        Positions:
                                    </Typography>
                                    <Box className={styles.chipContainer}>
                                        {player.positions
                                            ?.sort((a, b) => a.localeCompare(b))
                                            .map((position) => (
                                                <Chip
                                                    key={position}
                                                    label={position}
                                                    className={styles.chip}
                                                    color="primary"
                                                />
                                            )) || (
                                            <Typography
                                                className={styles.value}>
                                                N/A
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* System Information */}
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="h6"
                                className={styles.sectionTitle}>
                                System Information
                            </Typography>
                            <Box className={styles.infoSection}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box className={styles.infoItem}>
                                            <Typography
                                                className={styles.label}>
                                                Created:
                                            </Typography>
                                            <Typography
                                                className={styles.value}>
                                                {formatters.formatDate(
                                                    player.createdAt
                                                )}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box className={styles.infoItem}>
                                            <Typography
                                                className={styles.label}>
                                                Last Modified:
                                            </Typography>
                                            <Typography
                                                className={styles.value}>
                                                {formatters.formatDate(
                                                    player.modifiedAt
                                                )}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                player={player}
                loading={deleteLoading}
                error={deleteError}
            />
        </div>
    );
};

export default PlayerDetail;
