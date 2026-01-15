import api from './api';

// Execute fund transfer
export const executeTransfer = async (transferData) => {
    const response = await api.post('/transfers', transferData);
    return response.data;
};
