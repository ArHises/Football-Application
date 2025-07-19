import { createTheme } from "@mui/material/styles";

// Custom theme with Inter and Roboto fonts
const theme = createTheme({
    typography: {
        fontFamily:
            "'Inter', 'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        h1: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: "2.5rem",
            letterSpacing: "-0.025em",
        },
        h2: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 600,
            fontSize: "2rem",
            letterSpacing: "-0.02em",
        },
        h3: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 600,
            fontSize: "1.5rem",
            letterSpacing: "-0.015em",
        },
        h4: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 600,
            fontSize: "1.25rem",
        },
        h5: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 600,
            fontSize: "1.125rem",
        },
        h6: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
        },
        body1: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.6,
        },
        body2: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 1.6,
        },
        button: {
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontWeight: 500,
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "'Inter', 'Roboto', sans-serif",
                    fontWeight: 500,
                    textTransform: "none",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-input": {
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                    },
                    "& .MuiInputLabel-root": {
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                    },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    fontFamily: "'Inter', 'Roboto', sans-serif",
                    "& .MuiDataGrid-cell": {
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontFamily: "'Inter', 'Roboto', sans-serif",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontFamily: "'Inter', 'Roboto', sans-serif",
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

export default theme;
