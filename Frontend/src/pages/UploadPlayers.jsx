import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UploadCsv } from "../components";
import styles from "../styles/pages/UploadPlayers.module.css";

function UploadPlayers() {
    const navigate = useNavigate();

    const handleUploadComplete = () => {
        navigate("/");
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <Box className={styles.header}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate("/")}
                    className={styles.backButton}>
                    Back to Players
                </Button>
                <Typography variant="h4" className={styles.title}>
                    Upload Players from CSV
                </Typography>
            </Box>

            <div className={styles.content}>
                <UploadCsv
                    onUploadComplete={handleUploadComplete}
                    onClose={handleCancel}
                />
            </div>
        </div>
    );
}

export default UploadPlayers;
