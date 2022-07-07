import axios from "axios";
import { ACCESS_TOKEN_NAME } from "./config";

// use apiHandler to access protected endpoints
const apiHandler = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
});

apiHandler.interceptors.request.use((config) => {
    const newConf = config;
    const token = sessionStorage.getItem(ACCESS_TOKEN_NAME);
    newConf.headers.Authorization = `Bearer ${token}`;
    return newConf;
});

apiHandler.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status !== 401) {
            window.location = "/signout";
        } else {
            return Promise.reject(error);
        }
        return 0;
    }
);

// use apiHandler to access public endpoints
const publicApiHandler = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
});

// auth endpoints

export async function signIn(username, password) {
    // const response = await apiHandler.post("/login", { username, password });
    // return response.data;

    // returning mock data
    return {
        access: "DUMMY_ACCESS_TOKEN",
        refresh: "DUMMY_REFRESH_TOKEN",
    };
}

// user endpoints

export async function getUsers() {
    // const response = await apiHandler.get("/api/users/");
    // return response.data;\

    // returning mock data
    return {
        data: [
            {
                id: 1,
                display_name: "John Doe",
                occupation: "CEO. Team motivator.",
                is_admin: false,
                subscription: 3,
            },
            {
                id: 2,
                display_name: "Justin Case",
                occupation: "CTO",
                is_admin: true,
                subscription: 2,
            },
            {
                id: 3,
                display_name: "Ben Dover",
                occupation: "Unemployed",
                is_admin: false,
                subscription: 1,
            },
            {
                id: 4,
                display_name: "Theodore Handle",
                occupation: "Carpenter",
                is_admin: false,
                subscription: 1,
            },
            {
                id: 5,
                display_name: "Will Barrow",
                occupation: "Organic smoothie vendor",
                is_admin: false,
                subscription: 3,
            },
        ],
    };
}

export async function createUser(userData) {
    const response = await apiHandler.post("/api/users/", userData);
    return response.data;
}

export async function updateUser(userId, userData) {
    const response = await apiHandler.put(`/api/users/${userId}`, userData);
    return response.data;
}

export async function getUser(userId) {
    const response = await apiHandler.put(`/api/users/${userId}`);
    return response.data;
}

export async function getMyProfile() {
    // const response = await apiHandler.get(`/api/users/me`);
    // return response.data;
    return {
        data: {
            display_Name: "Test User",
            is_admin: true,
        },
    };
}
