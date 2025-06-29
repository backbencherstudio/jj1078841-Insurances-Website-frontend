// server base url
export const URL =
   process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";
// app config
export const AppConfig = () => ({
  app: {
    // server endpoint
    url: URL,
    name: "Insurances Ally",
    slogan: "app",
    meta: {
      description: "app",
      keywords: "app",
    },

    // api endpoint
    apiUrl: `${URL}/api`,
  },
});



// export const AppConfig = () => ({
//   app: {
//     apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
//   },
// });