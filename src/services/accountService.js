import api from './api';

// Get current user profile (to get userId)
export const getCurrentUser = async () => {
    const response = await api.get('/users/me');
    return response.data;
};

// Get account details
export const getAccountDetails = async (accountId) => {
    const response = await api.get(`/accounts/${accountId}`);
    return response.data;
};

// Get user's accounts
export const getUserAccounts = async (userId) => {
    const response = await api.get(`/accounts/user/${userId}`);
    return response.data;
};

// Get current authenticated user's accounts (better approach)
export const getMyAccounts = async () => {
    try {
        // Try to get current user first to get the userId
        const user = await getCurrentUser();
        const response = await api.get(`/accounts/user/${user.id}`);
        return response.data;
    } catch (error) {
        // Fallback: if /users/me doesn't exist, try with userId from localStorage
        const userIdFromStorage = localStorage.getItem('userId');
        if (userIdFromStorage) {
            const response = await api.get(`/accounts/user/${userIdFromStorage}`);
            return response.data;
        }
        throw error;
    }
};

// Get account audit trail
export const getAccountAuditTrail = async (accountId) => {
    const response = await api.get(`/accounts/${accountId}/audit`);
    return response.data;
};
