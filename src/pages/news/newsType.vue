<script setup lang="ts">
import { AxiosError } from "axios";
import { ref, onMounted } from "vue";
import { getNewsInfo } from "../../api";
import { useRoute, useRouter, onBeforeRouteUpdate, RouterLink } from "vue-router";
const route = useRoute();
const router = useRouter();
const newsArr = ref();
const size = ref<number>(6);
const moreState = ref(false);
const loadState = ref(true);
const getNewsInfoData = async (type: string) => {
  try {
    const data = await getNewsInfo(type, size.value);
    if (data.resultArr.length === 0) {
      router.replace("/notFound");
      return;
    }
    newsArr.value = data.resultArr.map((item: any) => {
      item.date = item.date.split("-");
      item.img_path = `../../assets/img${item.img_path}`;
      return item;
    });
    moreState.value = data.loadDone;
    loadState.value = false;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

const loadMore = async () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  loadState.value = true;
  size.value += 6;
  await getNewsInfoData(route.params.type as string);
};

onBeforeRouteUpdate((to) => {
  loadState.value = true;
  size.value = 6;
  getNewsInfoData(to.params.type as string);
});

onMounted(async () => {
  await getNewsInfoData(route.params.type as string);
});
</script>

<template>
  <div class="w-full mt-6 relative">
    <div v-show="!loadState" class="w-full flex flex-wrap justify-around md:w-2/3 md:mx-auto">
      <RouterLink
        :to="{ path: `/news/${item.date.join('')}/${item.id}` }"
        v-for="item in newsArr"
        :key="item.id"
        class="w-full mt-6 mb-10 cursor-pointer group sm:w-[45%] xl:w-[30%]"
      >
        <div class="p-3 relative">
          <img :src="item.img_path" class="w-full aspect-[4/3] object-cover group-hover:contrast-50 transition-all" />
          <div
            class="h-1/3 aspect-square flex flex-col justify-center items-center absolute bottom-0 left-0 bg-black group-hover:bg-yellow-500 transition-all md:1/2"
          >
            <span class="block text-white text-sm md:font-medium">{{ item.date[0] }}/{{ item.date[1] }}</span>
            <span class="text-white text-3xl md:font-bold">{{ item.date[2] }}</span>
          </div>
        </div>
        <div class="w-full px-3 mt-2 md:font-bold lg:text-lg">{{ item.title }}</div>
      </RouterLink>
      <div v-show="!moreState" class="flex items-center gap-3 cursor-pointer group" @click="loadMore">
        <span class="text-gray-500 text-xl font-medium group-hover:text-black transition-colors lg:text-2xl">
          查看更多 More
        </span>
        <div class="flex gap-2">
          <span
            v-for="item in 3"
            :key="item"
            :style="{ '--bounceDelay': item * 0.1 + 's' }"
            class="bounce w-2 h-2 rounded-full bg-gray-600 group-hover:bg-black transition-colors"
          ></span>
        </div>
      </div>
    </div>
    <div v-show="loadState" class="w-full h-[50vh] flex justify-center items-center gap-3">
      <span class="text-gray-500 text-xl font-medium transition-colors lg:text-4xl">加載中</span>
      <div class="flex gap-2 lg:gap-4">
        <span
          v-for="item in 3"
          :key="item"
          :style="{ '--bounceDelay': item * 0.1 + 's' }"
          class="bounce w-2 h-2 rounded-full bg-gray-600 lg:w-4 lg:h-4"
        ></span>
      </div>
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
    transform: translateY(-10px);
  }
}
</style>
