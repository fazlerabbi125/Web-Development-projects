import axios from "axios";
import store from '../store';
import { SERVER_URL } from "../store/RTKApiConfig";

// const state = store.getState();

export const axInstance = axios.create({
    baseURL: SERVER_URL,
    // headers: {
    //     Authentication: `Bearer ${state.auth.accessToken}`,
    // },
});
