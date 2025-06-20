<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../../store/usePageCheck";
import pageFooter from "../../components/common/footer.vue";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div>
    <div class="w-full mt-32 md:mt-40 px-5">
      <div
        class="w-fit mx-auto relative z-10 text-3xl after:w-full after:h-1/2 after:absolute after:bottom-0 after:left-0 after:-z-10 after:bg-yellow-100 md:text-4xl lg:text-6xl lg:font-thin"
      >
        最新消息
      </div>
      <div
        class="w-full mt-3 flex justify-center items-center text-2xl font-medium md:w-2/3 md:mx-auto md:mt-4 lg:mt-6"
      >
        <span class="grow h-[1px] bg-black"></span>
        <span class="w-fit mx-6 md:mx-6">LATEST NEWS</span>
        <span class="grow h-[1px] bg-black"></span>
      </div>
      <div class="w-full mt-5 flex overflow-scroll sm:justify-center md:mt-16">
        <div class="w-fit h-fit px-5 flex-shrink-0 border-l-black text-sm text-gray-500 md:px-8 md:text-lg">
          <RouterLink :to="{ path: '/news/allNews' }">All所有訊息</RouterLink>
        </div>
        <div class="w-fit h-fit px-5 flex-shrink-0 border-l-black border-l text-sm text-gray-500 md:px-8 md:text-lg">
          <RouterLink :to="{ path: '/news/event' }">活動資訊</RouterLink>
        </div>
        <div class="w-fit h-fit px-5 flex-shrink-0 border-l-black border-l text-sm text-gray-500 md:px-8 md:text-lg">
          <RouterLink :to="{ path: '/news/media' }">媒體報導</RouterLink>
        </div>
        <div class="w-fit h-fit px-5 flex-shrink-0 border-l-black border-l text-sm text-gray-500 md:px-8 md:text-lg">
          <RouterLink :to="{ path: '/news/announcement' }">集團公告</RouterLink>
        </div>
        <div class="w-fit h-fit px-5 flex-shrink-0 border-l-black border-l text-sm text-gray-500 md:px-8 md:text-lg">
          <RouterLink :to="{ path: '/news/recruiting' }">人才招募</RouterLink>
        </div>
      </div>
      <div class="w-full">
        <RouterView />
      </div>
      <pageFooter />
    </div>
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
.router-link-exact-active {
  color: black;
}
</style>
