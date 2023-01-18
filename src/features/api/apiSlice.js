import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-app-api-zckg.onrender.com",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({}),
});
