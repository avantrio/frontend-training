import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { ACCESS_TOKEN_NAME } from "../config";
import { normaliseObjectArray } from "../utils/dataUtils";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MOCK_API_BASE,
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem(ACCESS_TOKEN_NAME);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithAuth = (args, api) => {
    const result = baseQuery(args, api);
    if (result.error && result.error.status !== "401") {
        // redirection to signout
    } else {
        // rejection error
    }
    return result;
};

const userService = createApi({
    reducerPath: "userService",
    baseQuery: baseQueryWithAuth,
    entityTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            provides: ["Users"],
            transformResponse: (response) =>
                normaliseObjectArray(response),
        }),
        getUser: builder.query({
            query: ({userId}) => `/users/${userId}`,
            provides: ["Users"],
        }),
        addUser: builder.mutation({
            query: ({ username, password }) => ({
                url: "/users",
                method: "POST",
                body: {
                    username,
                    password,
                },
            }),
            invalidates: ["Users"],
        }),
        updateUser: builder.mutation({
            query: ({ user, userId }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: {
                    user,
                },
            }),
            invalidates: ["Users"],
        }),
    }),
});

export default userService;

export const { useGetUsersQuery, useGetUserQuery } = userService;
