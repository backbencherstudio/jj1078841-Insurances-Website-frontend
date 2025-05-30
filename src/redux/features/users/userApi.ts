import { baseApi } from "../../api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

  

    newClaim: builder.mutation({
      query: () => ({
        url: "/new-claim-insurance",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // getUsers: builder.query({
    //   query: () => ({
    //     url: "/admin/user-management",
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   providesTags: ["User"],
    // }),

  }),
});



export const {
  // useGetUsersQuery,
  useNewClaimMutation,
} = usersApi;
