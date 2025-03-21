import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
export const usePageCheckStore = defineStore("pageCheck", () => {
  //state
  const isHome = ref(false);
  const isBooking = ref(true);
  const isPosition = ref(false);
  //action
  const checkRoute = () => {
    const route = useRoute();
    if (route.name === "booking") {
      //進入booking
      isBooking.value = false;
      isHome.value = true;
      isPosition.value = true;
    }
    if (route.name === "allNews") {
      //進入home
      isBooking.value = true;
      isHome.value = false;
      isPosition.value = true;
    }
    if (route.name === "position") {
      //進入position
      isBooking.value = true;
      isPosition.value = false;
      isHome.value = true;
    }
  };
  return {
    isHome,
    isBooking,
    isPosition,
    checkRoute,
  };
});
