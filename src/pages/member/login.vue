<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { TResError } from "../../type/TResponseError.ts";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { telAuth, passwordAuth } from "../../composables/useFormAuth.ts";
import { useAuthMemberStore } from "../../store/useAuthMember.ts";
const router = useRouter();
const pwdShow = ref(false);
const pwdType = ref("password");
const tel = ref("");
const telState = ref(true);
const password = ref("");
const passwordState = ref(true);
const popUpShow = ref(false);
const popUpMessage = ref("");
const authMemberStore = useAuthMemberStore();
const { setLoginState } = authMemberStore;
const { isLogin, memberInfo } = storeToRefs(authMemberStore);

const togglePwdShow = () => {
  pwdShow.value = !pwdShow.value;
  pwdType.value = pwdShow.value ? "text" : "password";
};
const loginAuth = async () => {
  TelAuth();
  PasswordAuth();
  if (!telState.value || !passwordState.value) return;
  try {
    const { data } = await axios({
      method: "post",
      baseURL: "http://localhost:8000/",
      url: "/member/login",
      data: {
        phone: tel.value,
        password: password.value,
      },
    });
    popUpShow.value = true;
    popUpMessage.value = "登入成功，5秒後自動跳轉";
    setLoginState(data.data.token);
    memberInfo.value = data.data.memberInfo;
    setTimeout(() => {
      router.push({ path: "/member" });
    }, 5000);
  } catch (error) {
    const err = error as AxiosError<TResError>;
    if (err.response?.data.msg === "member not found") {
      popUpMessage.value = "無會員資料，請輸入正確的電話號碼";
      tel.value = "";
      telState.value = false;
    }
    if (err.response?.data.msg === "wrong password") {
      popUpMessage.value = "密碼錯誤，請輸入正確電話號碼";
      password.value = "";
      passwordState.value = false;
    }
    popUpShow.value = true;
  }
};
const TelAuth = () => {
  telState.value = telAuth(Number(tel.value));
};
const PasswordAuth = () => {
  passwordState.value = passwordAuth(password.value);
};
const closePopUp = () => {
  popUpShow.value = !popUpShow.value;
};
</script>
<template>
  <div class="w-full">
    <div class="max-w-xl mx-auto">
      <div
        class="w-fit my-2 relative z-10 font-medium after:w-full after:h-1/2 after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-300 after:opacity-50"
      >
        Become Our Member
      </div>
      <div class="w-fit my-2 font-medium lg:text-2xl">登入會員</div>
      <div class="w-fit my-2 text-sm font-light">築間會員權益，享有不定期好禮送給您</div>
    </div>
    <div class="max-w-xl mx-auto my-7 relative">
      <span class="text-lg xl:text-xl">電話</span>
      <input
        type="tel"
        placeholder="輸入電話"
        maxlength="10"
        class="block w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
        :class="{ 'outline-1 outline-red-500': !telState }"
        v-model="tel"
        @input="TelAuth"
      />
      <span
        class="absolute left-0 top-full text-red-500"
        :class="{
          'opacity-0': telState,
        }"
      >
        請輸入正確電話格式
      </span>
    </div>
    <div class="max-w-xl mx-auto my-7 relative">
      <span class="text-lg xl:text-xl">密碼</span>
      <input
        :type="pwdType"
        placeholder="輸入密碼"
        maxlength="15"
        class="block w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
        :class="{ 'outline-1 outline-red-500': !passwordState }"
        v-model="password"
        @input="PasswordAuth"
      />
      <span
        class="absolute left-0 top-full text-red-500"
        :class="{
          'opacity-0': passwordState,
        }"
      >
        請輸入正確密碼格式
      </span>
      <div class="w-fit absolute right-2 bottom-0 cursor-pointer" @click="togglePwdShow">
        <span v-if="pwdShow" class="material-symbols-outlined">visibility</span>
        <span v-else class="material-symbols-outlined">visibility_off</span>
      </div>
    </div>
    <div class="max-w-xl mx-auto my-10">
      <button
        class="w-full py-2 relative z-10 rounded-lg text-base text-white bg-black/50 overflow-hidden after:w-full after:h-full after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-300 after:opacity-50 after:translate-x-[-100%] after:transition-transform after:duration-500 hover:after:translate-x-0 xl:text-xl"
        @click="loginAuth"
      >
        登入會員 LOGIN
      </button>
    </div>
    <div v-show="popUpShow" class="w-screen h-screen fixed z-30 top-0 left-0 bg-slate-600/35">
      <div
        class="w-2/3 py-6 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg text-center lg:w-1/2 lg:text-xl xl:w-2/5 xl:text-2xl"
      >
        {{ popUpMessage }}
      </div>
      <button
        v-show="!isLogin"
        class="w-2/5 py-2 absolute bottom-1/4 left-1/2 translate-x-[-50%] bg-white rounded-full text-center lg:w-1/5 lg:text-xl xl:text-2xl hover:bg-black hover:text-white transition-all"
        @click="closePopUp"
      >
        關閉
      </button>
    </div>
  </div>
</template>
<style scoped></style>
