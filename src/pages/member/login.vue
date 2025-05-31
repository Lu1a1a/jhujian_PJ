<script setup lang="ts">
import { ref } from "vue";
import { telAuth, passwordAuth } from "../../composables/useFormAuth.ts";

const pwdShow = ref(false);
const pwdType = ref("password");
const tel = ref("");
const telState = ref(true);
const password = ref("");
const passwordState = ref(true);
const togglePwdShow = () => {
  pwdShow.value = !pwdShow.value;
  pwdType.value = pwdShow.value ? "text" : "password";
};
const loginAuth = () => {
  authTel();
  authPassword();
  if (!telState.value || !passwordState.value) return;
};
const authTel = () => {
  telState.value = telAuth(Number(tel.value));
};
const authPassword = () => {
  passwordState.value = passwordAuth(password.value);
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
        @input="authTel"
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
        @input="authPassword"
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
  </div>
</template>
<style scoped></style>
