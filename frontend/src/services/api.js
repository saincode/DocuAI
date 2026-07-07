import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    
    const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const chatWithDocument = async (question) => {
    const response = await axios.post(`${API_URL}/chat`, { question });
    return response.data;
};

export const clearDocuments = async () => {
    const response = await axios.delete(`${API_URL}/clear`);
    return response.data;
};
