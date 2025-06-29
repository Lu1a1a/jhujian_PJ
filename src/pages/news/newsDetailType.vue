<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AxiosError } from "axios";
import { getNewsDetailInfo } from "../../api";
import pageFooter from "../../components/common/footer.vue";
const route = useRoute();
const router = useRouter();
const newsDetailInfo = ref();
const loadState = ref(true);
const getNewsDetailInfoData = async (newsId: string) => {
  try {
    const data = await getNewsDetailInfo(newsId);
    newsDetailInfo.value = data.map((item: any) => {
      item.date = item.date.split("-");
      item.img_path = `../../assets/img${item.img_path}`;
      return item;
    })[0];
    loadState.value = false;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
const backPage = () => {
  router.back();
};

onMounted(async () => {
  await getNewsDetailInfoData(route.params.id as string);
});
</script>
<template>
  <div class="w-full mt-16">
    <div v-if="newsDetailInfo" class="w-full">
      <div
        class="w-1/4 aspect-square mx-auto flex flex-col justify-center items-center gap-1 translate-y-1/2 font-semibold text-white bg-black lg:w-[10%] 2xl:w-1/12"
      >
        <span class="text-sm 2xl:text-xl">{{ newsDetailInfo.date[0] }}/{{ newsDetailInfo.date[1] }}</span>
        <span class="text-2xl 2xl:text-4xl">{{ newsDetailInfo.date[2] }}</span>
      </div>
      <div class="w-5/6 mx-auto px-5 pt-10 pb-5 bg-white/50 lg:w-4/5 lg:pb-10 2xl:py-16">
        <span
          class="block mx-auto mt-5 pb-5 border-b-[1px] border-gray-500 text-center text-xl font-semibold lg:w-2/3 lg:mt-10 lg:pb-10 lg:text-2xl 2xl:mt-16 2xl:pb-16 2xl:text-3xl"
        >
          {{ newsDetailInfo.title }}
        </span>
        <div
          class="w-full aspect-square my-5 mx-auto overflow-hidden lg:w-2/3 lg:mt-10 2xl:w-2/3 2xl:aspect-[1/0.5] 2xl:mt-16"
        >
          <img class="w-full h-full object-cover" :src="newsDetailInfo.img_path" alt="newsImg" />
        </div>
        <p class="mx-auto my-5 text-left whitespace-pre-wrap lg:w-2/3 lg:mt-10 lg:text-xl 2xl:mt-16">
          {{ newsDetailInfo.description }}
        </p>
        <button
          class="w-1/2 py-1 px-4 mx-auto my-10 block border border-black rounded-full text-center lg:w-1/4 lg:text-2xl lg:hover:bg-black lg:hover:text-white lg:transition-all 2xl:py-4"
          @click="backPage"
        >
          返回上一頁
        </button>
      </div>
    </div>
    <div v-show="loadState" class="w-full h-screen flex justify-center items-center gap-3">
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
    <pageFooter />
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
