<script setup lang="ts">
import "swiper/css/navigation";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import axios, { AxiosError } from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate, RouterLink } from "vue-router";
const route = useRoute();
const router = useRouter();
const newsArr = ref();
const loadState = ref(false);
const swiperRef = ref();
const modules = ref([Navigation, Autoplay]);
const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});
const swiperBreakPoint = {
  768: { slidesPerView: 3, spaceBetween: 0, centeredSlides: true },
};

const getNewsInfo = async (type: string) => {
  try {
    const { data } = await axios({
      method: "get",
      baseURL: "http://localhost:8000/",
      url: "/newsInfo",
      params: {
        category: type,
        size: 6,
      },
    });
    if (data.data.resultArr.length === 0) {
      router.replace("/notFound");
      return;
    }
    newsArr.value = data.data.resultArr.map((item: any) => {
      item.date = item.date.split("-");
      item.img_path = `../../assets/img${item.img_path}`;
      return item;
    });
    loadState.value = data.data.loadDone;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
const swiperInit = (val: SwiperClass) => {
  swiperRef.value = val;
};
const hoverImg = () => {
  if (swiperRef.value.autoplay === undefined) return;
  swiperRef.value.autoplay.pause();
};
const leaveImg = () => {
  if (swiperRef.value.autoplay === undefined) return;
  swiperRef.value.autoplay.start();
};

onBeforeRouteUpdate((to) => {
  getNewsInfo(to.params.type as string);
});

onMounted(() => {
  getNewsInfo(route.params.type as string);
});
</script>
<template>
  <div class="w-full relative">
    <swiper
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :modules="modules"
      :loop="true"
      :speed="2000"
      :navigation="navigation"
      :slides-per-view="2"
      :breakpoints="swiperBreakPoint"
      @swiper="swiperInit"
    >
      <swiper-slide v-for="item in newsArr" :key="item.img">
        <RouterLink
          :to="{ path: `/news/${item.date.join('')}/${item.id}` }"
          class="w-full h-full flex flex-col cursor-pointer group"
          @mouseover="hoverImg"
          @mouseleave="leaveImg"
        >
          <div class="w-full aspect-square overflow-hidden bg-black">
            <img
              class="w-full h-full object-cover group-hover:contrast-50 transition-all"
              :src="item.img_path"
              alt="allNewsImg"
            />
          </div>
          <div class="grow flex flex-col gap-1 group-hover:text-gray-500 transition-all md:text-2xl md:gap-2">
            <span class="w-full line-clamp-2">{{ item.title }}</span>
            <span class="w-full mt-auto">{{ item.date[0] }}/{{ item.date[1] }}/{{ item.date[2] }}</span>
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper>
    <div v-show="!loadState" class="swiper-button-next"></div>
    <div v-show="!loadState" class="swiper-button-prev"></div>
  </div>
</template>
<style scoped>
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: gray;
}
.swiper-button-prev {
  left: 5%;
}
.swiper-button-next {
  right: 5%;
}
.swiper {
  width: 80%;
}
.swiper-slide {
  width: 30% !important;
  aspect-ratio: 1/1.4;
  margin: 0 2%;
}
@media screen and (max-width: 768px) {
  .swiper-slide {
    width: 45% !important;
    aspect-ratio: 1/1.8;
    margin: 0 2.5%;
  }
  .swiper-button-prev {
    left: 2%;
  }
  .swiper-button-next {
    right: 2%;
  }
}
</style>
