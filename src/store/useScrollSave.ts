import { ref } from "vue";
import { defineStore } from "pinia";
import { TPrePosition } from "../type/TPrePosition";

export const useScrollSave = defineStore("scrollSave", () => {
  const prePosition = ref<TPrePosition | number>(0);

  const setPrePosition = (prePos: TPrePosition | null) => {
    if (prePos === null) return (prePosition.value = 0);
    prePosition.value = prePos.top;
  };

  return { prePosition, setPrePosition };
});
