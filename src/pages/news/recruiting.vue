<script setup lang="ts"></script>
<template>
  <div class="w-full mt-6">
    <div class="w-full h-[50vh] flex flex-col justify-center items-center lg:h-[70vh] lg:gap-4">
      <div class="flex gap-2">
        <span
          v-for="item in 3"
          :key="item"
          :style="{ '--bounceDelay': item * 0.1 + 's' }"
          class="bounce w-2 h-2 rounded-full bg-gray-600"
        ></span>
      </div>
      <div class="text-lg text-gray-600 md:text-2xl">資料正在準備中，敬請期待</div>
      <div class="text-lg text-gray-600 font-bold tracking-wider md:text-5xl">Coming Soon!</div>
    </div>
  </div>
</template>
<style scoped>
.bounce {
  animation: bounce 0.6s var(--bounceDelay) ease infinite alternate;
}
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>
