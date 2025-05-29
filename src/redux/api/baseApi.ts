import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("process.env.NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery ({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      // if (token) {
      //   headers.set("authorization", token);
      // }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
  
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["User"],
});
