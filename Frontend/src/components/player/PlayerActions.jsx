import React from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, Delete } from "@mui/icons-material";
import styles from "../../styles/components/PlayerActions.module.css";

const PlayerActions = ({ player, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/players/${player.id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent row click navigation when deleting
        if (
            window.confirm(
                `Are you sure you want to delete ${player.firstName} ${player.lastName}?`
            )
        ) {
            onDelete(player.id);
        }
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
        </div>
    );
};

export default PlayerActions;
