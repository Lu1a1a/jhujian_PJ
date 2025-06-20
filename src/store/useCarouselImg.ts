import { defineStore } from "pinia";
import { ref } from "vue";
import { getCarouselImg } from "../composables/useGetCarouselImg.ts";
import { TCarouselImg } from "../type/TCarouselImg";
export const useCarouselImg = defineStore("carouselImg", () => {
  const carouselImgArr = ref<TCarouselImg[]>([]);

  const setCarouselImg = async () => {
    if (carouselImgArr.value.length === 0) {
      carouselImgArr.value = await getCarouselImg();
    }
  };

  return { carouselImgArr, setCarouselImg };
});
