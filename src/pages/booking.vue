<script setup lang="ts">
import { onMounted } from "vue";
import { usePageCheckStore } from "../store/usePageCheck";
import BookingArea from "../components/bookingPage/BookingArea.vue";
import pageFooter from "../components/part/footer.vue";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
onMounted(() => {
  checkRoute();
});
</script>
<template>
  <div class="w-full">
    <BookingArea />
    <pageFooter />
  </div>
</template>
<style scoped></style>
