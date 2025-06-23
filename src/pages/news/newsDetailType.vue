<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios, { AxiosError } from "axios";
import pageFooter from "../../components/common/footer.vue";
const route = useRoute();
const router = useRouter();
const paragraphHTML = ref("");
const newsDetailInfo = ref();
const getNewsDetailInfo = async (newsId: string) => {
  try {
    const { data } = await axios({
      method: "get",
      baseURL: "http://localhost:8000/",
      url: "/newsDetailInfo",
      params: {
        id: newsId,
      },
    });
    newsDetailInfo.value = data.data.map((item: any) => {
      item.date = item.date.split("-");
      item.img_path = `../../assets/img${item.img_path}`;
      return item;
    })[0];
    // paragraphHTML.value = .replace(/。/g, "。<br>");
    console.log(newsDetailInfo.value);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
const backPage = () => {
  router.back();
};

onMounted(() => {
  getNewsDetailInfo(route.params.id as string);
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
        <p
          v-html="paragraphHTML"
          class="mx-auto my-5 text-left leading-relaxed lg:w-2/3 lg:mt-10 lg:text-xl 2xl:mt-16"
        ></p>
        <button
          class="w-1/2 py-1 px-4 mx-auto my-10 block border border-black rounded-full text-center lg:w-1/4 lg:text-2xl lg:hover:bg-black lg:hover:text-white lg:transition-all 2xl:py-4"
          @click="backPage"
        >
          返回上一頁
        </button>
      </div>
    </div>
    <pageFooter />
  </div>
</template>
<style scoped></style>
