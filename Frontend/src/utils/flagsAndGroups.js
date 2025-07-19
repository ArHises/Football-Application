// Country code mapping (ISO 3166-1 alpha-2)
export const COUNTRY_CODES = {
    // Europe
    Portugal: "PT",
    Spain: "ES",
    France: "FR",
    Italy: "IT",
    Germany: "DE",
    England: "GB",
    Netherlands: "NL",
    Belgium: "BE",
    Croatia: "HR",
    Poland: "PL",
    Ukraine: "UA",
    Sweden: "SE",
    Norway: "NO",
    Denmark: "DK",
    Finland: "FI",
    Switzerland: "CH",
    Austria: "AT",
    "Czech Republic": "CZ",
    Serbia: "RS",
    Greece: "GR",
    Turkey: "TR",
    Russia: "RU",

    // South America
    Argentina: "AR",
    Brazil: "BR",
    Uruguay: "UY",
    Colombia: "CO",
    Chile: "CL",
    Peru: "PE",
    Ecuador: "EC",
    Paraguay: "PY",
    Bolivia: "BO",
    Venezuela: "VE",

    // North America
    USA: "US",
    "United States": "US",
    Canada: "CA",
    Mexico: "MX",
    "Costa Rica": "CR",
    Jamaica: "JM",
    Panama: "PA",
    Honduras: "HN",
    Guatemala: "GT",

    // Africa
    Nigeria: "NG",
    Morocco: "MA",
    Egypt: "EG",
    Ghana: "GH",
    "South Africa": "ZA",
    Senegal: "SN",
    Algeria: "DZ",
    Tunisia: "TN",
    Cameroon: "CM",
    "Ivory Coast": "CI",
    Mali: "ML",
    "Burkina Faso": "BF",

    // Asia
    Japan: "JP",
    "South Korea": "KR",
    China: "CN",
    India: "IN",
    Australia: "AU",
    Iran: "IR",
    "Saudi Arabia": "SA",
    Qatar: "QA",
    UAE: "AE",
    Thailand: "TH",
    Vietnam: "VN",
    Indonesia: "ID",
    Malaysia: "MY",
    Singapore: "SG",
    Philippines: "PH",

    // Oceania
    "New Zealand": "NZ",
    Fiji: "FJ",
};

// Get country code for flag display
export const getFlagCountryCode = (nationality) => {
    return COUNTRY_CODES[nationality] || null;
};

// Get flag props for ReactCountryFlag component
export const getFlagProps = (nationality, size = "16px", style = {}) => {
    const countryCode = COUNTRY_CODES[nationality];

    if (!countryCode) {
        return null;
    }

    return {
        countryCode,
        svg: true,
        style: {
            width: size,
            height: size,
            borderRadius: "2px",
            ...style,
        },
        title: nationality,
    };
};

// Legacy support - keep the emoji mapping for fallback
export const COUNTRY_FLAGS = {
    // Europe
    Portugal: "🇵🇹",
    Spain: "🇪🇸",
    France: "🇫🇷",
    Italy: "🇮🇹",
    Germany: "🇩🇪",
    England: "🏴",
    Netherlands: "🇳🇱",
    Belgium: "🇧🇪",
    Croatia: "🇭🇷",
    Poland: "🇵🇱",
    Ukraine: "🇺🇦",
    Sweden: "🇸🇪",
    Norway: "🇳🇴",
    Denmark: "🇩🇰",
    Finland: "🇫🇮",
    Switzerland: "🇨🇭",
    Austria: "🇦🇹",
    "Czech Republic": "🇨🇿",
    Serbia: "🇷🇸",
    Greece: "🇬🇷",
    Turkey: "🇹🇷",
    Russia: "🇷🇺",

    // South America
    Argentina: "🇦🇷",
    Brazil: "🇧🇷",
    Uruguay: "🇺🇾",
    Colombia: "🇨🇴",
    Chile: "🇨🇱",
    Peru: "🇵🇪",
    Ecuador: "🇪🇨",
    Paraguay: "🇵🇾",
    Bolivia: "🇧🇴",
    Venezuela: "🇻🇪",

    // North America
    USA: "🇺🇸",
    "United States": "🇺🇸",
    Canada: "🇨🇦",
    Mexico: "🇲🇽",
    "Costa Rica": "🇨🇷",
    Jamaica: "🇯🇲",
    Panama: "🇵🇦",
    Honduras: "🇭🇳",
    Guatemala: "🇬🇹",

    // Africa
    Nigeria: "🇳🇬",
    Morocco: "🇲🇦",
    Egypt: "🇪🇬",
    Ghana: "🇬🇭",
    "South Africa": "🇿🇦",
    Senegal: "🇸🇳",
    Algeria: "🇩🇿",
    Tunisia: "🇹🇳",
    Cameroon: "🇨🇲",
    "Ivory Coast": "🇨🇮",
    Mali: "🇲🇱",
    "Burkina Faso": "🇧🇫",

    // Asia
    Japan: "🇯🇵",
    "South Korea": "🇰🇷",
    China: "🇨🇳",
    India: "🇮🇳",
    Australia: "🇦🇺",
    Iran: "🇮🇷",
    "Saudi Arabia": "🇸🇦",
    Qatar: "🇶🇦",
    UAE: "🇦🇪",
    Thailand: "🇹🇭",
    Vietnam: "🇻🇳",
    Indonesia: "🇮🇩",
    Malaysia: "🇲🇾",
    Singapore: "🇸🇬",
    Philippines: "🇵🇭",
};

