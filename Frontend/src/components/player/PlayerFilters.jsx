import React from "react";
import {
    Paper,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Box,
    Slider,
    Button,
} from "@mui/material";
import { FilterList, Clear } from "@mui/icons-material";
import { PLAYER_CONSTANTS, UI_CONSTANTS } from "../../utils/constants";
import styles from "../../styles/components/PlayerFilters.module.css";

const PlayerFilters = ({
    nameFilter,
    nationalityFilter,
    ageRange,
    positionFilter,
    heightRange,
    availableNationalities,
    availablePositions,
    onNameChange,
    onNationalityChange,
    onAgeRangeChange,
    onPositionChange,
    onHeightRangeChange,
    onApplyFilters,
    onClearFilters,
}) => {
    return (
        <Paper sx={{ p: 3, mb: 3 }} className={styles.container}>
            <Typography variant="h6" sx={{ mb: 2 }} className={styles.title}>
                Filter Options
            </Typography>

            <Grid
                container
                spacing={3}
                direction="column"
                sx={{ maxWidth: 600, alignItems: "flex-start" }}>
                {/* Name Filter */}
                <Grid item sx={{ width: "100%" }}>
                    <TextField
                        label="Search by Name"
                        variant="outlined"
                        value={nameFilter}
                        onChange={onNameChange}
                        placeholder="Enter player name..."
                        sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}
                        className={styles.textField}
                    />
                </Grid>

                {/* Nationality Filter */}
                <Grid item sx={{ width: "100%" }}>
                    <FormControl sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}>
                        <InputLabel>Nationalities</InputLabel>
                        <Select
                            multiple
                            value={nationalityFilter}
                            onChange={onNationalityChange}
                            input={<OutlinedInput label="Nationalities" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 250,
                                        width: 300,
                                    },
                                },
                            }}
                            renderValue={(selected) => (
                                <Box className={styles.chipContainer}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            size="small"
                                            className={styles.chip}
                                        />
                                    ))}
                                </Box>
                            )}>
                            {availableNationalities.map((nationality) => (
                                <MenuItem key={nationality} value={nationality}>
                                    {nationality}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Position Filter */}
                <Grid item sx={{ width: "100%" }}>
                    <FormControl sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}>
                        <InputLabel>Positions</InputLabel>
                        <Select
                            multiple
                            value={positionFilter}
                            onChange={onPositionChange}
                            input={<OutlinedInput label="Positions" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 250,
                                        width: 300,
                                    },
                                },
                            }}
                            renderValue={(selected) => (
                                <Box className={styles.chipContainer}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            size="small"
                                            className={styles.chip}
                                        />
                                    ))}
                                </Box>
                            )}>
                            {availablePositions.map((position) => (
                                <MenuItem key={position} value={position}>
                                    {position}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Age Range */}
                <Grid item sx={{ width: "100%" }}>
                    <Box sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}>
                        <Typography gutterBottom className={styles.sliderLabel}>
                            Age Range: {ageRange[0]} - {ageRange[1]} years
                        </Typography>
                        <Slider
                            value={ageRange}
                            onChange={onAgeRangeChange}
                            valueLabelDisplay="auto"
                            min={PLAYER_CONSTANTS.FILTERS.AGE_LIMITS.MIN}
                            max={PLAYER_CONSTANTS.FILTERS.AGE_LIMITS.MAX}
                            marks={[
                                { value: 16, label: "16" },
                                { value: 25, label: "25" },
                                { value: 35, label: "35" },
                                { value: 45, label: "45" },
                            ]}
                            className={styles.slider}
                        />
                    </Box>
                </Grid>

                {/* Height Range */}
                <Grid item sx={{ width: "100%" }}>
                    <Box sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}>
                        <Typography gutterBottom className={styles.sliderLabel}>
                            Height Range: {heightRange[0]}cm - {heightRange[1]}
                            cm
                        </Typography>
                        <Slider
                            value={heightRange}
                            onChange={onHeightRangeChange}
                            valueLabelDisplay="auto"
                            min={PLAYER_CONSTANTS.FILTERS.HEIGHT_LIMITS.MIN}
                            max={PLAYER_CONSTANTS.FILTERS.HEIGHT_LIMITS.MAX}
                            marks={[
                                { value: 150, label: "150cm" },
                                { value: 175, label: "175cm" },
                                { value: 200, label: "200cm" },
                                { value: 220, label: "220cm" },
                            ]}
                            className={styles.slider}
                        />
                    </Box>
                </Grid>

                {/* Filter Actions */}
                <Grid item sx={{ width: "100%" }}>
                    <Box className={styles.buttonContainer}>
                        <Button
                            variant="contained"
                            onClick={onApplyFilters}
                            startIcon={<FilterList />}
                            className={styles.applyButton}>
                            Apply Filters
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={onClearFilters}
                            startIcon={<Clear />}
                            className={styles.clearButton}>
                            Clear All
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PlayerFilters;
