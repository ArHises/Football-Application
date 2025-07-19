import {
    formatNationalityWithFlag,
    formatPositionWithFullName,
    getNationalitiesWithFlags,
} from "./flagsAndGroups";

export const formatters = {
    formatDate: (dateString, format = "dd/MM/yyyy") => {
        if (!dateString) return "";

        if (dateString.includes("-") && dateString.split("-").length === 3) {
            const [day, month, year] = dateString.split("-");
            if (day.length === 2) {
                const date = new Date(year, month - 1, day);
                return date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            }
        }

        const date = new Date(dateString + "T00:00:00");
        if (isNaN(date.getTime())) return "";

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: format.includes("yyyy") ? "numeric" : "2-digit",
        });
    },

    formatHeight: (height) => {
        if (height == null) return "";
        return `${height}cm`;
    },

    formatArray: (array, separator = ", ") => {
        if (!array || !Array.isArray(array)) return "";
        return array.join(separator);
    },

    formatAge: (dateOfBirth) => {
        if (!dateOfBirth) return "";
        const today = new Date();
        const birth = new Date(dateOfBirth);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            return age - 1;
        }
        return age;
    },

    /**
     * Format file size to human readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size
     */
    formatFileSize: (bytes) => {
        if (!bytes || bytes === 0) return "0 B";

        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    },

    /**
     * Format player name with proper capitalization
     * @param {string} firstName - First name
     * @param {string} lastName - Last name
     * @returns {string} Formatted full name
     */
    formatPlayerName: (firstName, lastName) => {
        const capitalizeFirst = (str) => {
            if (!str) return "";
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        const formattedFirst = capitalizeFirst(firstName);
        const formattedLast = capitalizeFirst(lastName);

        return `${formattedFirst} ${formattedLast}`.trim();
    },

    /**
     * Format nationalities with flags for display in table
     * @param {Array} nationalities - Array of nationality strings
     * @returns {string} Formatted nationalities with flags (emoji version)
     */
    formatNationalities: (nationalities) => {
        if (
            !nationalities ||
            !Array.isArray(nationalities) ||
            nationalities.length === 0
        ) {
            return "N/A";
        }

        return nationalities
            .map((nationality) => formatNationalityWithFlag(nationality))
            .join(", ");
    },

    /**
     * Get nationalities data for React components
     * @param {Array} nationalities - Array of nationality strings
     * @returns {Array} Array of nationality data objects
     */
    getNationalitiesData: (nationalities) => {
        return getNationalitiesWithFlags(nationalities);
    },

    /**
     * Format positions with full names for display in table
     * @param {Array} positions - Array of position strings
     * @returns {string} Formatted positions with full names
     */
    formatPositions: (positions) => {
        if (!positions || !Array.isArray(positions) || positions.length === 0) {
            return "N/A";
        }

        return positions
            .map((position) => formatPositionWithFullName(position))
            .join(", ");
    },
};
