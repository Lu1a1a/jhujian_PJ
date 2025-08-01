<script setup lang="ts">
import { ref, onMounted, provide } from "vue";
import { storeToRefs } from "pinia";
import startAnimation from "./components/animation/startAnimation.vue";
import navigation from "./components/common/navigation.vue";
import { useAuthMemberStore } from "./store/useAuthMember.ts";
import { useCarouselImg } from "./store/useCarouselImg.ts";
import { useScrollSave } from "./store/useScrollSave.ts";
import { useMapScript } from "./utils/mapScript.ts";
import.meta.glob("./assets/img/**/*.{png,jpg,jpeg,svg}", { eager: true });
const authMemberStore = useAuthMemberStore();
const carouselImg = useCarouselImg();
const scrollSave = useScrollSave();
const { setLoginState, setMemberInfo } = authMemberStore;
const { setCarouselImg } = carouselImg;
const { prePosition } = storeToRefs(scrollSave);
const animateShow = ref(true);
provide("animateShow", animateShow);
const vScrollY = {
  mounted: () => {
    window.scrollTo({ top: prePosition.value as number, behavior: "smooth" });
  },
};

onMounted(async () => {
  const token = localStorage.getItem("login_token");
  if (token !== null) {
    setLoginState(token);
    await setMemberInfo(token);
  }
  setCarouselImg();
  useMapScript();
});
</script>

<template>
  <Transition name="animateTransition">
    <startAnimation v-if="animateShow" />
    <div v-else class="w-full overflow-hidden selfBgImg">
      <navigation />
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" v-scroll-y />
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
.selfBgImg {
  background-image: url("./assets/img/common/bg/JhuJian_bg.jpg");
}
</style>
