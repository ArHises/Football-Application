import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import {
    fetchPlayers,
    deletePlayer,
    fetchAvailableNationalities,
    fetchAvailablePositions,
} from "../api/playerApi";
import { useNavigate } from "react-router-dom";
import { PlayerTable } from "./player";
import EnhancedPlayerFilters from "./player/EnhancedPlayerFilters";
import { LoadingSpinner, ErrorAlert } from "./common";
import { PLAYER_CONSTANTS } from "../utils/constants";
import styles from "../styles/components/PlayerList.module.css";

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    const [nameFilter, setNameFilter] = useState("");
    const [nationalityFilter, setNationalityFilter] = useState([]);
    const [ageRange, setAgeRange] = useState(
        PLAYER_CONSTANTS.FILTERS.DEFAULT_AGE_RANGE
    );
    const [positionFilter, setPositionFilter] = useState([]);
    const [heightRange, setHeightRange] = useState(
        PLAYER_CONSTANTS.FILTERS.DEFAULT_HEIGHT_RANGE
    );

    const [availableNationalities, setAvailableNationalities] = useState([]);
    const [availablePositions, setAvailablePositions] = useState([]);

    const navigate = useNavigate();

    const loadPlayers = async () => {
        try {
            setLoading(true);
            const response = await fetchPlayers();
            setAllPlayers(response.data);
            setPlayers(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch players: " + err.message);
            console.error("Error fetching players:", err);
        } finally {
            setLoading(false);
        }
    };

    const loadAvailableOptions = async () => {
        try {
            const [nationalitiesResponse, positionsResponse] =
                await Promise.all([
                    fetchAvailableNationalities(),
                    fetchAvailablePositions(),
                ]);
            setAvailableNationalities(nationalitiesResponse.data);
            setAvailablePositions(positionsResponse.data);
        } catch (err) {
            console.error("Error fetching available options:", err);
            setAvailableNationalities(
                PLAYER_CONSTANTS.FALLBACK_DATA.NATIONALITIES
            );
            setAvailablePositions(PLAYER_CONSTANTS.FALLBACK_DATA.POSITIONS);
        }
    };

    useEffect(() => {
        loadPlayers();
        loadAvailableOptions();
    }, []);

    const applyFilters = () => {
        let filteredPlayers = [...allPlayers];

        // Improved name filter - search in first name, last name, or full name
        if (nameFilter.trim()) {
            filteredPlayers = filteredPlayers.filter((player) => {
                const fullName =
                    `${player.firstName} ${player.lastName}`.toLowerCase();
                const searchTerm = nameFilter.toLowerCase();
                return (
                    player.firstName.toLowerCase().includes(searchTerm) ||
                    player.lastName.toLowerCase().includes(searchTerm) ||
                    fullName.includes(searchTerm)
                );
            });
        }

        // Improved nationality filter
        if (nationalityFilter.length > 0) {
            filteredPlayers = filteredPlayers.filter((player) =>
                player.nationalities?.some((nationality) =>
                    nationalityFilter.includes(nationality)
                )
            );
        }

        // Position filter
        if (positionFilter.length > 0) {
            filteredPlayers = filteredPlayers.filter((player) =>
                player.positions?.some((position) =>
                    positionFilter.includes(position)
                )
            );
        }

        // Age filter
        filteredPlayers = filteredPlayers.filter((player) => {
            if (!player.dateOfBirth) return false;

            // Calculate age from dd-MM-yyyy format
            let birthDate;
            if (
                player.dateOfBirth.includes("-") &&
                player.dateOfBirth.split("-").length === 3
            ) {
                const parts = player.dateOfBirth.split("-");
                if (parts[0].length === 2) {
                    // dd-MM-yyyy format
                    const [day, month, year] = parts;
                    birthDate = new Date(year, month - 1, day);
                } else {
                    // yyyy-MM-dd format
                    birthDate = new Date(player.dateOfBirth);
                }
            } else {
                birthDate = new Date(player.dateOfBirth);
            }

            if (isNaN(birthDate.getTime())) return false;

            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
                age = age - 1;
            }

            return age >= ageRange[0] && age <= ageRange[1];
        });

        // Height filter
        filteredPlayers = filteredPlayers.filter((player) => {
            const height = Number(player.heightCm);
            return (
                !isNaN(height) &&
                height >= heightRange[0] &&
                height <= heightRange[1]
            );
        });

        setPlayers(filteredPlayers);
    };
    const clearFilters = () => {
        setNameFilter("");
        setNationalityFilter([]);
        setAgeRange(PLAYER_CONSTANTS.FILTERS.DEFAULT_AGE_RANGE);
        setPositionFilter([]);
        setHeightRange(PLAYER_CONSTANTS.FILTERS.DEFAULT_HEIGHT_RANGE);
        setPlayers(allPlayers); // Reset to show all players
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await deletePlayer(id);
            const updatedAllPlayers = allPlayers.filter(
                (player) => player.id !== id
            );
            setAllPlayers(updatedAllPlayers);
            setPlayers(players.filter((player) => player.id !== id));
        } catch (err) {
            setError("Failed to delete player: " + err.message);
            console.error("Error deleting player:", err);
            throw err;
        }
    };

    if (loading) {
        return <LoadingSpinner showMessage message="Loading players..." />;
    }

    if (error) {
        return (
            <ErrorAlert
                error={error}
                onRetry={() => loadPlayers()}
                retryText="Retry Loading Players"
            />
        );
    }

    return (
        <div className={styles.container}>
            <Box className={styles.header}>
                <h2 className={styles.title}>Players List</h2>
                <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={() => setShowFilters(!showFilters)}
                    className={styles.filterToggleButton}
                >
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
            </Box>

            <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                    mb: 2,
                    textAlign: "center",
                    fontStyle: "italic",
                }}
            >
                💡 Click on any row to view detailed player information
            </Typography>

            {showFilters && (
                <EnhancedPlayerFilters
                    nameFilter={nameFilter}
                    nationalityFilter={nationalityFilter}
                    ageRange={ageRange}
                    positionFilter={positionFilter}
                    heightRange={heightRange}
                    availableNationalities={availableNationalities}
                    availablePositions={availablePositions}
                    onNameChange={(e) => setNameFilter(e.target.value)}
                    onNationalityChange={(e) =>
                        setNationalityFilter(e.target.value)
                    }
                    onAgeRangeChange={(e, newValue) => setAgeRange(newValue)}
                    onPositionChange={(e) => setPositionFilter(e.target.value)}
                    onHeightRangeChange={(e, newValue) =>
                        setHeightRange(newValue)
                    }
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                />
            )}

            <PlayerTable
                players={players}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default PlayerList;
