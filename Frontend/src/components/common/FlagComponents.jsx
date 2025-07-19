import React from "react";
import ReactCountryFlag from "react-country-flag";
import {
    getFlagProps,
    getNationalityWithFlag,
    getNationalitiesWithFlags,
} from "../../utils/flagsAndGroups";

// React component for displaying a single flag
export const FlagIcon = ({ nationality, size = "16px", style = {} }) => {
    const flagProps = getFlagProps(nationality, size, style);

    if (!flagProps) {
        return <span style={{ fontSize: size }}>🏳️</span>;
    }

    return <ReactCountryFlag {...flagProps} />;
};

// React component for displaying nationality with flag
export const NationalityWithFlag = ({ nationality, size = "16px" }) => {
    const data = getNationalityWithFlag(nationality);

    return (
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FlagIcon nationality={nationality} size={size} />
            {nationality}
        </span>
    );
};

// React component for displaying multiple nationalities with flags
export const NationalitiesWithFlags = ({ nationalities }) => {
    const data = getNationalitiesWithFlags(nationalities);

    if (data.length === 0) {
        return <span>N/A</span>;
    }

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                alignItems: "center",
            }}
        >
            {data.map((item, index) => (
                <span
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    <FlagIcon nationality={item.nationality} size="14px" />
                    <span style={{ fontSize: "14px" }}>{item.nationality}</span>
                    {index < data.length - 1 && (
                        <span style={{ margin: "0 2px", color: "#666" }}>
                            ,
                        </span>
                    )}
                </span>
            ))}
        </div>
    );
};
