import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { ACCESS_TOKEN_NAME } from "../config";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE,
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem(ACCESS_TOKEN_NAME);
        if(token)
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
    }
});

const baseQueryWithAutoLogout = (args, api) => {
    const result = baseQuery(args,api);
    if(result.error && result.error.status !== '401'){
        // redirection to signout
    }else{
        // rejection error
    }
}

const appService = createApi({
    reducerPath: "appService",
    baseQuery: baseQueryWithAutoLogout,
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: ({username, password})=>({
                url: '/login',
                method: 'POST',
                body:{
                    username,
                    password
                }
            }),
        }),
        signUp: builder.mutation({
            query: ({user})=>({
                url: '/register',
                method: 'POST',
                body:{
                  user  
                }
            })
        }),
        getUsers: builder.query({
            query: ()=>('/api/users')
        })
    })
});

export default appService;