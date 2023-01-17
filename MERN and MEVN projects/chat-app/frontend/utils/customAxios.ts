import axios from "axios";
import store from '../store';

const state = store.getState();

export const axInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    headers: {
        Authentication: `Bearer ${state.auth.accessToken}`,
    },
});
