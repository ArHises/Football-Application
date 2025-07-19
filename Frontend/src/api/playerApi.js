import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

const path = "players";

export const fetchPlayers = ({
    name,
    nationalities,
    minAge,
    maxAge,
    positions,
    minHeight,
    maxHeight,
    sort = "firstName",
} = {}) => {
    const params = {};
    if (name) params.name = name;
    if (nationalities) params.nationalities = nationalities;
    if (minAge) params.minAge = minAge;
    if (maxAge) params.maxAge = maxAge;
    if (positions) params.positions = positions;
    if (minHeight) params.minHeight = minHeight;
    if (maxHeight) params.maxHeight = maxHeight;
    params.sort = sort;
    return api.get(path, { params });
};

export const getPlayerById = (id) => api.get(`${path}/${id}`);

export const createPlayer = (data) => api.post(path, data);

export const updatePlayer = (id, data) => api.put(`${path}/${id}`, data);

export const deletePlayer = (id) => api.delete(`${path}/${id}`);

export const uploadCsv = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`${path}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const fetchAvailableNationalities = () =>
    api.get(`${path}/nationalities`);

export const fetchAvailablePositions = () => api.get(`${path}/positions`);
