import api from './api';

const register = async (userData) => {
    const response = await api.post('auth/register', userData);
    return response.data;
};

const login = async (userData) => {
    const response = await api.post('auth/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const forgotPassword = async (email) => {
    const response = await api.post(`auth/password-recovery/${email}`);
    return response.data;
};

const resetPassword = async (token, newPassword) => {
    const response = await api.post('auth/reset-password', { token, new_password: newPassword });
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
};

export default authService;
