<script setup lang="ts">
import pageFooter from "../../components/common/footer.vue";
</script>
<template>
  <div id="memberLogin" class="w-full my-10 md:my-20 xl:my-24">
    <div class="w-[90%] mx-auto flex flex-col justify-center md:w-4/5 md:flex-row">
      <div class="w-full md:w-2/5">
        <img
          src="../../assets/img/memberPage/member_private_bg.jpg"
          class="w-full h-full object-contain lg:h-[50rem]"
        />
      </div>
      <div class="w-full px-10 my-5 md:w-3/5 md:px-20">
        <div class="w-full">
          <span class="block text-2xl font-extralight lg:text-3xl xl:text-5xl">
            會員/隱私權條款
            <span class="block tracking-wider md:inline">Terms and Privacy of Member</span>
          </span>
        </div>
        <div class="w-full my-10 lg:my-12 xl:my-20">
          <span class="block">
            會員條款：
            <a href="https://ocard.co/terms" target="_blank" class="block lg:inline">https://ocard.co/terms</a>
          </span>
          <span class="block">
            隱私權條款：
            <a href="https://ocard.co/privacy" target="_blank" class="block lg:inline">https://ocard.co/privacy</a>
          </span>
        </div>
        <div class="w-full pt-5 mt-5 border-t-4 border-gray-300 tracking-wider md:pt-10 md:mt-10">
          <div class="w-full mb-5 flex justify-around items-center">
            <RouterLink :to="{ path: '/member/auth/register' }" class="text-gray-400 font-bold lg:text-lg xl:text-2xl">
              註冊
            </RouterLink>
            <RouterLink :to="{ path: '/member/auth/login' }" class="text-gray-400 font-bold lg:text-lg xl:text-2xl">
              登入
            </RouterLink>
          </div>
          <RouterView />
        </div>
      </div>
    </div>
    <pageFooter />
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: black;
}
</style>
