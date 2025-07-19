import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Avatar,
    Alert,
} from "@mui/material";
import { Delete, Cancel, Warning } from "@mui/icons-material";
import { formatters } from "../../utils";
import styles from "../../styles/components/DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    player,
    loading = false,
    error = null,
}) => {
    if (!player) return null;

    const handleConfirm = () => {
        onConfirm(player.id);
    };

    const getPlayerInitials = () => {
        const firstInitial = player.firstName?.charAt(0)?.toUpperCase() || "";
        const lastInitial = player.lastName?.charAt(0)?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };

    const getPlayerAge = () => {
        if (!player.dateOfBirth) return "Unknown";
        const today = new Date();
        const birthDate = new Date(player.dateOfBirth);
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

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            className={styles.dialog}
            PaperProps={{
                className: styles.dialogPaper,
            }}>
            <DialogTitle className={styles.dialogTitle}>
                <Box className={styles.titleContainer}>
                    <Warning className={styles.warningIcon} />
                    <Typography variant="h6" className={styles.titleText}>
                        Delete Player
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent className={styles.dialogContent}>
                {error && (
                    <Alert severity="error" className={styles.alert}>
                        {error}
                    </Alert>
                )}

                <Box className={styles.playerInfo}>
                    <Avatar className={styles.avatar}>
                        {getPlayerInitials()}
                    </Avatar>
                    <Box className={styles.playerDetails}>
                        <Typography variant="h6" className={styles.playerName}>
                            {player.firstName} {player.lastName}
                        </Typography>
                        <Typography
                            variant="body2"
                            className={styles.playerMeta}>
                            Age: {getPlayerAge()} • Height:{" "}
                            {formatters.formatHeight(player.heightCm)}
                        </Typography>
                        <Typography
                            variant="body2"
                            className={styles.playerMeta}>
                            Positions:{" "}
                            {formatters.formatArray(player.positions)}
                        </Typography>
                        <Typography
                            variant="body2"
                            className={styles.playerMeta}>
                            Nationalities:{" "}
                            {formatters.formatArray(player.nationalities)}
                        </Typography>
                    </Box>
                </Box>

                <Alert severity="warning" className={styles.warningAlert}>
                    <Typography variant="body1" className={styles.warningText}>
                        Are you sure you want to delete this player?
                    </Typography>
                    <Typography
                        variant="body2"
                        className={styles.warningSubtext}>
                        This action cannot be undone. All player data will be
                        permanently removed from the system.
                    </Typography>
                </Alert>

                <Box className={styles.consequencesBox}>
                    <Typography
                        variant="subtitle2"
                        className={styles.consequencesTitle}>
                        This will permanently delete:
                    </Typography>
                    <ul className={styles.consequencesList}>
                        <li>Player profile and personal information</li>
                        <li>Performance statistics and records</li>
                        <li>Associated team assignments</li>
                        <li>Historical data and achievements</li>
                    </ul>
                </Box>
            </DialogContent>

            <DialogActions className={styles.dialogActions}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    startIcon={<Cancel />}
                    className={styles.cancelButton}
                    disabled={loading}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    startIcon={<Delete />}
                    className={styles.deleteButton}
                    disabled={loading}
                    color="error">
                    {loading ? "Deleting..." : "Delete Player"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
