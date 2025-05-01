<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../store/usePageCheck";
import memberGift from "../components/member/memberGift.vue";
import brandGift from "../components/member/brandGift.vue";
import memberNotice from "../components/member/memberNotice.vue";
import memberLogin from "../components/member/memberLogin.vue";
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
      class="w-full h-[100vh] mb-5 flex justify-center relative items-center text-white lg:h-[70vh] md:h-[50vh] md:mb-10"
    >
      <img src="../assets/img/memberPage/member_banner_bg.jpg" class="w-full h-full brightness-50 object-cover" />
      <div class="w-4/5 mx-auto absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-2/3">
        <div
          class="w-fit text-4xl font-thin relative z-10 lg:text-5xl after:w-1/2 after:h-1/2 after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-300 after:opacity-50"
        >
          會員中心
        </div>
        <div class="w-full mt-5 flex items-center font-bold text-2xl md:w-3/4">
          ABOUT GROUP
          <span class="grow h-[1px] mx-2 bg-white md:mx-5"></span>
        </div>
        <div class="w-full mt-10 lg:w-2/3">
          了解築間餐飲集團的會員權益與點數使用規範。
          <br />
          誠摯地邀請您加入我們，成為築間的一份子！
        </div>
      </div>
    </div>
    <div class="w-full mb-20 flex justify-center md:mb-32">
      <RouterLink to="#memberGift" class="w-fit px-5 md:text-xl md:px-12">會員好禮</RouterLink>
      <RouterLink to="#brandGift" class="w-fit px-5 border-x-2 border-gray-300 md:text-xl md:px-12">
        會員權益
      </RouterLink>
      <RouterLink to="#memberLogin" class="w-fit px-5 md:text-xl md:px-12">加入會員</RouterLink>
    </div>
    <memberGift />
    <brandGift />
    <memberNotice />
    <memberLogin />
    <pageFooter />
  </div>
</template>
<style scoped></style>
