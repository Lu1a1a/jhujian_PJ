<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../store/usePageCheck";
import banner from "../components/homePage/banner.vue";
import brand from "../components/homePage/brand.vue";
import news from "../components/homePage/news.vue";
import company from "../components/homePage/company.vue";
import pageFooter from "../components/part/footer.vue";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div class="overflow-hidden">
    <banner />
    <brand />
    <news />
    <company />
    <pageFooter />
  </div>
</template>
<style scoped></style>
