<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../store/usePageCheck";
import positionPage from "../components/positionPage/position.vue";
import pageFooter from "../components/part/footer.vue";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div>
    <positionPage />
    <pageFooter />
  </div>
</template>
<style scoped></style>
