import { API_LOGIN, API_LOGOUT, API_ME, API_REGISTER } from "@/libs/api";
import { LoginRequest, RegisterRequest, RegisterResponse } from "@/libs/types";
import api from "@/utils/api";
import axios from "axios";
import Cookies from "js-cookie";

export const authService = {
    async register(payload: RegisterRequest, file?: File): Promise<RegisterResponse> {
        const formData = new FormData();
        formData.append('username', payload.username);
        formData.append('email', payload.email);
        formData.append('password', payload.password);
        formData.append('name', payload.name);
        if (payload.bio) formData.append('bio', payload.bio);
        if (file) formData.append('avatar', file);

        const res = await api.post(`${API_REGISTER}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        return res.data;
    },

    async login(payload: LoginRequest) {
        const res = await axios.post(`${API_LOGIN}`, payload);
        return res.data;
    },

    async getMe() {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found');
        console.log('token:', token);
        
        const res = await api.get(`${API_ME}`);

        return res.data;
    },

    async logout() {
        const res = await axios.post(`${API_LOGOUT}`, {});
        // Cookies.remove('token');
        return res.data;
    }
};