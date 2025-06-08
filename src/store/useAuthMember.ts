import { defineStore } from "pinia";
import { ref } from "vue";
import { TMemberInfo } from "../type/TMemberInfo";
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

  return { memberInfo, isLogin, setLoginState, setSignOutState };
});
