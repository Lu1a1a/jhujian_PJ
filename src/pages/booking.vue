<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../store/usePageCheck";
import BookingArea from "../components/bookingPage/BookingArea.vue";
// import meun from "../components/bookingPage/meun";
// import footer from "../components/bookingPage/footer";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div class="w-full">
    <BookingArea />
  </div>
</template>
<style scoped></style>
