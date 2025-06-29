import { defineStore } from "pinia";
import { ref } from "vue";
import { getCarouselImg } from "../api";
import { TCarouselImg } from "../type/TCarouselImg";
export const useCarouselImg = defineStore("carouselImg", () => {
  const carouselImgArr = ref<TCarouselImg[]>([]);

  const setCarouselImg = async () => {
    if (carouselImgArr.value.length === 0) {
      try {
        carouselImgArr.value = await getCarouselImg();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { carouselImgArr, setCarouselImg };
});
