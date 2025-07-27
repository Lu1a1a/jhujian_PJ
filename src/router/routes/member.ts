import { storeToRefs } from "pinia";
import {} from "vue-router";
import { useAuthMemberStore } from "../../store/useAuthMember";
import memberCenter from "../../pages/member/memberCenter.vue";
import memberAuth from "../../pages/member/memberAuth.vue";
import register from "../../pages/member/register.vue";
import login from "../../pages/member/login.vue";
export default [
  {
    name: "member",
    path: "/member",
    component: memberCenter,
    beforeEnter: () => {
      const authMemberStore = useAuthMemberStore();
      const { isLogin } = storeToRefs(authMemberStore);
      if (isLogin.value === false) {
        return { path: "/member/auth/login" };
      }
    },
  },
  {
    name: "memberAuth",
    path: "/member/auth",
    component: memberAuth,
    children: [
      {
        name: "register",
        path: "register",
        component: register,
      },
      {
        name: "login",
        path: "login",
        component: login,
      },
    ],
  },
];
