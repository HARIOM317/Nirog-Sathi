import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const REPORT_URL = "/report";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReport: build.mutation({
      query: (data) => ({
        url: `${REPORT_URL}/upload`,
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.reports],
    }),
    getPatientReport: build.query({
      query: (id) => ({
          url: `${REPORT_URL}/patient/${id}`,
          method: 'GET'
      }),
      providesTags: [tagTypes.blogs]
  }),
  }),
});

export const { useCreateReportMutation, useGetPatientReportQuery } = reportApi;
