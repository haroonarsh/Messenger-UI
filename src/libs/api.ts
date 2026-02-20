// base url
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://messenger-backend-ee8h.onrender.com';

// end points
export const API_REGISTER = `${API_BASE_URL}/api/user/register`;
export const API_LOGIN = `${API_BASE_URL}/api/user/login`;
export const API_LOGOUT = `${API_BASE_URL}/api/user/logout`;
export const API_ME = `${API_BASE_URL}/api/user/me`;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://messenger-backend-ee8h.onrender.com';
export const API_SEARCH_USERS = `${API_BASE_URL}/api/user/search?q=`;
export const API_SEND_FRIEND_REQUEST = `${API_BASE_URL}/api/user/friend-requests/`;
export const API_GET_PENDING_REQUESTS = `${API_BASE_URL}/api/user/pending-requests`;
export const API_ACCEPT_FRIEND_REQUEST = `${API_BASE_URL}/api/user/friend-requests/`; // + {requestId}/accept
export const API_REJECT_FRIEND_REQUEST = `${API_BASE_URL}/api/user/friend-requests/`; // + {requestId}/reject
export const API_GET_FRIENDS = `${API_BASE_URL}/api/user/friends`;