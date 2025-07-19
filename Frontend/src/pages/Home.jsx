import React from "react";
import { Button } from "@mui/material";
import { Add, Upload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PlayerList } from "../components";
import styles from "../styles/pages/Home.module.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Player Management System</h1>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<Upload />}
                        onClick={() => navigate("/upload")}
                        className={styles.uploadButton}>
                        Upload CSV
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<Add />}
                        onClick={() => navigate("/create")}
                        className={styles.addButton}>
                        Add New Player
                    </Button>
                </div>
            </div>

            <PlayerList />
        </div>
    );
}

export default Home;
