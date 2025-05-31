// // src/features/admin/adminApi.ts
// import { baseApi } from "../../api/baseApi";

// export const adminApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAdminDashboard: builder.query({
//       query: () => ({
//         url: "/admin/dashboard",
//         method: "GET",
//         credentials: "include", // Important if you're using cookie-based auth
//       }),
//       providesTags: ["AdminDashboard"],
//     }),
//   }),
// });

// export const {
//   useGetAdminDashboardQuery,
// } = adminApi;
