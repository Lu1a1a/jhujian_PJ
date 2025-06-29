<script setup lang="ts">
import { AxiosError } from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { reservationFind, reservationOrderDel } from "../../api";
import { TBookingOrder } from "../../type";
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
const logOutState = ref(false);
const orderPopup = ref(false);
const orderDataArray = ref();
const orderNone = ref(false);
const removeSuccess = ref(false);
const logOutPopup = () => {
  logOutState.value = true;
  popUpShow.value = true;
  popUpMessage.value = "確認要登出？";
};
const closeLogoutPopup = () => {
  logOutState.value = false;
  popUpShow.value = false;
};
const signOut = () => {
  setSignOutState();
  popUpMessage.value = "登出成功，5秒後自動跳轉";
  setTimeout(() => {
    router.push({ path: "/home/allNews" });
  }, 5000);
};
const getOrderInfo = async () => {
  const tel = memberInfo.value.phone_number as string;
  try {
    const data = await reservationFind(tel);
    popUpShow.value = true;
    orderPopup.value = true;

    if (data.length === 0) {
      orderNone.value = true;
      return;
    }
    orderDataArray.value = [];
    orderDataArray.value = data.map((item: TBookingOrder) => {
      const [hour, min] = item.time.split(":");
      item.time = `${hour}:${min}`;
      return item;
    });
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
const removeOrder = async (idx: number) => {
  const { id } = (orderDataArray.value as TBookingOrder[])[idx];
  try {
    await reservationOrderDel(id);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
  orderDataArray.value = [];
  removeSuccess.value = true;
  setTimeout(() => {
    removeSuccess.value = false;
    popUpShow.value = false;
  }, 3000);
};
const closeOrderPopup = () => {
  removeSuccess.value = false;
  orderPopup.value = false;
  orderNone.value = false;
  popUpShow.value = false;
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
        <RouterLink to="#memberGift" class="w-fit px-3 md:text-xl md:px-12">會員好禮</RouterLink>
        <RouterLink to="#brandGift" class="w-fit px-3 md:text-xl md:px-12">會員權益</RouterLink>
        <span class="w-fit px-3 cursor-pointer md:text-xl md:px-12" @click="getOrderInfo">目前訂位</span>
        <span
          class="w-fit px-3 text-red-500 cursor-pointer hover:text-red-800 md:text-xl md:px-12"
          @click="logOutPopup"
        >
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
    <div v-show="popUpShow" class="w-screen h-screen fixed z-50 top-0 left-0 bg-slate-600/35">
      <div
        v-show="orderPopup"
        class="w-screen h-screen py-12 flex flex-wrap justify-center items-center gap-2 relative overflow-y-auto md:py-16 md:gap-4 lg:py-20 lg:gap-6"
      >
        <div
          class="w-2/3 h-fit px-2 py-4 text-center rounded-xl bg-white md:w-2/5 xl:w-1/4"
          v-for="(item, idx) in orderDataArray"
          :key="idx"
        >
          <span
            class="w-full block py-3 border-b border-dashed text-slate-400 border-slate-400 md:text-xl xl:text-2xl lg:py-10"
          >
            預約日期：
            <span class="block w-fit mx-auto mt-1 text-black">
              {{ item.date }}
              <br />
              {{ item.time }}
            </span>
          </span>
          <span
            class="w-full block py-3 border-b border-dashed text-slate-400 border-slate-400 md:text-xl xl:text-2xl lg:py-10"
          >
            用餐人數：
            <span class="block w-fit mx-auto mt-1 text-black">
              {{ item.adult_count }}位大人
              <br />
              {{ item.child_count }}位小孩
            </span>
          </span>
          <span
            class="w-full block py-3 border-b border-dashed text-slate-400 border-slate-400 md:text-xl xl:text-2xl lg:py-10"
          >
            聯絡資訊：
            <span class="block w-fit mx-auto mt-1 text-black">{{ item.first_name }}{{ item.last_name }} 先生/小姐</span>
            <span class="block w-fit mx-auto text-black">{{ item.phone_number }}</span>
          </span>
          <div class="w-full py-3 justify-around md:text-xl xl:text-2xl lg:py-10">
            <button class="text-red-500 hover:text-red-800 transition-all" @click="removeOrder(idx)">取消預約</button>
          </div>
        </div>
        <div
          class="w-1/2 h-fit py-1 fixed bottom-1 left-1/2 translate-x-[-50%] border-[1px] border-black rounded-full text-white text-center bg-black transition-colors cursor-pointer md:text-black md:bg-transparent md:hover:bg-black md:hover:text-white md:py-2 md:bottom-3 md:1/3 lg:w-1/4 lg:text-2xl"
          @click="closeOrderPopup"
        >
          關閉
        </div>
      </div>
      <div
        v-show="removeSuccess"
        class="w-1/2 h-fit py-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl text-center bg-white lg:py-10 lg:text-xl xl:2xl"
      >
        <span class="">取消成功!</span>
      </div>
      <div
        v-show="orderNone"
        class="w-1/2 h-fit px-3 py-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-5 bg-white rounded-2xl lg:w-1/3 lg:text-2xl xl:w-1/4"
      >
        <span class="w-full block pb-3 text-center text-slate-400 lg:py-10">查無預約紀錄</span>
      </div>
      <div v-show="logOutState" class="w-full">
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
            @click="closeLogoutPopup"
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
  </div>
</template>
<style scoped></style>
