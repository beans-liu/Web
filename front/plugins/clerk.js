import { clerkPlugin } from "vue-clerk/plugin";

export default defineNuxtPlugin(async nuxtApp => {
  const publishableKey = useRuntimeConfig()?.public?.clerkPublishableKey;

  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey,
    options: {
      appearance: {
        variables: { colorPrimary: "#570DF8" }
      }
    }
  });
});
