import React, { useState } from "react";
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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
} from "@mui/material";
import {
    FilterList,
    Clear,
    ExpandMore,
    Public,
    SportsFootball,
    Group,
} from "@mui/icons-material";
import { PLAYER_CONSTANTS, UI_CONSTANTS } from "../../utils/constants";
import {
    CONTINENT_GROUPS,
    POSITION_GROUPS,
    formatPositionWithFullName,
} from "../../utils/flagsAndGroups";
import { FlagIcon } from "../common";
import styles from "../../styles/components/PlayerFilters.module.css";

const EnhancedPlayerFilters = ({
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
    const [continentFilter, setContinentFilter] = useState([]);
    const [positionGroupFilter, setPositionGroupFilter] = useState([]);
    const [expandedPanels, setExpandedPanels] = useState({
        basic: true,
        continents: false,
        positionGroups: false,
    });
    const [expandedContinents, setExpandedContinents] = useState({});

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpandedPanels((prev) => ({ ...prev, [panel]: isExpanded }));
    };

    const handleContinentChange = (event) => {
        const selectedContinents = event.target.value;
        setContinentFilter(selectedContinents);

        // Update nationality filter based on selected continents
        const nationalitiesFromContinents = selectedContinents.flatMap(
            (continent) => CONTINENT_GROUPS[continent] || []
        );

        // Merge with existing nationality filter
        const allSelectedNationalities = [
            ...new Set([...nationalityFilter, ...nationalitiesFromContinents]),
        ].filter((nat) => availableNationalities.includes(nat));

        onNationalityChange({ target: { value: allSelectedNationalities } });
    };

    const handlePositionGroupChange = (event) => {
        const selectedGroups = event.target.value;
        setPositionGroupFilter(selectedGroups);

        // Update position filter based on selected groups
        const positionsFromGroups = selectedGroups.flatMap(
            (group) => POSITION_GROUPS[group] || []
        );

        // Merge with existing position filter
        const allSelectedPositions = [
            ...new Set([...positionFilter, ...positionsFromGroups]),
        ].filter((pos) => availablePositions.includes(pos));

        onPositionChange({ target: { value: allSelectedPositions } });
    };

    const handleClearAll = () => {
        setContinentFilter([]);
        setPositionGroupFilter([]);
        onClearFilters();
    };

    // Group available nationalities by continent
    const nationalitiesByContinent = {};
    availableNationalities.forEach((nationality) => {
        let continent = "Other";
        for (const [cont, countries] of Object.entries(CONTINENT_GROUPS)) {
            if (countries.includes(nationality)) {
                continent = cont;
                break;
            }
        }
        if (!nationalitiesByContinent[continent]) {
            nationalitiesByContinent[continent] = [];
        }
        nationalitiesByContinent[continent].push(nationality);
    });

    // Group available positions by group
    const positionsByGroup = {};
    availablePositions.forEach((position) => {
        let group = "Other";
        for (const [grp, positions] of Object.entries(POSITION_GROUPS)) {
            if (positions.includes(position)) {
                group = grp;
                break;
            }
        }
        if (!positionsByGroup[group]) {
            positionsByGroup[group] = [];
        }
        positionsByGroup[group].push(position);
    });

    return (
        <Paper sx={{ p: 3, mb: 3 }} className={styles.container}>
            <Typography variant="h6" sx={{ mb: 2 }} className={styles.title}>
                🔍 Advanced Filter Options
            </Typography>

            {/* Basic Filters */}
            <Accordion
                expanded={expandedPanels.basic}
                onChange={handlePanelChange("basic")}
                className={styles.accordion}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FilterList />
                        <Typography variant="h6">Basic Filters</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        spacing={3}
                        direction="column"
                        sx={{ maxWidth: 600 }}
                    >
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
                            <FormControl
                                sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}
                            >
                                <InputLabel>Nationalities</InputLabel>
                                <Select
                                    multiple
                                    value={nationalityFilter}
                                    onChange={onNationalityChange}
                                    input={
                                        <OutlinedInput label="Nationalities" />
                                    }
                                    renderValue={(selected) => (
                                        <Box className={styles.chipContainer}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 0.5,
                                                            }}
                                                        >
                                                            <FlagIcon
                                                                nationality={
                                                                    value
                                                                }
                                                            />
                                                            {value}
                                                        </Box>
                                                    }
                                                    size="small"
                                                    className={styles.chip}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {availableNationalities.map(
                                        (nationality) => (
                                            <MenuItem
                                                key={nationality}
                                                value={nationality}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <FlagIcon
                                                        nationality={
                                                            nationality
                                                        }
                                                    />
                                                    {nationality}
                                                </Box>
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Position Filter */}
                        <Grid item sx={{ width: "100%" }}>
                            <FormControl
                                sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}
                            >
                                <InputLabel>Positions</InputLabel>
                                <Select
                                    multiple
                                    value={positionFilter}
                                    onChange={onPositionChange}
                                    input={<OutlinedInput label="Positions" />}
                                    renderValue={(selected) => (
                                        <Box className={styles.chipContainer}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={formatPositionWithFullName(
                                                        value
                                                    )}
                                                    size="small"
                                                    className={styles.chip}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {availablePositions.map((position) => (
                                        <MenuItem
                                            key={position}
                                            value={position}
                                        >
                                            {formatPositionWithFullName(
                                                position
                                            )}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Age Range */}
                        <Grid item sx={{ width: "100%" }}>
                            <Box sx={{ width: UI_CONSTANTS.FILTER_WIDTH }}>
                                <Typography
                                    gutterBottom
                                    className={styles.sliderLabel}
                                >
                                    Age Range: {ageRange[0]} - {ageRange[1]}{" "}
                                    years
                                </Typography>
                                <Slider
                                    value={ageRange}
                                    onChange={onAgeRangeChange}
                                    valueLabelDisplay="auto"
                                    min={
                                        PLAYER_CONSTANTS.FILTERS.AGE_LIMITS.MIN
                                    }
                                    max={
                                        PLAYER_CONSTANTS.FILTERS.AGE_LIMITS.MAX
                                    }
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
                                <Typography
                                    gutterBottom
                                    className={styles.sliderLabel}
                                >
                                    Height Range: {heightRange[0]}cm -{" "}
                                    {heightRange[1]}cm
                                </Typography>
                                <Slider
                                    value={heightRange}
                                    onChange={onHeightRangeChange}
                                    valueLabelDisplay="auto"
                                    min={
                                        PLAYER_CONSTANTS.FILTERS.HEIGHT_LIMITS
                                            .MIN
                                    }
                                    max={
                                        PLAYER_CONSTANTS.FILTERS.HEIGHT_LIMITS
                                            .MAX
                                    }
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
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Continental Grouping */}
            <Accordion
                expanded={expandedPanels.continents}
                onChange={handlePanelChange("continents")}
                className={styles.accordion}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Public />
                        <Typography variant="h6">
                            Filter by Continents
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            (Groups nationalities by region)
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {Object.entries(nationalitiesByContinent).map(
                            ([continent, countries]) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={continent}
                                >
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            backgroundColor: "#fafafa",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            🌍 {continent} ({countries.length})
                                        </Typography>
                                        <FormGroup>
                                            {countries
                                                .slice(
                                                    0,
                                                    expandedContinents[
                                                        continent
                                                    ]
                                                        ? countries.length
                                                        : 5
                                                )
                                                .map((country) => (
                                                    <FormControlLabel
                                                        key={country}
                                                        control={
                                                            <Checkbox
                                                                checked={nationalityFilter.includes(
                                                                    country
                                                                )}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newFilter =
                                                                        e.target
                                                                            .checked
                                                                            ? [
                                                                                  ...nationalityFilter,
                                                                                  country,
                                                                              ]
                                                                            : nationalityFilter.filter(
                                                                                  (
                                                                                      n
                                                                                  ) =>
                                                                                      n !==
                                                                                      country
                                                                              );
                                                                    onNationalityChange(
                                                                        {
                                                                            target: {
                                                                                value: newFilter,
                                                                            },
                                                                        }
                                                                    );
                                                                }}
                                                                size="small"
                                                            />
                                                        }
                                                        label={
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    gap: "6px",
                                                                }}
                                                            >
                                                                <FlagIcon
                                                                    nationality={
                                                                        country
                                                                    }
                                                                    size="14px"
                                                                />
                                                                {country}
                                                            </Typography>
                                                        }
                                                    />
                                                ))}
                                            {countries.length > 5 && (
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    onClick={() =>
                                                        setExpandedContinents(
                                                            (prev) => ({
                                                                ...prev,
                                                                [continent]:
                                                                    !prev[
                                                                        continent
                                                                    ],
                                                            })
                                                        )
                                                    }
                                                    sx={{
                                                        mt: 1,
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    {expandedContinents[
                                                        continent
                                                    ]
                                                        ? "Show less"
                                                        : `+${
                                                              countries.length -
                                                              5
                                                          } more...`}
                                                </Button>
                                            )}
                                        </FormGroup>
                                    </Paper>
                                </Grid>
                            )
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Position Group Filtering */}
            <Accordion
                expanded={expandedPanels.positionGroups}
                onChange={handlePanelChange("positionGroups")}
                className={styles.accordion}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SportsFootball />
                        <Typography variant="h6">
                            Filter by Position Groups
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            (Groups positions by role)
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {Object.entries(positionsByGroup).map(
                            ([group, positions]) => (
                                <Grid item xs={12} sm={4} key={group}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            backgroundColor: "#fafafa",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            {group === "Defenders" && "🛡️"}
                                            {group === "Midfielders" && "⚽"}
                                            {group === "Forwards" && "🥅"}
                                            {group === "Other" && "📋"} {group}{" "}
                                            ({positions.length})
                                        </Typography>
                                        <FormGroup>
                                            {positions.map((position) => (
                                                <FormControlLabel
                                                    key={position}
                                                    control={
                                                        <Checkbox
                                                            checked={positionFilter.includes(
                                                                position
                                                            )}
                                                            onChange={(e) => {
                                                                const newFilter =
                                                                    e.target
                                                                        .checked
                                                                        ? [
                                                                              ...positionFilter,
                                                                              position,
                                                                          ]
                                                                        : positionFilter.filter(
                                                                              (
                                                                                  p
                                                                              ) =>
                                                                                  p !==
                                                                                  position
                                                                          );
                                                                onPositionChange(
                                                                    {
                                                                        target: {
                                                                            value: newFilter,
                                                                        },
                                                                    }
                                                                );
                                                            }}
                                                            size="small"
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="body2">
                                                            {formatPositionWithFullName(
                                                                position
                                                            )}
                                                        </Typography>
                                                    }
                                                />
                                            ))}
                                        </FormGroup>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => {
                                                const newFilter = [
                                                    ...new Set([
                                                        ...positionFilter,
                                                        ...positions,
                                                    ]),
                                                ];
                                                onPositionChange({
                                                    target: {
                                                        value: newFilter,
                                                    },
                                                });
                                            }}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Select All {group}
                                        </Button>
                                    </Paper>
                                </Grid>
                            )
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 3 }} />

            {/* Filter Actions */}
            <Box className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    onClick={onApplyFilters}
                    startIcon={<FilterList />}
                    className={styles.applyButton}
                    size="large"
                >
                    Apply Filters
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClearAll}
                    startIcon={<Clear />}
                    className={styles.clearButton}
                    size="large"
                >
                    Clear All Filters
                </Button>
            </Box>
        </Paper>
    );
};

export default EnhancedPlayerFilters;
