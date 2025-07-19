import React, { useState, useRef } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
    Alert,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Chip,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
} from "@mui/material";
import {
    Upload,
    Download,
    Close,
    Check,
    Error as ErrorIcon,
    CloudUpload,
    InsertDriveFile,
    ExpandMore,
    ExpandLess,
    Info,
} from "@mui/icons-material";
import { formatters } from "../utils";
import { uploadCsv } from "../api/playerApi";
import styles from "../styles/components/UploadCsv.module.css";

const UploadCsv = ({ onUploadComplete, onClose }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const csvRequirements = [
        {
            field: "firstName",
            type: "Text",
            description: "Player's first name (2-50 characters)",
            example: "John",
        },
        {
            field: "lastName",
            type: "Text",
            description: "Player's last name (2-50 characters)",
            example: "Doe",
        },
        {
            field: "dateOfBirth",
            type: "Date",
            description: "Birth date in YYYY-MM-DD format",
            example: "1995-03-15",
        },
        {
            field: "heightCm",
            type: "Number",
            description: "Height in centimeters (140-230)",
            example: "180",
        },
        {
            field: "nationalities",
            type: "Text",
            description: "Comma-separated list in quotes",
            example: '"American,Canadian"',
        },
        {
            field: "positions",
            type: "Text",
            description: "Comma-separated list in quotes",
            example: '"Forward,Midfielder"',
        },
    ];

    const handleFileSelect = (selectedFile) => {
        if (selectedFile && selectedFile.type === "text/csv") {
            setFile(selectedFile);
            setError("");
            setResults(null);
        } else {
            setError("Please select a valid CSV file");
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        handleFileSelect(selectedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        const droppedFile = event.dataTransfer.files[0];
        handleFileSelect(droppedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError("");
        setUploadProgress(0);

        try {
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const response = await uploadCsv(file);

            clearInterval(progressInterval);
            setUploadProgress(100);

            const result = response.data;
            setResults(result);

            setTimeout(() => {
                onUploadComplete(result);
            }, 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to upload file. Please try again."
            );
            setUploadProgress(0);
        } finally {
            setUploading(false);
        }
    };

    const downloadSample = () => {
        const csvContent = `firstName,lastName,dateOfBirth,heightCm,nationalities,positions
John,Doe,1995-03-15,180,"American","Forward,Midfielder"
Jane,Smith,1992-07-22,175,"Canadian","Defender"
Mike,Johnson,1998-01-10,185,"British,Irish","Goalkeeper"
Sarah,Williams,1996-11-08,168,"Spanish,French","Midfielder"
David,Brown,1993-05-12,182,"German","Forward"`;

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "players_sample.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const clearFile = () => {
        setFile(null);
        setResults(null);
        setError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={styles.container}>
            <Paper elevation={4} className={styles.paper}>
                <Box className={styles.header}>
                    <Typography variant="h5" className={styles.title}>
                        <CloudUpload className={styles.titleIcon} />
                        Bulk Upload Players
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        className={styles.closeButton}>
                        <Close />
                    </IconButton>
                </Box>

                {error && (
                    <Alert severity="error" className={styles.alert}>
                        {error}
                    </Alert>
                )}

                {/* Instructions Section */}
                <Card className={styles.instructionsCard}>
                    <CardContent className={styles.instructionsContent}>
                        <Box className={styles.instructionsHeader}>
                            <Info className={styles.infoIcon} />
                            <Typography
                                variant="h6"
                                className={styles.instructionsTitle}>
                                CSV Upload Instructions
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    setShowInstructions(!showInstructions)
                                }
                                className={styles.expandButton}>
                                {showInstructions ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </IconButton>
                        </Box>

                        <Collapse in={showInstructions}>
                            <Box className={styles.instructionsDetails}>
                                <Button
                                    variant="outlined"
                                    startIcon={<Download />}
                                    onClick={downloadSample}
                                    className={styles.sampleButton}>
                                    Download Sample CSV
                                </Button>

                                <TableContainer
                                    className={styles.requirementsTable}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <strong>Field</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Type</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Description</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Example</strong>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {csvRequirements.map((req) => (
                                                <TableRow key={req.field}>
                                                    <TableCell>
                                                        <Chip
                                                            label={req.field}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        {req.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {req.description}
                                                    </TableCell>
                                                    <TableCell>
                                                        <code
                                                            className={
                                                                styles.exampleCode
                                                            }>
                                                            {req.example}
                                                        </code>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Alert
                                    severity="info"
                                    className={styles.tipsAlert}>
                                    <Typography
                                        variant="subtitle2"
                                        className={styles.tipsTitle}>
                                        💡 Tips for successful upload:
                                    </Typography>
                                    <ul className={styles.tipsList}>
                                        <li>
                                            Ensure all required columns are
                                            present
                                        </li>
                                        <li>Use YYYY-MM-DD format for dates</li>
                                        <li>
                                            Wrap multi-value fields in quotes
                                        </li>
                                        <li>
                                            Use comma separation within
                                            multi-value fields
                                        </li>
                                        <li>File size limit: 5MB</li>
                                    </ul>
                                </Alert>
                            </Box>
                        </Collapse>
                    </CardContent>
                </Card>

                {/* File Upload Section */}
                <Box className={styles.uploadSection}>
                    <Box
                        className={`${styles.dropZone} ${
                            dragOver ? styles.dragOver : ""
                        } ${file ? styles.hasFile : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}>
                        <input
                            ref={fileInputRef}
                            accept=".csv"
                            style={{ display: "none" }}
                            type="file"
                            onChange={handleFileInputChange}
                        />

                        {file ? (
                            <Box className={styles.fileInfo}>
                                <InsertDriveFile className={styles.fileIcon} />
                                <Typography
                                    variant="h6"
                                    className={styles.fileName}>
                                    {file.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={styles.fileSize}>
                                    {formatters.formatFileSize(file.size)}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearFile();
                                    }}
                                    className={styles.clearFileButton}
                                    size="small">
                                    Choose Different File
                                </Button>
                            </Box>
                        ) : (
                            <Box className={styles.uploadPrompt}>
                                <CloudUpload className={styles.uploadIcon} />
                                <Typography
                                    variant="h6"
                                    className={styles.uploadTitle}>
                                    Drag & drop your CSV file here
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={styles.uploadSubtitle}>
                                    or click to browse files
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className={styles.uploadHint}>
                                    Supports: .csv files up to 5MB
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* Upload Action */}
                <Box className={styles.actionSection}>
                    <Button
                        variant="contained"
                        startIcon={<Upload />}
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className={styles.uploadButton}
                        size="large">
                        {uploading
                            ? `Uploading... ${uploadProgress}%`
                            : "Upload Players"}
                    </Button>
                </Box>

                {uploading && (
                    <Box className={styles.progressSection}>
                        <LinearProgress
                            variant="determinate"
                            value={uploadProgress}
                            className={styles.progressBar}
                        />
                        <Typography
                            variant="body2"
                            className={styles.progressText}>
                            Processing your file... {uploadProgress}%
                        </Typography>
                    </Box>
                )}

                {/* Results Section */}
                {results && (
                    <Card className={styles.resultsCard}>
                        <CardContent className={styles.resultsContent}>
                            <Typography
                                variant="h6"
                                className={styles.resultsTitle}>
                                Upload Results
                            </Typography>

                            <Box className={styles.resultsStats}>
                                <Alert
                                    severity="success"
                                    className={styles.successAlert}>
                                    <Box className={styles.statItem}>
                                        <Check className={styles.statIcon} />
                                        <Typography variant="h6">
                                            {results.successful || 0}
                                        </Typography>
                                        <Typography variant="body2">
                                            Players Added
                                        </Typography>
                                    </Box>
                                </Alert>

                                {results.errors &&
                                    results.errors.length > 0 && (
                                        <Alert
                                            severity="warning"
                                            className={styles.warningAlert}>
                                            <Box className={styles.statItem}>
                                                <ErrorIcon
                                                    className={styles.statIcon}
                                                />
                                                <Typography variant="h6">
                                                    {results.errors.length}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Failed
                                                </Typography>
                                            </Box>
                                        </Alert>
                                    )}
                            </Box>

                            {results.errors && results.errors.length > 0 && (
                                <Box className={styles.errorsList}>
                                    <Typography
                                        variant="subtitle2"
                                        className={styles.errorsTitle}>
                                        Issues found:
                                    </Typography>
                                    <List className={styles.errorItems}>
                                        {results.errors
                                            .slice(0, 5)
                                            .map((error, index) => (
                                                <React.Fragment key={index}>
                                                    <ListItem
                                                        className={
                                                            styles.errorItem
                                                        }>
                                                        <ErrorIcon
                                                            color="error"
                                                            className={
                                                                styles.errorItemIcon
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={`Row ${error.row}: ${error.message}`}
                                                            secondary={
                                                                error.data
                                                                    ? `Data: ${JSON.stringify(
                                                                          error.data
                                                                      ).substring(
                                                                          0,
                                                                          100
                                                                      )}...`
                                                                    : "Invalid data format"
                                                            }
                                                            className={
                                                                styles.errorItemText
                                                            }
                                                        />
                                                    </ListItem>
                                                    {index <
                                                        Math.min(
                                                            results.errors
                                                                .length,
                                                            5
                                                        ) -
                                                            1 && (
                                                        <Divider
                                                            className={
                                                                styles.errorDivider
                                                            }
                                                        />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </List>
                                    {results.errors.length > 5 && (
                                        <Typography
                                            variant="caption"
                                            className={styles.moreErrors}>
                                            + {results.errors.length - 5} more
                                            errors...
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                )}
            </Paper>
        </div>
    );
};

export default UploadCsv;
