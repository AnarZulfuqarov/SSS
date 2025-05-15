import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.sss-tel.az/api',
        prepareHeaders: (headers) => {
            const token = Cookies.get('sssToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        postAdminLogin: builder.mutation({
            query: (admin) => ({
                url: `/Admin/login`,
                method: 'POST',
                body: admin,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
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
        getAllProject: builder.query({
            query: () => ({
                url: `/Project/get-all-projects`,
            }),
        }),
        postProject: builder.mutation({
            query: (project) => ({
                url: `/Project/create-project`,
                method: 'POST',
                body: project
            }),
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/Project/delete-project/${id}`,
                method: 'DELETE',
            }),
        }),
        putProject: builder.mutation({
            query: (project) => ({
                url: `/Project/update-project`,
                method: 'PUT',
                body: project,
            }),
        }),
        putService: builder.mutation({
            query: (service) => ({
                url: `/Service/update-service`,
                method: 'PUT',
                body: service,
            }),
        }),
        getAllServices: builder.query({
            query: () => ({
                url: `/Service/get-all-services`,
            }),
        }),
        postService: builder.mutation({
            query: (service) => ({
                url: `/Service/create-service`,
                method: 'POST',
                body: service
            }),
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/Service/delete-service/${id}`,
                method: 'DELETE',
            }),
        }),
        getProjectById: builder.query({
            query: (id) => ({
                url: `/Project/get-project-by-id/${id}`,
            }),
        }),
    }),
})
export const {
    useGetAllContactQuery,
    usePostContactMutation,
    usePostAdminLoginMutation,

    useGetAllProjectQuery,
    usePostProjectMutation,
    useDeleteProjectMutation,
    usePutProjectMutation,
    useGetProjectByIdQuery,

    useGetAllServicesQuery,
    usePostServiceMutation,
    useDeleteServiceMutation,
    usePutServiceMutation,
} = userApi