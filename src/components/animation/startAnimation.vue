<script setup lang="ts">
import { ref, inject, Ref } from "vue";
const animateShow = inject("animateShow") as Ref<boolean>;
const bgAnimate = ref(true);
const logoAnimate = ref(false);
const containerAnimate = ref(true);
const logoUp = () => {
  logoAnimate.value = true;
};
const zoomOut = () => {
  containerAnimate.value = false;
};
const animateEnd = () => {
  animateShow.value = false;
};
</script>
<template>
  <Transition name="container" @after-leave="animateEnd">
    <div v-if="containerAnimate" class="w-full relative">
      <Transition name="bg" appear @after-enter="logoUp">
        <div v-if="bgAnimate" class="w-full h-screen brightness-[0.3]">
          <img class="w-full h-full object-cover align-top" src="../../assets/img/bg/banner_bg.jpg" alt="animateBg" />
        </div>
      </Transition>
      <Transition name="logo" @after-enter="zoomOut">
        <div v-if="logoAnimate" class="w-1/2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <img class="w-full align-top" src="../../assets/img/logo/JhuJian_mid_logo.svg" alt="animateLogo" />
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<style scoped>
.bg-enter-active {
  transition: filter 1s;
}
.bg-enter-from {
  filter: brightness(0.3) opacity(0);
}
.bg-enter-to {
  filter: brightness(0.3) opacity(1);
}
.logo-enter-active {
  transition: transform 1s 0.3s, opacity 1.5s 0.3s;
}
.logo-enter-from {
  transform: translate(-50%, -20%);
  opacity: 0;
}
.logo-enter-to {
  transform: translate(-50%, -50%);
  opacity: 1;
}
.container-leave-active {
  transition: clip-path 1s;
}
.container-leave-from {
  clip-path: circle(100%);
}
.container-leave-to {
  clip-path: circle(0%);
}
</style>
