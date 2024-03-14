export default {
  build: {
    transpile: ["vue-clerk", "@clerk/clerk-js"]
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey:
        "",
      baseURL: 'https://api.pictube.shop'
    },
    clerkSecretKey: ""
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/cloudinary",
    "@pinia/nuxt",
    "nuxt-icon"
  ]
};
