<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePageCheckStore } from "../../store/usePageCheck";
import memberGift from "../../components/member/memberGift.vue";
import brandGift from "../../components/member/brandGift.vue";
import memberNotice from "../../components/member/memberNotice.vue";
import pageFooter from "../../components/common/footer.vue";
import { useAuthMemberStore } from "../../store/useAuthMember.ts";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
const authMemberStore = useAuthMemberStore();
const { setSignOutState } = authMemberStore;
const { isLogin, memberInfo } = storeToRefs(authMemberStore);
const router = useRouter();
const popUpShow = ref(false);
const popUpMessage = ref("");
const popUpOpen = () => {
  popUpShow.value = true;
  popUpMessage.value = "確認要登出？";
};
const closePopUp = () => {
  popUpShow.value = false;
};
const signOut = () => {
  setSignOutState();
  popUpShow.value = true;
  popUpMessage.value = "登出成功，5秒後自動跳轉";
  setTimeout(() => {
    router.push({ path: "/home/allNews" });
  }, 5000);
};
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div class="w-full">
    <div class="w-full">
      <div
        class="w-full h-[100vh] mb-5 flex justify-center relative items-center text-white lg:h-[70vh] md:h-[50vh] md:mb-10"
      >
        <img src="../../assets/img/memberPage/member_banner_bg.jpg" class="w-full h-full brightness-50 object-cover" />
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
      <div class="w-full mb-10 flex justify-center divide-x-2 divide-gray-300 md:mb-16">
        <RouterLink to="#memberGift" class="w-fit px-5 md:text-xl md:px-12">會員好禮</RouterLink>
        <RouterLink to="#brandGift" class="w-fit px-5 md:text-xl md:px-12">會員權益</RouterLink>
        <span class="w-fit px-5 cursor-pointer md:text-xl md:px-12">目前訂位</span>
        <span class="w-fit px-5 text-red-500 cursor-pointer hover:text-red-800 md:text-xl md:px-12" @click="popUpOpen">
          登出
        </span>
      </div>
      <div class="w-1/2 h-10 mx-auto text-center mb-10 md:mb-16 lg:text-xl xl:text-2xl">
        {{ memberInfo.first_name }} {{ memberInfo.last_name }} 歡迎回來！
      </div>
      <memberGift />
      <brandGift />
      <memberNotice />
      <pageFooter />
    </div>
    <div v-show="popUpShow" class="w-screen h-screen fixed z-30 top-0 left-0 bg-slate-600/35">
      <div
        class="w-2/3 py-6 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg text-center lg:w-1/2 lg:text-xl xl:w-2/5 xl:text-2xl"
      >
        {{ popUpMessage }}
      </div>
      <div
        v-show="isLogin"
        class="w-2/3 py-6 flex justify-center gap-5 absolute bottom-[20%] left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-1/2 lg:bottom-1/4 xl:w-2/5"
      >
        <button
          class="w-1/3 h-fit py-3 rounded-full bg-white lg:text-xl xl:text-2xl hover:text-white hover:bg-black"
          @click="closePopUp"
        >
          取消
        </button>
        <button
          class="w-1/3 h-fit py-3 rounded-full bg-white text-red-500 lg:text-xl xl:text-2xl hover:bg-red-200 hover:text-red-500"
          @click="signOut"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
