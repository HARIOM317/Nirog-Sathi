import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"
const AMBULANCE_URL = '/ambulance'

export const ambulanceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAmbulance: build.mutation({
            query: (data) => ({
                url: `${AMBULANCE_URL}`,
                method: 'POST',
                data: data,
            })
        }),
        getAllAmbulance: build.query({
            query: () => ({
                url: `${AMBULANCE_URL}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.contacts]
        }),

    })
})

export const { useCreateAmbulanceMutation, useGetAllAmbulanceQuery } = ambulanceApi;