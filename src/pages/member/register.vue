<script setup lang="ts">
import { ref } from "vue";
import { firstNameAuth, lastNameAuth, telAuth, mailAuth, passwordAuth } from "../../composables/useFormAuth.ts";
const pwdShow = ref(false);
const pwdType = ref("password");
const firstName = ref("");
const firstNameState = ref(true);
const lastName = ref("");
const lastNameState = ref(true);
const tel = ref("");
const telState = ref(true);
const mail = ref("");
const mailState = ref(true);
const password = ref("");
const passwordState = ref(true);
const togglePwdShow = () => {
  pwdShow.value = !pwdShow.value;
  pwdType.value = pwdShow.value ? "text" : "password";
};
const registerAuth = () => {
  authFirstName();
  authLastName();
  authTel();
  authMail();
  authPassword();
  if (!firstNameState.value || !lastNameState.value || !telState.value || !mailState.value || !passwordState.value)
    return;
};
const authFirstName = () => {
  firstNameState.value = firstNameAuth(firstName.value);
};
const authLastName = () => {
  lastNameState.value = lastNameAuth(lastName.value);
};
const authTel = () => {
  telState.value = telAuth(Number(tel.value));
};
const authMail = () => {
  mailState.value = mailAuth(mail.value);
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
      <div class="w-fit my-2 font-medium lg:text-2xl">立即加入會員</div>
      <div class="w-fit my-2 text-sm font-light">享有築間會員權益，以及不定期好禮送給您</div>
    </div>
    <div class="max-w-xl mx-auto my-7 flex gap-2">
      <div class="w-1/2 relative lg:w-2/5 xl:w-1/3">
        <span class="text-lg xl:text-xl">姓</span>
        <input
          type="text"
          placeholder="輸入姓氏"
          v-model="firstName"
          class="w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
          :class="{ 'outline-1 outline-red-500': !firstNameState }"
          @input="authFirstName"
        />
        <span
          class="absolute left-0 top-full text-red-500"
          :class="{
            'opacity-0': firstNameState,
          }"
        >
          請輸入正確姓氏
        </span>
      </div>
      <div class="w-1/2 relative lg:w-3/5 xl:w-2/3">
        <span class="text-lg xl:text-xl">名</span>
        <input
          type="text"
          placeholder="輸入名字"
          v-model="lastName"
          class="w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
          :class="{ 'outline-1 outline-red-500': !lastNameState }"
          @input="authLastName"
        />
        <span
          class="absolute left-0 top-full text-red-500"
          :class="{
            'opacity-0': lastNameState,
          }"
        >
          請輸入正確姓名
        </span>
      </div>
    </div>
    <div class="max-w-xl mx-auto my-7 relative">
      <span class="text-lg xl:text-xl">電話</span>
      <input
        type="tel"
        placeholder="輸入電話"
        v-model="tel"
        maxlength="10"
        class="block w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
        :class="{ 'outline-1 outline-red-500': !telState }"
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
      <span class="text-lg xl:text-xl">信箱</span>
      <input
        type="email"
        placeholder="輸入信箱"
        v-model="mail"
        class="block w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
        :class="{ 'outline-1 outline-red-500': !mailState }"
        @input="authMail"
      />
      <span
        class="absolute left-0 top-full text-red-500"
        :class="{
          'opacity-0': mailState,
        }"
      >
        請輸入正確信箱格式
      </span>
    </div>
    <div class="max-w-xl mx-auto my-7 relative">
      <span class="text-lg xl:text-xl">密碼</span>
      <input
        :type="pwdType"
        placeholder="輸入密碼"
        maxlength="15"
        v-model="password"
        class="block w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
        :class="{ 'outline-1 outline-red-500': !passwordState }"
        @input="authPassword"
      />
      <span
        class="absolute left-0 top-full text-red-500"
        :class="{
          'opacity-0': passwordState,
        }"
      >
        請輸入8到15字的英、數密碼
      </span>

      <div class="w-fit absolute right-2 bottom-0 cursor-pointer" @click="togglePwdShow">
        <span v-if="pwdShow" class="material-symbols-outlined">visibility</span>
        <span v-else class="material-symbols-outlined">visibility_off</span>
      </div>
    </div>
    <div class="max-w-xl mx-auto my-10">
      <button
        class="w-full py-2 relative z-10 rounded-lg text-base text-white bg-black/50 overflow-hidden after:w-full after:h-full after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-300 after:opacity-50 after:translate-x-[-100%] after:transition-transform after:duration-500 hover:after:translate-x-0 xl:text-xl"
        @click="registerAuth"
      >
        加入會員 JOIN
      </button>
    </div>
  </div>
</template>
<style scoped></style>
