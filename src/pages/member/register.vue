<script setup lang="ts">
import { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthMemberStore } from "../../store/useAuthMember.ts";
import { memberRegister, memberLogin } from "../../api";
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
const popUpShow = ref(false);
const popUpMessage = ref("");
const router = useRouter();
const authMemberStore = useAuthMemberStore();
const { setLoginState } = authMemberStore;
const { memberInfo } = storeToRefs(authMemberStore);
const togglePwdShow = () => {
  pwdShow.value = !pwdShow.value;
  pwdType.value = pwdShow.value ? "text" : "password";
};
const registerAuth = async () => {
  FirstNameAuth();
  LastNameAuth();
  TelAuth();
  MailAuth();
  PasswordAuth();
  if (!firstNameState.value || !lastNameState.value || !telState.value || !mailState.value || !passwordState.value)
    return;
  const registerInfo = {
    firstName: firstName.value,
    lastName: lastName.value,
    phone: Number(tel.value),
    mail: mail.value,
    password: password.value,
  };
  try {
    const data = await memberRegister(registerInfo);
    if ((data.success = true)) {
      const data = await memberLogin(registerInfo);
      popUpShow.value = true;
      popUpMessage.value = "註冊成功，5秒後自動跳轉";
      setLoginState(data.token);
      memberInfo.value = data.memberInfo;
      setTimeout(() => {
        router.push({ path: "/member" });
      }, 5000);
      firstName.value = "";
      lastName.value = "";
      tel.value = "";
      mail.value = "";
      password.value = "";
    }
  } catch (error) {
    const err = error as AxiosError;
    popUpShow.value = true;
    if ((err.response?.data as any).data.duplicate_value) {
      const errMsg = (err.response?.data as any).data.duplicate_value as string[];
      if (errMsg.includes("tel")) {
        tel.value = "";
        telState.value = false;
        popUpMessage.value = "電話號碼已註冊";
        return;
      }
      if (errMsg.includes("mail")) {
        mail.value = "";
        mailState.value = false;
        popUpMessage.value = "信箱已註冊";
        return;
      }
      return;
    }
    popUpMessage.value = "伺服器忙碌中，稍後再試";
  }
};
const FirstNameAuth = () => {
  firstNameState.value = firstNameAuth(firstName.value);
};
const LastNameAuth = () => {
  lastNameState.value = lastNameAuth(lastName.value);
};
const TelAuth = () => {
  telState.value = telAuth(tel.value);
};
const MailAuth = () => {
  mailState.value = mailAuth(mail.value);
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
        class="w-fit my-2 relative z-[5] font-medium after:w-full after:h-1/2 after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-300 after:opacity-50"
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
          @input="FirstNameAuth"
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
          @input="LastNameAuth"
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
      <span class="text-lg xl:text-xl">信箱</span>
      <input
        type="email"
        placeholder="輸入信箱"
        v-model="mail"
        class="block w-full px-2 py-1 mt-1 rounded-lg outline-none md:py-2"
        :class="{ 'outline-1 outline-red-500': !mailState }"
        @input="MailAuth"
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
        @input="PasswordAuth"
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
    <div v-show="popUpShow" class="w-screen h-screen fixed z-30 top-0 left-0 bg-slate-600/35">
      <div
        class="w-2/3 py-6 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg text-center lg:text-xl lg:w-1/2 xl:w-2/5 xl:text-2xl"
      >
        {{ popUpMessage }}
      </div>
      <button
        class="w-2/5 py-2 absolute bottom-1/4 left-1/2 translate-x-[-50%] bg-white rounded-full text-center lg:w-1/5 lg:text-xl xl:text-2xl hover:bg-black hover:text-white transition-all"
        @click="closePopUp"
      >
        關閉
      </button>
    </div>
  </div>
</template>
<style scoped></style>
