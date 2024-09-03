import Toast, { useToast } from "vue-toastification";
import type { PluginOptions } from "vue-toastification";

import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  // https://github.com/Maronato/vue-toastification
  nuxtApp.vueApp.use(Toast, {
    timeout: 5000,
  } as PluginOptions);

  return {
    provide: {
      toast: useToast(),
    },
  };
});
