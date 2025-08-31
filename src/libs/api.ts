// base url
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

// end points
export const API_REGISTER = `${API_BASE_URL}/user/register`;
export const API_LOGIN = `${API_BASE_URL}/user/login`;
export const API_LOGOUT = `${API_BASE_URL}/user/logout`;
export const API_ME = `${API_BASE_URL}/user/me`;