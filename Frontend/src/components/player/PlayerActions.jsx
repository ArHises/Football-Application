import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, Delete } from "@mui/icons-material";
import { DeleteConfirmationModal } from "../common";
import styles from "../../styles/components/PlayerActions.module.css";

const PlayerActions = ({ player, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const handleView = () => {
        navigate(`/players/${player.id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setDeleteModalOpen(true);
        setDeleteError(null);
    };

    const handleDeleteConfirm = async (playerId) => {
        try {
            setDeleteLoading(true);
            setDeleteError(null);
            await onDelete(playerId);
            setDeleteModalOpen(false);
        } catch (err) {
            let errorMessage = "Failed to delete player";

            if (err.response?.status === 500) {
                errorMessage =
                    "Server error: The delete operation failed. This might be due to database constraints or server configuration issues.";
            } else if (err.response?.status === 404) {
                errorMessage =
                    "Player not found. It may have already been deleted.";
                setDeleteModalOpen(false);
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

    return (
        <div className={styles.container}>
            <button
                className={`${styles.button} ${styles.viewButton}`}
                onClick={handleView}
                title={`View ${player.firstName} ${player.lastName} details`}>
                <Visibility fontSize="small" />
                View
            </button>
            <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={handleDelete}
                title={`Delete ${player.firstName} ${player.lastName}`}>
                <Delete fontSize="small" />
                Delete
            </button>

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

export default PlayerActions;
