<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../store/usePageCheck";
import pageFooter from "../components/common/footer.vue";

const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div class="w-full">
    <div
      class="w-full h-[100vh] mb-20 flex justify-center relative items-center text-white lg:h-[90vh] md:h-[70vh] md:mb-48"
    >
      <img src="../assets/img/groupPage/group_banner_bg.jpg" class="w-full h-full brightness-75 object-cover" />
      <div class="w-4/5 mx-auto absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-2/3">
        <div
          class="w-fit text-4xl font-thin relative z-10 lg:text-5xl after:w-1/2 after:h-1/2 after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-200 after:contrast-50"
        >
          關於集團
        </div>
        <div class="w-full mt-5 flex items-center font-bold text-2xl md:w-3/4">
          ABOUT GROUP
          <span class="grow h-[1px] mx-2 bg-white md:mx-5"></span>
        </div>
        <div class="w-full mt-10 lg:w-2/3">
          2010年創立於基隆郊區，開業時僅有三名員工的築間始終秉承“自己不願意吃的東西絕對不賣”的理念，
          <br />
          截至2025年2月全台擁有195家門店，已成為最大的火鍋連鎖餐飲品牌之一。
        </div>
        <div class="w-full mt-5 lg:w-2/3">
          旗下同時涵蓋燒肉、中式、日韓等類別共11大品牌，
          <br />
          以高品質食材、營業到深夜的獨特營運模式，
          <br />
          為無數個美食饕客持續創造難忘的用餐體驗。
        </div>
      </div>
    </div>
    <div class="w-4/5 h-[80vh] mx-auto relative">
      <img src="../assets/img/groupPage/group_overview_bg.jpg" class="w-full h-full object-cover" />
      <div class="w-full px-2 absolute top-1/2 translate-y-[-50%] text-white">
        <div class="w-fit mx-auto mb-8 text-2xl text-center md:text-4xl xl:text-5xl xl:text-thin xl:mb-20">
          集團概況Overview
        </div>
        <div class="w-4/5 mx-auto flex flex-col gap-5 items-center lg:gap-10 lg:flex-row md:my-10 md:justify-evenly">
          <div class="w-fit flex flex-col items-center lg:w-1/3 lg:gap-5">
            <span class="tracking-wider text-3xl text-yellow-100 font-bold md:text-7xl">2010</span>
            <span class="text-sm">Found 成立時間</span>
          </div>
          <span class="w-1/2 h-[1px] bg-white opacity-50 md:grow md:mx-5 xl:h-1"></span>
          <div class="w-fit flex flex-col items-center lg:w-1/3 lg:gap-5">
            <span class="tracking-wider text-3xl text-yellow-100 font-bold md:text-7xl">11</span>
            <span class="text-sm">Brands 品牌數量</span>
          </div>
          <span class="w-1/2 h-[1px] bg-white opacity-50 md:grow md:mx-5 xl:h-1"></span>
          <div class="w-fit flex flex-col items-center lg:w-1/3 lg:gap-5">
            <span class="tracking-wider text-3xl text-yellow-100 font-bold md:text-7xl">195</span>
            <span class="text-sm">Sites 門市據點</span>
          </div>
        </div>
        <div class="w-fit mx-auto my-5 font-bold text-lg text-center md:my-10 md:text-3xl">
          不只是市場奠基者 更是美味的探索者
        </div>
        <div class="w-fit mx-auto text-sm text-center md:text-xl md:my-10">
          以顧客需求發展多元餐飲服務及產品，根植台灣風土，綻放世界美味。
        </div>
      </div>
    </div>
    <pageFooter />
  </div>
</template>
<style scoped></style>
