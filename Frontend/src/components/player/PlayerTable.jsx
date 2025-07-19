import React from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import PlayerActions from "./PlayerActions";
import { formatters } from "../../utils/formatters";
import { UI_CONSTANTS } from "../../utils/constants";
import styles from "../../styles/components/PlayerTable.module.css";

const PlayerTable = ({ players, loading, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleRowClick = (params) => {
        navigate(`/players/${params.row.id}`);
    };

    // Helper function to calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return -1; // Return -1 for invalid dates so they sort last

        let birthDate;

        // Handle dd-MM-yyyy format from backend
        if (dateOfBirth.includes("-") && dateOfBirth.split("-").length === 3) {
            const parts = dateOfBirth.split("-");
            if (parts[0].length === 2) {
                // dd-MM-yyyy format
                const [day, month, year] = parts;
                birthDate = new Date(year, month - 1, day);
            } else {
                // yyyy-MM-dd format
                birthDate = new Date(dateOfBirth);
            }
        } else {
            // Try to parse as regular date
            birthDate = new Date(dateOfBirth);
        }

        if (isNaN(birthDate.getTime())) return -1;

        const today = new Date();
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
    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.5,
            sortable: true,
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            sortable: true,
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            sortable: true,
        },
        {
            field: "nationalities",
            headerName: "Nationalities",
            flex: 1.2,
            sortable: true,
            renderCell: (params) => {
                const sortedNationalities = params.value?.sort((a, b) =>
                    a.localeCompare(b)
                );
                return formatters.formatArray(sortedNationalities);
            },
            sortComparator: (v1, v2) => {
                // Sort by the first nationality alphabetically
                const first1 =
                    v1?.length > 0
                        ? v1.sort((a, b) => a.localeCompare(b))[0]
                        : "";
                const first2 =
                    v2?.length > 0
                        ? v2.sort((a, b) => a.localeCompare(b))[0]
                        : "";
                return first1.localeCompare(first2);
            },
        },
        {
            field: "dateOfBirth",
            headerName: "Birth Date",
            flex: 1,
            sortable: true,
            renderCell: (params) => formatters.formatDate(params.value),
            sortComparator: (v1, v2) => {
                // Sort by age (younger players first when ascending)
                const age1 = calculateAge(v1);
                const age2 = calculateAge(v2);
                return age1 - age2;
            },
        },
        {
            field: "positions",
            headerName: "Positions",
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const sortedPositions = params.value?.sort((a, b) =>
                    a.localeCompare(b)
                );
                return formatters.formatArray(sortedPositions);
            },
            sortComparator: (v1, v2) => {
                // Sort by the first position alphabetically
                const first1 =
                    v1?.length > 0
                        ? v1.sort((a, b) => a.localeCompare(b))[0]
                        : "";
                const first2 =
                    v2?.length > 0
                        ? v2.sort((a, b) => a.localeCompare(b))[0]
                        : "";
                return first1.localeCompare(first2);
            },
        },
        {
            field: "heightCm",
            headerName: "Height",
            flex: 0.7,
            sortable: true,
            renderCell: (params) => formatters.formatHeight(params.value),
        },
        {
            field: "createdAt",
            headerName: "Created",
            flex: 0.8,
            sortable: true,
            renderCell: (params) =>
                formatters.formatDate(params.value, "dd/MM/yy"),
        },
        {
            field: "modifiedAt",
            headerName: "Modified",
            flex: 0.8,
            sortable: true,
            renderCell: (params) =>
                formatters.formatDate(params.value, "dd/MM/yy"),
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.2,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <PlayerActions
                    player={params.row}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <DataGrid
                rows={players}
                columns={columns}
                loading={loading}
                onRowClick={handleRowClick}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    sorting: {
                        sortModel: [{ field: "firstName", sort: "asc" }],
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                checkboxSelection={false}
                sortingMode="client"
                className={styles.dataGrid}
                sx={{
                    minWidth: UI_CONSTANTS.TABLE_MIN_WIDTH,
                    height: UI_CONSTANTS.TABLE_HEIGHT,
                    "& .MuiDataGrid-main": {
                        overflowX: "auto",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        overflowX: "auto",
                    },
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                    },
                }}
            />
        </div>
    );
};

export default PlayerTable;
