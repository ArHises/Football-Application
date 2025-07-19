export const PLAYER_CONSTANTS = {
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 10,
        PAGE_SIZE_OPTIONS: [5, 10, 20],
    },

    FILTERS: {
        DEFAULT_AGE_RANGE: [18, 40],
        DEFAULT_HEIGHT_RANGE: [150, 200],
        AGE_LIMITS: { MIN: 16, MAX: 45 },
        HEIGHT_LIMITS: { MIN: 150, MAX: 220 },
        DEBOUNCE_DELAY: 300,
        MIN_SEARCH_LENGTH: 2,
    },

    VALIDATION: {
        MIN_AGE: 16,
        MAX_AGE: 50,
        MIN_HEIGHT: 140,
        MAX_HEIGHT: 230,
        MIN_NAME_LENGTH: 2,
        MAX_NAME_LENGTH: 50,
        MAX_FILE_SIZE: 5 * 1024 * 1024,
    },

    SORT_OPTIONS: [
        { field: "firstName", label: "First Name" },
        { field: "lastName", label: "Last Name" },
        { field: "dateOfBirth", label: "Age" },
        { field: "heightCm", label: "Height" },
        { field: "createdAt", label: "Created Date" },
    ],

    FALLBACK_DATA: {
        NATIONALITIES: [
            "Portugal",
            "France",
            "Argentina",
            "USA",
            "Canada",
            "Brazil",
        ],
        POSITIONS: [
            "LW",
            "ST",
            "RW",
            "CF",
            "Forward",
            "Midfielder",
            "Destroyer",
        ],
    },
};

export const UI_CONSTANTS = {
    FILTER_WIDTH: 400,
    TABLE_HEIGHT: 500,
    TABLE_MIN_WIDTH: 800,

    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1200,
    },
};

export const API_ENDPOINTS = {
    PLAYERS: "/players",
    UPLOAD: "/players/upload",
    NATIONALITIES: "/players/nationalities",
    POSITIONS: "/players/positions",
};

export const MESSAGES = {
    ERRORS: {
        GENERIC: "An error occurred. Please try again.",
        NETWORK: "Network error. Please check your connection.",
        VALIDATION: "Please check your input and try again.",
        FILE_SIZE: "File size exceeds the maximum limit of 5MB.",
        FILE_TYPE: "Please select a valid CSV file.",
    },
    SUCCESS: {
        PLAYER_CREATED: "Player created successfully!",
        PLAYER_UPDATED: "Player updated successfully!",
        PLAYER_DELETED: "Player deleted successfully!",
        FILE_UPLOADED: "File uploaded successfully!",
    },
    CONFIRM: {
        DELETE_PLAYER: "Are you sure you want to delete this player?",
    },
};
