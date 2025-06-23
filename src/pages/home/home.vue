<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../../store/usePageCheck";
import banner from "../../components/home/banner.vue";
import brand from "../../components/home/brand.vue";
import news from "../../components/home/news.vue";
import company from "../../components/home/company.vue";
import pageFooter from "../../components/common/footer.vue";
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
