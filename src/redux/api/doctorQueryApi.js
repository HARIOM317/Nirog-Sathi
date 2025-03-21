import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"
const QUERY_URL = '/doctorquery'

export const doctorQueryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        create: build.mutation({
            query: (data) => ({
                url: `${QUERY_URL}`,
                method: 'POST',
                data: data,
            })
        }),
        getAllDoctor: build.query({
            query: () => ({
                url: `${QUERY_URL}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.interestedDoctor]
        }),
        deleteDoctorQuery: build.mutation({
            query: (id) => ({
                url: `${QUERY_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.interestedDoctor]
        }),

    })
})

export const { useCreateMutation, useGetAllDoctorQuery, useDeleteDoctorQueryMutation } = doctorQueryApi;