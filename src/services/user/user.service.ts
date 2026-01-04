import { API_ACCEPT_FRIEND_REQUEST, API_BASE_URL, API_GET_FRIENDS, API_GET_PENDING_REQUESTS, API_REJECT_FRIEND_REQUEST, API_SEARCH_USERS, API_SEND_FRIEND_REQUEST } from "@/libs/api";
import { FriendRequest, SearchUserPayload, SendFriendRequestPayload, User } from "@/libs/types";
import api from "@/utils/api";
import axios from "axios";
import Cookies from "js-cookie";

export const searchUsers = async (payload: SearchUserPayload): Promise<User[]> => {
    const token = Cookies.get('token');
    if (!token) throw new Error('No token found');
    const response = await axios.get(`${API_SEARCH_USERS}${encodeURIComponent(payload.q)}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });

    if (response.status !== 200) {
        throw new Error(response.statusText || 'Failed to search users');
    }

    return response.data;
};

export const sendFriendRequest = async (payload: SendFriendRequestPayload): Promise<{ message: string }> => {
    const token = Cookies.get('token');
    if (!token) throw new Error('No token found');
    const response = await axios.post(`${API_SEND_FRIEND_REQUEST}${payload.userId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });

    if (response.status !== 200) {
        throw new Error(response.statusText || 'Failed to send friend request');
    }

    return response.data;
};

export const getPendingRequests = async (): Promise<FriendRequest[]> => {
    const token = Cookies.get('token');
    if (!token) throw new Error('No token found');
    const response = await axios.get(`${API_GET_PENDING_REQUESTS}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });

    if (response.status !== 200) {
        throw new Error(response.statusText || 'Failed to get pending requests');
    }

    const data = await response.data;
    return data;
};

export const acceptFriendRequest = async (requestId: string): Promise<{ message: string; conversationId: string }> => {
    const token = Cookies.get('token');
    if (!token) throw new Error('No token found');
    const response = await api.post(`${API_ACCEPT_FRIEND_REQUEST}${requestId}/accept`);

    if (response.status !== 200) {
        throw new Error(response.statusText || 'Failed to accept friend request');
    }

    return response.data;
};

export const rejectFriendRequest = async (requestId: string): Promise<{ message: string }> => {
    const response = await axios.post(`${API_REJECT_FRIEND_REQUEST}${requestId}/reject`, {}, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        withCredentials: true
    });

    if (response.status !== 200) {
        throw new Error(response.statusText || 'Failed to reject friend request');
    }

    return response.data;
};

export const getFriends = async (): Promise<User[]> => {
  const response = await api.get(`${API_GET_FRIENDS}`);
  return response.data; // Array of friends with name, username, avatar
};