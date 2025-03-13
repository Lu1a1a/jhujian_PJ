<script setup lang="ts">
import { ref, provide } from "vue";
import startAnimation from "./components/startAnimation.vue";
import navigation from "./components/homePage/navigation.vue";
import banner from "./components/homePage/banner.vue";
import brand from "./components/homePage/brand.vue";
import news from "./components/homePage/news.vue";
import company from "./components/homePage/company.vue";
import pageFooter from "./components/homePage/footer.vue";
const animateShow = ref(true);
provide("animateShow", animateShow);
</script>

<template>
  <TransitionGroup name="contentShow">
    <startAnimation v-if="animateShow" />
    <div v-else class="overflow-hidden bg-[url('./assets/img/JhuJian__background.jpg')]">
      <navigation />
      <banner />
      <brand />
      <news />
      <company />
      <pageFooter />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.contentShow-enter-active {
  transition: opacity 2s;
}
.contentShow-enter-from {
  opacity: 0;
}
.contentShow-enter-to {
  opacity: 1;
}
</style>
