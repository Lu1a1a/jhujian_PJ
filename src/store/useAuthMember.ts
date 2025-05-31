import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthMemberStore = defineStore("authMember", () => {
  const isLogin = ref(false);

  const setLoginState = (token: string) => {
    localStorage.setItem("memberToken", token);
    isLogin.value = true;
  };

  const setLogOutState = () => {
    localStorage.removeItem("memberToken");
    isLogin.value = false;
  };

  return { isLogin, setLoginState, setLogOutState };
});
