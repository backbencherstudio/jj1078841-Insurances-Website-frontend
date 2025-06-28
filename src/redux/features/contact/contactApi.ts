import { baseApi } from "../../api/baseApi";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  insurance: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContactEmail: builder.mutation({
      query: (contactData) => ({
        url: "/send-email",
        method: "POST",
        body: {
          ...contactData,
          recipientEmail: "birobe4337@pricegh.com"
        },
      }),
    }),
  }),
});

export const { useSendContactEmailMutation } = contactApi;