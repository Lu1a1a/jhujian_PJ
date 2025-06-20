<script setup lang="ts">
import { ref, onMounted, provide } from "vue";
import startAnimation from "./components/animation/startAnimation.vue";
import navigation from "./components/common/navigation.vue";
import { useAuthMemberStore } from "./store/useAuthMember.ts";
import { useCarouselImg } from "./store/useCarouselImg.ts";
const authMemberStore = useAuthMemberStore();
const carouselImg = useCarouselImg();
const { setLoginState } = authMemberStore;
const { setCarouselImg } = carouselImg;
const animateShow = ref(true);
provide("animateShow", animateShow);

onMounted(() => {
  const token = localStorage.getItem("login_token");
  if (token !== null) {
    setLoginState(token);
  }
  setCarouselImg();
});
</script>

<template>
  <Transition name="animateTransition">
    <startAnimation v-if="animateShow" />
    <div v-else class="w-full overflow-hidden bg-[url('./assets/img/common/bg/JhuJian_bg.jpg')]">
      <navigation />
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </Transition>
</template>

<style scoped>
.animateTransition-enter-active,
.animateTransition-leave-active {
  transition: opacity 1s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.animateTransition-enter-from,
.animateTransition-leave-to,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.animateTransition-enter-to,
.animateTransition-leave-from,
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
