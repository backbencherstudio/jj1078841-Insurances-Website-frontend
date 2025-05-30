import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    signinUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
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
        credentials: "include"
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
        // You can keep this only if your backend also sets HttpOnly cookies (but optional)
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    


    // sendEmail: builder.mutation({
    //   query: (emailData) => ({
    //     url: "/send-email",
    //     method: "POST",
    //     body: emailData,
    //     credentials: "include",
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled }) {
    //     try {
    //       const result = await queryFulfilled;
    //       console.log('Email Sent Successfully:', result);
    //     } catch (error) {
    //       console.error('Email Sending Error:', {
    //         message: error.error?.message || 'Network error occurred',
    //         status: error.error?.status,
    //         data: error.error?.data,
    //       });
    //     }
    //   },
    //   invalidatesTags: ["User"],
    // }),
    

    // verifyOTP: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/verify-email",
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // verifyOTPForResetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/sendOtpForResetPassword",
    //     method: "PATCH",
    //     body: {
    //       email: data.email,
    //       otp: Number(data.otp),
    //     },
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // resetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/resetPassword",
    //     method: "POST",
    //     body: {
    //       email: data.email,
    //       password: data.password,
    //     },
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // getAllExchangeData: builder.query({
    //   query: (query) => {
    //     return {
    //       url: `/shared/exchange`,
    //       method: "GET",
    //       params: query,
    //     };
    //   },
    //   providesTags: ["User"],
    // }),

    // getMessages: builder.query({
    //   query: ({ senderId, receiverId }) => ({
    //     url: `/messages?senderId=${senderId}&receiverId=${receiverId}`,
    //     method: "GET",
    //   }),
    // }),
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
