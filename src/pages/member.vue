<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../store/usePageCheck";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div>
    <div class="w-200 h-80 bg-blue-200"></div>
    <h1 class="">member</h1>
  </div>
</template>
<style scoped></style>
