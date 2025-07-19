import React from "react";
import { Alert, Button, Box } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import styles from "../../styles/components/ErrorAlert.module.css";

const ErrorAlert = ({
    error,
    onRetry,
    showRetry = true,
    severity = "error",
    retryText = "Retry",
}) => {
    return (
        <Box className={styles.container}>
            <Alert severity={severity} className={styles.alert}>
                {error}
            </Alert>
            {showRetry && onRetry && (
                <Button
                    variant="contained"
                    onClick={onRetry}
                    startIcon={<Refresh />}
                    className={styles.retryButton}>
                    {retryText}
                </Button>
            )}
        </Box>
    );
};

export default ErrorAlert;
