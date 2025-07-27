<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePageCheckStore } from "../../store/usePageCheck";
import { useCheckNavBgStore } from "../../store/useCheckNavBg";
const brandList = [
  "築間幸福鍋物",
  "燒肉smile",
  "有之和牛",
  "本格燒肉",
  "絵馬別邸",
  "築間酸菜魚",
  "紫木槿韓國烤肉",
  "紫木槿韓餐酒館",
  "築間麻辣火鍋",
  "築間台灣鹽酥雞",
  "芡芳石頭火鍋",
  "朴庶韓國銅盤烤肉",
  "朴庶韓國烤肉公社",
];
const brandShow = ref<boolean>(false);
const scrollY = ref(0);
const showNav = ref(false);
const focusIdx = ref("");
const menuClose = ref(true);
const restaurantName = ref("");
const pageCheckStore = usePageCheckStore();
const NavBgStateStore = useCheckNavBgStore();
const { isPosition, isBooking } = storeToRefs(pageCheckStore);
const { isTransparentPage, isNavBgTransparent } = storeToRefs(NavBgStateStore);
const { setNavBgState } = NavBgStateStore;
const router = useRouter();

const data = ref([
  {
    icon: `http://fakejhujian.ddns.net/assets/CanFondHotPot-C1Xy5rpn.jpg`,
    name: "芡芳石頭火鍋",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/emabettei_yakiniku-CTOvE_3E.jpg`,
    name: "絵馬別邸",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/honkakuwagyu-CnM4OpBW.jpg`,
    name: "本格燒肉",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/honmei_yakiniku-Cz6llYVB.png`,
    name: "燒肉本命",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/Jhujian_Fried_Chicken-D6CW18Xl.png`,
    name: "築間台灣鹽酥雞",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/jhujianshabu-Cx97PfMv.jpg`,
    name: "築間幸福鍋物",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/jhujiansuancaiyu-DjC1bxwP.jpg`,
    name: "築間酸菜魚",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/parkshukoreanbbq-Cpta-OTk.png`,
    name: "朴庶韓國烤肉公社",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/parkshukoreanbulgogi-BWDn5FL5.png`,
    name: "朴庶韓國銅盤烤肉",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/yakiniku_smile-RZowgdK9.jpg`,
    name: "燒肉smile",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/yuituwagyu-BIJmXtiD.jpg`,
    name: "有之和牛",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/zihmujin_koreabbq-CBKyklLH.jpg`,
    name: "紫木槿韓國烤肉",
  },
  {
    icon: `http://fakejhujian.ddns.net/assets/zihmujin_koreabistro-ThadLjii.png`,
    name: "紫木槿韓餐酒館",
  },
]);
const brandSelect = () => {
  brandShow.value = !brandShow.value;
};
const focusSelect = (item: string) => {
  focusIdx.value = item;
};
const defocusSelect = () => {
  focusIdx.value = "";
};
const menuSwitch = () => {
  menuClose.value = !menuClose.value;
};
const NavFixed = () => {
  scrollY.value = window.scrollY;
  setNavBgState(false);
  if (scrollY.value === 0 && isTransparentPage.value) {
    setNavBgState(true);
  }
};
const watchStop = watch(scrollY, (newY, oldY) => {
  if (newY > oldY) {
    showNav.value = false;
    brandShow.value = false;
    return;
  }
  showNav.value = true;
});
const goPosition = () => {
  router.push({ path: "/position", query: { name: "築間幸福鍋物" } });
};
const goHome = () => {
  router.push({ path: "/home/allNews" });
};
const goBooking = () => {
  router.push({ path: "/booking" });
};
const goPositionBrandLi = (e: Event) => {
  restaurantName.value = (e.target as HTMLLIElement).innerText;
  router.push({ path: "/position", query: { name: restaurantName.value } });
  menuClose.value = true;
};
const goPositionBrandSpan = (e: Event) => {
  restaurantName.value = (e.target as HTMLImageElement).alt;
  router.push({ path: "/position", query: { name: restaurantName.value } });
  menuClose.value = true;
};
const goAbout = () => {
  router.push({ path: "/group" });
  menuClose.value = true;
};
const goNews = () => {
  router.push({ path: "/news/allNews" });
  menuClose.value = true;
};
const goMember = () => {
  router.push({ path: "/member" });
  menuClose.value = true;
};
const goContact = () => {
  router.push({ path: "/contact" });
  menuClose.value = true;
};
const goPartner = () => {
  router.push({ path: "/partner" });
  menuClose.value = true;
};
const goEsg = () => {
  router.push({ path: "/esg" });
  menuClose.value = true;
};
const goRecruit = () => {
  router.push({ path: "/recruit" });
  menuClose.value = true;
};
const goInvestor = () => {
  router.push({ path: "/investor" });
  menuClose.value = true;
};
const goCompanyBrand = () => {
  router.push({ path: "/home/allNews", hash: "#companyBrand" });
  menuClose.value = true;
};
onMounted(() => {
  showNav.value = true;
  window.addEventListener("scroll", NavFixed);
});
onUnmounted(() => {
  window.removeEventListener("scroll", NavFixed);
  watchStop();
});
</script>
<template>
  <nav
    ref="mainNav"
    class="w-full py-5 fixed z-50 transition-all duration-300"
    :class="{ 'translate-y-[-100%]': !showNav }"
  >
    <img
      src="../../assets/img/common/bg/JhuJian_bg.jpg"
      class="w-full h-full absolute top-0 left-0 -z-10 object-cover transition-opacity duration-300"
      :class="{ 'opacity-0': isNavBgTransparent }"
    />
    <ul class="w-full list-none flex items-center justify-evenly font-bold">
      <li class="w-1/4 flex justify-around items-center lg:text-3xl">
        <div class="w-fit flex items-center cursor-pointer lg:gap-4">
          <Transition name="fade" mode="out-in">
            <div
              v-if="isPosition"
              class="flex items-center gap-2 cursor-pointer"
              :class="{ 'text-white': isNavBgTransparent }"
              @click="goPosition"
            >
              <span class="w-fit material-symbols-outlined cursor-pointer lg:text-3xl">pin_drop</span>
              <span class="hidden md:block lg:text-lg">餐廳位置</span>
            </div>
            <div v-else class="flex items-center gap-2" :class="{ 'text-white': isNavBgTransparent }" @click="goHome">
              <span class="material-symbols-outlined lg:text-3xl">home</span>
              <span class="hidden md:block lg:text-lg">返回首頁</span>
            </div>
          </Transition>
        </div>
        <div class="w-fit flex items-center cursor-pointer lg:gap-4">
          <Transition name="fade" mode="out-in">
            <div
              v-if="isBooking"
              class="flex items-center gap-2"
              :class="{ 'text-white': isNavBgTransparent }"
              @click="goBooking"
            >
              <span class="material-symbols-outlined lg:text-3xl">local_dining</span>
              <span class="hidden md:block lg:text-lg">立即訂位</span>
            </div>
            <div v-else class="flex items-center gap-2" :class="{ 'text-white': isNavBgTransparent }" @click="goHome">
              <span class="material-symbols-outlined lg:text-3xl">home</span>
              <span class="hidden md:block lg:text-lg">返回首頁</span>
            </div>
          </Transition>
        </div>
      </li>
      <li class="w-1/4">
        <span @click="goHome">
          <img
            class="m-auto cursor-pointer"
            src="../../assets/img/common/logo/JhuJian_sm_logo.svg"
            alt="logo"
            :class="{ invert: isNavBgTransparent }"
          />
        </span>
      </li>
      <ul class="w-1/4 flex text-center justify-around">
        <li class="w-1/2 relative md:w-fit">
          <span
            class="hidden cursor-pointer md:flex md:justify-center md:items-center lg:text-lg lg:mx-auto"
            :class="{ 'text-white': isNavBgTransparent }"
            @click="brandSelect"
          >
            BRAND 品牌
            <span
              class="material-symbols-outlined transition-transform duration-500"
              :class="{ ratateFlip: !brandShow }"
            >
              arrow_drop_down
            </span>
          </span>
          <ul
            class="hidden h-0 absolute w-full top-[150%] left-1/2 px-2 translate-x-[-50%] bg-white overflow-x-hidden scrollNone rounded-xl md:block lg:text-xl show"
            :class="{
              'opacity-0': !brandShow,
              'h-80': brandShow,
            }"
          >
            <li
              v-for="item in brandList"
              :key="item"
              class="text-center py-2 relative transition-[color] duration-300 cursor-pointer md:text-sm lg:py-5 lg:w-full lg:text-base xl:text-lg 2xl:text-xl"
              :class="{
                'text-black': focusIdx === item || focusIdx === '',
                'text-gray-300': focusIdx !== item && focusIdx !== '',
              }"
              @mouseenter="focusSelect(item)"
              @mouseout="defocusSelect"
              @click="goPositionBrandLi"
            >
              {{ item }}
            </li>
          </ul>
        </li>
        <li class="flex flex-col justify-around cursor-pointer group" @click="menuSwitch">
          <span
            class="w-12 h-0.5 bg-black origin-right group-hover:-rotate-12 transition-transform my-1"
            :class="{ 'bg-white': isNavBgTransparent }"
          ></span>
          <span
            class="w-12 h-0.5 bg-black origin-right group-hover:rotate-12 transition-transform my-1"
            :class="{ 'bg-white': isNavBgTransparent }"
          ></span>
        </li>
      </ul>
    </ul>
  </nav>
  <div
    class="w-full h-full py-5 fixed top-0 md:flex transition overflow-y-auto z-50 selfBgImg"
    :class="{
      'opacity-0': menuClose,
      'pointer-events-none': menuClose,
    }"
  >
    <div
      class="md:w-1/2 md:flex md:flex-col md:justify-center md:gap-16 md:border-r md:border-dashed md:border-slate-400 z-10 md:border-b-0 border-b border-dashed border-slate-400 mx-5"
    >
      <ul class="md:w-full md:px-3 md:flex md:flex-wrap">
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goAbout"
        >
          關於
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            ABOUT
          </span>
        </li>
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goMember"
        >
          會員
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            MEMBER
          </span>
        </li>
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goNews"
        >
          新訊
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            NEWS
          </span>
        </li>
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goContact"
        >
          聯繫
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            CONTACT
          </span>
        </li>
      </ul>
      <ul class="md:w-full md:px-3 md:flex md:flex-wrap">
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goPartner"
        >
          創業
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            PARTNER
          </span>
        </li>
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goEsg"
        >
          企業永續
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            ESG
          </span>
        </li>
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goRecruit"
        >
          人才
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            RECRUITING
          </span>
        </li>
        <li
          class="md:w-1/2 md:my-5 md:mx-0 my-5 font-medium text-2xl group cursor-pointer xl:text-xl 2xl:text-4xl"
          @click="goInvestor"
        >
          投資人
          <span class="pl-2 group-hover:text-black text-gray-400 transition-all xl:text-xl 2xl:text-4xl xl:pl-5">
            INVESTOR
          </span>
        </li>
      </ul>
    </div>
    <div class="flex flex-col z-10 mx-5 md:w-1/2 lg:justify-center lg:gap-7">
      <span class="w-full py-2 my-3 md:w-5/6 lg:text-xl">EXPLORE 築間旗下品牌</span>
      <div class="w-full flex flex-wrap md:px-10 md:overflow-y-scroll lg:px-0">
        <div v-for="item in data" :key="item.name" class="w-1/2 md:w-1/3 relative">
          <span
            class="mb-3 flex justify-center items-center relative pointer md:mb-0 lg:w-fit lg:aspect-square lg:rounded-full lg:hover:bg-white lg:transition-all"
            @click="goPositionBrandSpan"
          >
            <img class="w-4/5 rounded-full" :src="item.icon" :alt="item.name" />
          </span>
        </div>
      </div>
      <span class="group w-full flex items-center cursor-pointer lg:text-xl" @click="goCompanyBrand">
        MORE 品牌總覽
        <span class="material-symbols-outlined align-middle transition group-hover:rotate-180">add</span>
        <span class="grow ml-5 h-px bg-black"></span>
      </span>
    </div>
    <div class="fixed bottom-0 -z-10">
      <img src="../../assets/img/common/logo/JhuJian_big_logo.png" alt="menu_logo" />
    </div>
    <span
      class="material-symbols-outlined block fixed top-5 right-5 md:absolute md:right-10 scale-125 cursor-pointer z-20 lg:text-4xl"
      @click="menuSwitch"
    >
      close
    </span>
  </div>
</template>
<style scoped>
.scrollNone > li + li {
  border-top: 1px solid grey;
}
.ratateFlip {
  transform: rotate3d(1, 0, 0, 180deg);
}
::-webkit-scrollbar {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.show {
  transition: height 0.5s, opacity 0.5s linear;
}
.selfBgImg {
  background-image: url("../../assets/img/common/bg/JhuJian_bg.jpg");
}
</style>
