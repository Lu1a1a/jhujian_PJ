import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
export const usePageCheckStore = defineStore("pageCheck", () => {
  //state
  const isHome = ref(false);
  const isBooking = ref(true);
  const routePath = ref("");
  //action
  const checkRoute = () => {
    const route = useRoute();

    if (route.name === "booking") {
      isBooking.value = false;
      isHome.value = true;
      routePath.value = "/home/allNews";
    }
    if (route.name === "allNews") {
      isBooking.value = true;
      isHome.value = false;
      routePath.value = "/booking";
    }
  };
  return {
    isHome,
    isBooking,
    routePath,
    checkRoute,
  };
});
