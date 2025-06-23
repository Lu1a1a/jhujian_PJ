import { defineStore } from "pinia";
import { ref } from "vue";
import { TMemberInfo } from "../type/TMemberInfo";
import { getMemberInfo } from "../api";
export const useAuthMemberStore = defineStore("authMember", () => {
  const isLogin = ref(false);
  const memberInfo = ref<TMemberInfo>({});

  const setLoginState = (token: string) => {
    localStorage.setItem("login_token", token);
    isLogin.value = true;
  };

  const setSignOutState = () => {
    localStorage.removeItem("login_token");
    isLogin.value = false;
  };

  const setMemberInfo = async (token: string) => {
    const data = await getMemberInfo(token);
    memberInfo.value = data.data;
  };

  return { memberInfo, isLogin, setLoginState, setSignOutState, setMemberInfo };
});
