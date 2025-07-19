import React from "react";
import { CircularProgress, Box } from "@mui/material";
import styles from "../../styles/components/LoadingSpinner.module.css";

const LoadingSpinner = ({
    size = 40,
    color = "primary",
    message = "Loading...",
    showMessage = false,
}) => {
    return (
        <Box className={styles.container}>
            <CircularProgress size={size} color={color} />
            {showMessage && <p className={styles.message}>{message}</p>}
        </Box>
    );
};

export default LoadingSpinner;
