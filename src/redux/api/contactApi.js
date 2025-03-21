import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"
const CONTACT_URL = '/contact'

export const contactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        contact: build.mutation({
            query: (data) => ({
                url: `${CONTACT_URL}`,
                method: 'POST',
                data: data,
            })
        }),
        getAllContactUs: build.query({
            query: () => ({
                url: `${CONTACT_URL}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.contact]
        }),

    })
})

export const { useContactMutation, useGetAllContactUsQuery } = contactApi;