export const CONTINENT_GROUPS = {
    Europe: [
        "Portugal",
        "Spain",
        "France",
        "Italy",
        "Germany",
        "England",
        "Netherlands",
        "Belgium",
        "Croatia",
        "Poland",
        "Ukraine",
        "Sweden",
        "Norway",
        "Denmark",
        "Finland",
        "Switzerland",
        "Austria",
        "Czech Republic",
        "Serbia",
        "Greece",
        "Turkey",
        "Russia",
    ],
    "South America": [
        "Argentina",
        "Brazil",
        "Uruguay",
        "Colombia",
        "Chile",
        "Peru",
        "Ecuador",
        "Paraguay",
        "Bolivia",
        "Venezuela",
    ],
    "North America": [
        "USA",
        "United States",
        "Canada",
        "Mexico",
        "Costa Rica",
        "Jamaica",
        "Panama",
        "Honduras",
        "Guatemala",
    ],
    Africa: [
        "Nigeria",
        "Morocco",
        "Egypt",
        "Ghana",
        "South Africa",
        "Senegal",
        "Algeria",
        "Tunisia",
        "Cameroon",
        "Ivory Coast",
        "Mali",
        "Burkina Faso",
    ],
    Asia: [
        "Japan",
        "South Korea",
        "China",
        "India",
        "Australia",
        "Iran",
        "Saudi Arabia",
        "Qatar",
        "UAE",
        "Thailand",
        "Vietnam",
        "Indonesia",
        "Malaysia",
        "Singapore",
        "Philippines",
    ],
};

export const POSITION_GROUPS = {
    Defenders: ["CB", "RB", "LB", "LWB", "RWB"],
    Midfielders: ["CDM", "CM", "CAM", "RM", "LM"],
    Forwards: ["RF", "LF", "CF", "ST", "LW", "RW"],
};

export const POSITION_FULL_NAMES = {
    // Defenders
    CB: "Centre-Back",
    RB: "Right-Back",
    LB: "Left-Back",
    LWB: "Left Wing-Back",
    RWB: "Right Wing-Back",

    // Midfielders
    CDM: "Defensive Midfielder",
    CM: "Centre Midfielder",
    CAM: "Central Attacking Midfielder",
    RM: "Right Midfielder",
    LM: "Left Midfielder",

    // Forwards
    RF: "Right Forward",
    LF: "Left Forward",
    CF: "Centre Forward",
    ST: "Striker",
    LW: "Left Wing",
    RW: "Right Wing",
};

/**
 * Get flag emoji for a country
 * @param {string} country - Country name
 * @returns {string} Flag emoji or empty string if not found
 */
export const getCountryFlag = (country) => {
    return COUNTRY_FLAGS[country] || "";
};

/**
 * Get continent for a country
 * @param {string} country - Country name
 * @returns {string} Continent name or 'Other' if not found
 */
export const getCountryContinent = (country) => {
    for (const [continent, countries] of Object.entries(CONTINENT_GROUPS)) {
        if (countries.includes(country)) {
            return continent;
        }
    }
    return "Other";
};

/**
 * Get position group for a position
 * @param {string} position - Position abbreviation
 * @returns {string} Position group or 'Other' if not found
 */
export const getPositionGroup = (position) => {
    for (const [group, positions] of Object.entries(POSITION_GROUPS)) {
        if (positions.includes(position)) {
            return group;
        }
    }
    return "Other";
};

/**
 * Get full name for a position
 * @param {string} position - Position abbreviation
 * @returns {string} Full position name or the original position if not found
 */
export const getPositionFullName = (position) => {
    return POSITION_FULL_NAMES[position] || position;
};

/**
 * Get nationality with flag data (for components to render)
 * @param {string} nationality - Country name
 * @returns {Object} Object with nationality and flag data
 */
export const getNationalityWithFlag = (nationality) => {
    const countryCode = COUNTRY_CODES[nationality];
    return {
        nationality,
        countryCode,
        hasFlag: !!countryCode,
    };
};

/**
 * Format nationality with flag (legacy string version for simple text display)
 * @param {string} nationality - Country name
 * @returns {string} Formatted nationality with emoji flag
 */
export const formatNationalityWithFlag = (nationality) => {
    const flag = getCountryFlag(nationality);
    return flag ? `${flag} ${nationality}` : nationality;
};

/**
 * Get multiple nationalities with flag data (for components to render)
 * @param {Array} nationalities - Array of nationality strings
 * @returns {Array} Array of nationality objects with flag data
 */
export const getNationalitiesWithFlags = (nationalities) => {
    if (
        !nationalities ||
        !Array.isArray(nationalities) ||
        nationalities.length === 0
    ) {
        return [];
    }

    return nationalities.map((nationality) => ({
        nationality,
        countryCode: COUNTRY_CODES[nationality],
        hasFlag: !!COUNTRY_CODES[nationality],
    }));
};

/**
 * Format position with full name
 * @param {string} position - Position abbreviation
 * @returns {string} Formatted position with full name
 */
export const formatPositionWithFullName = (position) => {
    const fullName = getPositionFullName(position);
    return fullName !== position ? `${position} (${fullName})` : position;
};
