// base url
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

// end points
export const API_REGISTER = `${API_BASE_URL}/user/register`;
export const API_LOGIN = `${API_BASE_URL}/user/login`;
export const API_LOGOUT = `${API_BASE_URL}/user/logout`;
export const API_ME = `${API_BASE_URL}/user/me`;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
export const API_SEARCH_USERS = `${API_BASE_URL}/user/search?q=`;
export const API_SEND_FRIEND_REQUEST = `${API_BASE_URL}/user/friend-requests/`;
export const API_GET_PENDING_REQUESTS = `${API_BASE_URL}/user/pending-requests`;
export const API_ACCEPT_FRIEND_REQUEST = `${API_BASE_URL}/user/friend-requests/`; // + {requestId}/accept
export const API_REJECT_FRIEND_REQUEST = `${API_BASE_URL}/user/friend-requests/`; // + {requestId}/reject