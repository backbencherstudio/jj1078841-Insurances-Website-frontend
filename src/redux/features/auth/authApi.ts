import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    signinUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // transformResponse: (response) => {
      //   const token = response?.authorization?.token;
      //   if (token) {
      //     localStorage.setItem("accessToken", token);
      //     document.cookie = `accessToken=${token}; path=/; secure; samesite=strict`;
          
      //   }
      //   return response;
      // },
      invalidatesTags: ["User"],
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log('API Response:', result);
        } catch (error) {
          console.error('API Error:', {
            message: error.error?.message || 'Network error occurred',
            status: error.error?.status,
            data: error.error?.data
          });
        }
      },
      invalidatesTags: ["User"],
    }),

    getLoggedInUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    
   
     

     
  }),
});



export const {
  useSigninUserMutation,
  useCreateUserMutation,
  useGetLoggedInUserQuery,
  // useGetLoggedInUserQuery
  // useVerifyOTPMutation,
  // useVerifyOTPForResetPasswordMutation,
  // useResetPasswordMutation,
  // useGetAllExchangeDataQuery,
  // useSendEmailMutation
} = authApi;
