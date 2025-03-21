import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const EMERGENCY_URL = "/emergency";

export const emergencyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmergency: build.mutation({
      query: (data) => ({
        url: `${EMERGENCY_URL}`,
        method: "POST",
        data: data,
      }),
    }),
    getAllEmergency: build.query({
      query: () => ({
        url: `${EMERGENCY_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.contacts],
    }),
  }),
});


export const { useCreateEmergencyMutation, useGetAllEmergencyQuery } = emergencyApi;


