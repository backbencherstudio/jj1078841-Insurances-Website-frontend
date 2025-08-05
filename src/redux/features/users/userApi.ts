import { baseApi } from "../../api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    newClaim: builder.mutation({
      query: () => ({
        url: "/new-claim-insurance",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: (formData) => {
        return {
          url: "/dashboard/user-profile",
          method: "PATCH",
          body: formData,
          // This line ensures you send the token
          headers: (formData instanceof FormData ? {} : { "Content-Type": "application/json" }),
        };
      },
      invalidatesTags: ["User"],
    }),
    
  }),
});

export const {
  useNewClaimMutation,
  useUpdateUserProfileMutation,
} = usersApi;
