import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://ssconstweb-001-site1.qtempurl.com/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('sssToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        postContact: builder.mutation({
            query: (contact) => ({
                url: `/Contact/create-contact`,
                method: 'POST',
                body: contact,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        getAllContact: builder.query({
            query: () => ({
                url: `/Contact/get-all-contacts`,
            }),
        }),
    }),
})
export const {
    useGetAllContactQuery,
    usePostContactMutation,
} = userApi