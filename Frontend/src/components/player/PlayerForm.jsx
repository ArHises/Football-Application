import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Box,
    Alert,
} from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PLAYER_CONSTANTS } from "../../utils/constants";
import { formatPositionWithFullName } from "../../utils/flagsAndGroups";
import { FlagIcon } from "../common";
import styles from "../../styles/components/PlayerForm.module.css";

const PlayerForm = ({
    player = null,
    availableNationalities = [],
    availablePositions = [],
    onSubmit,
    onCancel,
    loading = false,
    error = null,
}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        heightCm: "",
        nationalities: [],
        positions: [],
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (player) {
            // Parse date from backend format (dd-MM-yyyy) to Date object
            let parsedDate = null;
            if (player.dateOfBirth) {
                if (
                    player.dateOfBirth.includes("-") &&
                    player.dateOfBirth.split("-").length === 3
                ) {
                    const parts = player.dateOfBirth.split("-");
                    if (parts[0].length === 2) {
                        // dd-MM-yyyy format from backend
                        const [day, month, year] = parts;
                        parsedDate = new Date(year, month - 1, day);
                    } else {
                        // yyyy-MM-dd format
                        parsedDate = new Date(player.dateOfBirth);
                    }
                } else {
                    parsedDate = new Date(player.dateOfBirth);
                }
            }

            setFormData({
                firstName: player.firstName || "",
                lastName: player.lastName || "",
                dateOfBirth: parsedDate,
                heightCm: player.heightCm || "",
                nationalities: player.nationalities || [],
                positions: player.positions || [],
            });
        }
    }, [player]);

    const validateForm = () => {
        const errors = {};

        // First Name validation
        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required";
        } else if (formData.firstName.length < 2) {
            errors.firstName = "First name must be at least 2 characters";
        } else if (formData.firstName.length > 50) {
            errors.firstName = "First name must be less than 50 characters";
        }

        // Last Name validation
        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required";
        } else if (formData.lastName.length < 2) {
            errors.lastName = "Last name must be at least 2 characters";
        } else if (formData.lastName.length > 50) {
            errors.lastName = "Last name must be less than 50 characters";
        }

        // Date of Birth validation
        if (!formData.dateOfBirth) {
            errors.dateOfBirth = "Date of birth is required";
        } else {
            const age =
                new Date().getFullYear() - formData.dateOfBirth.getFullYear();
            if (age < (PLAYER_CONSTANTS.VALIDATION?.MIN_AGE || 16)) {
                errors.dateOfBirth = `Player must be at least ${
                    PLAYER_CONSTANTS.VALIDATION?.MIN_AGE || 16
                } years old`;
            } else if (age > (PLAYER_CONSTANTS.VALIDATION?.MAX_AGE || 50)) {
                errors.dateOfBirth = `Player must be younger than ${
                    PLAYER_CONSTANTS.VALIDATION?.MAX_AGE || 50
                } years old`;
            }
        }

        // Height validation
        if (!formData.heightCm) {
            errors.heightCm = "Height is required";
        } else {
            const height = Number(formData.heightCm);
            if (
                isNaN(height) ||
                height < (PLAYER_CONSTANTS.VALIDATION?.MIN_HEIGHT || 140)
            ) {
                errors.heightCm = `Height must be at least ${
                    PLAYER_CONSTANTS.VALIDATION?.MIN_HEIGHT || 140
                }cm`;
            } else if (
                height > (PLAYER_CONSTANTS.VALIDATION?.MAX_HEIGHT || 230)
            ) {
                errors.heightCm = `Height must be less than ${
                    PLAYER_CONSTANTS.VALIDATION?.MAX_HEIGHT || 230
                }cm`;
            }
        }

        // Nationalities validation
        if (formData.nationalities.length === 0) {
            errors.nationalities = "At least one nationality is required";
        }

        // Positions validation
        if (formData.positions.length === 0) {
            errors.positions = "At least one position is required";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Format date to dd-MM-yyyy format as required by backend
            let formattedDate = null;
            if (formData.dateOfBirth) {
                const date = new Date(formData.dateOfBirth);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                formattedDate = `${day}-${month}-${year}`;
            }

            const submitData = {
                ...formData,
                dateOfBirth: formattedDate,
                heightCm: Number(formData.heightCm),
            };
            onSubmit(submitData);
        }
    };

    const handleInputChange = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));

        // Clear validation error when user starts typing
        if (validationErrors[field]) {
            setValidationErrors((prev) => ({
                ...prev,
                [field]: null,
            }));
        }
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            dateOfBirth: date,
        }));

        if (validationErrors.dateOfBirth) {
            setValidationErrors((prev) => ({
                ...prev,
                dateOfBirth: null,
            }));
        }
    };

    const calculateAge = () => {
        if (!formData.dateOfBirth) return "";
        const today = new Date();
        const birthDate = new Date(formData.dateOfBirth);
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={styles.container}>
                <Card className={styles.card}>
                    <CardContent className={styles.cardContent}>
                        <Typography variant="h5" className={styles.title}>
                            {player ? "Edit Player" : "Add New Player"}
                        </Typography>

                        {error && (
                            <Alert severity="error" className={styles.alert}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <Grid container spacing={4}>
                                {/* Left Column - Basic Information */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        variant="h6"
                                        className={styles.sectionTitle}
                                    >
                                        Basic Information
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                value={formData.firstName}
                                                onChange={handleInputChange(
                                                    "firstName"
                                                )}
                                                error={
                                                    !!validationErrors.firstName
                                                }
                                                helperText={
                                                    validationErrors.firstName
                                                }
                                                required
                                                className={styles.textField}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                value={formData.lastName}
                                                onChange={handleInputChange(
                                                    "lastName"
                                                )}
                                                error={
                                                    !!validationErrors.lastName
                                                }
                                                helperText={
                                                    validationErrors.lastName
                                                }
                                                required
                                                className={styles.textField}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <DatePicker
                                                label="Date of Birth"
                                                value={formData.dateOfBirth}
                                                onChange={handleDateChange}
                                                format="dd/MM/yyyy"
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: !!validationErrors.dateOfBirth,
                                                        helperText:
                                                            validationErrors.dateOfBirth,
                                                        required: true,
                                                        className:
                                                            styles.textField,
                                                        placeholder:
                                                            "dd/mm/yyyy",
                                                    },
                                                }}
                                                maxDate={new Date()}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <Box className={styles.ageDisplay}>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {formData.dateOfBirth
                                                        ? `Age: ${calculateAge()} years`
                                                        : "Age: -"}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Height (cm)"
                                                type="number"
                                                value={formData.heightCm}
                                                onChange={handleInputChange(
                                                    "heightCm"
                                                )}
                                                error={
                                                    !!validationErrors.heightCm
                                                }
                                                helperText={
                                                    validationErrors.heightCm
                                                }
                                                required
                                                inputProps={{
                                                    min:
                                                        PLAYER_CONSTANTS
                                                            .VALIDATION
                                                            ?.MIN_HEIGHT || 140,
                                                    max:
                                                        PLAYER_CONSTANTS
                                                            .VALIDATION
                                                            ?.MAX_HEIGHT || 230,
                                                }}
                                                className={styles.textField}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Right Column - Professional Information */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        variant="h6"
                                        className={styles.sectionTitle}
                                    >
                                        Professional Information
                                    </Typography>

                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                    >
                                        {/* Selection Fields in Column */}
                                        <Grid size={{ xs: 12 }}>
                                            <FormControl
                                                fullWidth
                                                error={
                                                    !!validationErrors.nationalities
                                                }
                                                required
                                            >
                                                <InputLabel>
                                                    Nationalities
                                                </InputLabel>
                                                <Select
                                                    multiple
                                                    value={
                                                        formData.nationalities
                                                    }
                                                    onChange={handleInputChange(
                                                        "nationalities"
                                                    )}
                                                    input={
                                                        <OutlinedInput label="Nationalities" />
                                                    }
                                                    renderValue={(selected) => (
                                                        <Box
                                                            className={
                                                                styles.chipContainer
                                                            }
                                                        >
                                                            {selected.map(
                                                                (value) => (
                                                                    <Chip
                                                                        key={
                                                                            value
                                                                        }
                                                                        icon={
                                                                            <FlagIcon
                                                                                nationality={
                                                                                    value
                                                                                }
                                                                                size="14px"
                                                                            />
                                                                        }
                                                                        label={
                                                                            value
                                                                        }
                                                                        size="small"
                                                                        className={
                                                                            styles.chip
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </Box>
                                                    )}
                                                >
                                                    {availableNationalities.map(
                                                        (nationality) => (
                                                            <MenuItem
                                                                key={
                                                                    nationality
                                                                }
                                                                value={
                                                                    nationality
                                                                }
                                                            >
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: "8px",
                                                                    }}
                                                                >
                                                                    <FlagIcon
                                                                        nationality={
                                                                            nationality
                                                                        }
                                                                        size="16px"
                                                                    />
                                                                    {
                                                                        nationality
                                                                    }
                                                                </span>
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                                {validationErrors.nationalities && (
                                                    <Typography
                                                        variant="caption"
                                                        color="error"
                                                        className={
                                                            styles.helperText
                                                        }
                                                    >
                                                        {
                                                            validationErrors.nationalities
                                                        }
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <FormControl
                                                fullWidth
                                                error={
                                                    !!validationErrors.positions
                                                }
                                                required
                                            >
                                                <InputLabel>
                                                    Positions
                                                </InputLabel>
                                                <Select
                                                    multiple
                                                    value={formData.positions}
                                                    onChange={handleInputChange(
                                                        "positions"
                                                    )}
                                                    input={
                                                        <OutlinedInput label="Positions" />
                                                    }
                                                    renderValue={(selected) => (
                                                        <Box
                                                            className={
                                                                styles.chipContainer
                                                            }
                                                        >
                                                            {selected.map(
                                                                (value) => (
                                                                    <Chip
                                                                        key={
                                                                            value
                                                                        }
                                                                        label={formatPositionWithFullName(
                                                                            value
                                                                        )}
                                                                        size="small"
                                                                        className={
                                                                            styles.chip
                                                                        }
                                                                        color="primary"
                                                                    />
                                                                )
                                                            )}
                                                        </Box>
                                                    )}
                                                >
                                                    {availablePositions.map(
                                                        (position) => (
                                                            <MenuItem
                                                                key={position}
                                                                value={position}
                                                            >
                                                                {formatPositionWithFullName(
                                                                    position
                                                                )}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                                {validationErrors.positions && (
                                                    <Typography
                                                        variant="caption"
                                                        color="error"
                                                        className={
                                                            styles.helperText
                                                        }
                                                    >
                                                        {
                                                            validationErrors.positions
                                                        }
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        {/* Form Tips - Full Width */}
                                        <Grid size={{ xs: 12 }}>
                                            <Box className={styles.infoBox}>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    className={styles.infoTitle}
                                                >
                                                    📝 Form Tips:
                                                </Typography>
                                                <ul className={styles.tipsList}>
                                                    <li>
                                                        All fields marked with *
                                                        are required
                                                    </li>
                                                    <li>
                                                        Age is calculated
                                                        automatically from date
                                                        of birth
                                                    </li>
                                                    <li>
                                                        You can select multiple
                                                        nationalities and
                                                        positions
                                                    </li>
                                                    <li>
                                                        Height should be between
                                                        140-230 cm
                                                    </li>
                                                </ul>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Form Actions - Full Width */}
                                <Grid size={{ xs: 12 }}>
                                    <Box className={styles.actions}>
                                        <Button
                                            variant="outlined"
                                            onClick={onCancel}
                                            startIcon={<Cancel />}
                                            className={styles.cancelButton}
                                            disabled={loading}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<Save />}
                                            className={styles.submitButton}
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Saving..."
                                                : player
                                                ? "Update Player"
                                                : "Create Player"}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </LocalizationProvider>
    );
};

export default PlayerForm;
