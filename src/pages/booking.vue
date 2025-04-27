<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { usePageCheckStore } from "../store/usePageCheck";
import { useWebStorage } from "../composables/useWebStorage";
import { TBookingDetail } from "../type/TBookingDetail";
import { TCityWeather } from "../type/TCityWeather";
import pageFooter from "../components/common/footer.vue";
const {
  localStorageMethod: { localSet, localGet, localRemove },
} = useWebStorage();
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
const adults = ref(6);
const childs = ref(4);
const EatAdults = ref(2);
const Eatchilds = ref(0);
const dataString = ref("選擇日期");
const dateNum = ref(30);
const thirtyDayM = [1, 3, 5, 7, 8, 10, 12];
const activeMIdx = ref(-1);
const activeDIdx = ref(-1);
const selectM = ref(1);
const selectD = ref(1);
const showData = ref(false);
const checkMouthDay = ref(false);
const bookingName = ref("");
const bookingTel = ref("");
const bookingDateCheck = ref(true);
const bookingNameCheck = ref(true);
const bookingTelCheck = ref(true);
const bookingPopUp = ref(false);
const bookingSuccess = ref(false);
const errorNameMes = ref("");
const errorShow = ref(false);
const errorTelMes = ref("");
const searchTel = ref("");
const errorSearchShow = ref(false);
const searchPopUp = ref(false);
const searchBookingDetail = ref<TBookingDetail>();
const removeSuccess = ref(false);
const telRule = /^\d{10}$/;
const nameRule = /^[A-Za-z\u4e00-\u9fff\s]+$/;
const weatherData = ref<TCityWeather[]>([]);
const cityName = ref();
const cityWeather = ref();
const cityIdx = ref(0);
const checkLimit = (e: Event) => {
  const peopleNum = Number((e.target as HTMLSelectElement).value);
  const type = (e.target as HTMLSelectElement).name;
  if (type === "adults") {
    childs.value = Math.abs(peopleNum - 6);
    EatAdults.value = peopleNum;
  }
  if (type === "childs") {
    adults.value = Math.abs(peopleNum - 6);
    Eatchilds.value = peopleNum;
  }
};
const toggleDate = () => {
  showData.value = !showData.value;
};
const cancelDate = () => {
  toggleDate();
  activeMIdx.value = -1;
  activeDIdx.value = -1;
  dataString.value = "選擇日期";
};
const comfirmDate = () => {
  toggleDate();
  dataString.value = `${selectM.value}月${selectD.value}日`;
};
const focusM = (idx: number) => {
  activeMIdx.value = idx;
  selectM.value = idx + 1;
  checkMouthDay.value = thirtyDayM.some((item) => item === selectM.value);
  bookingDateCheck.value = true;
  if (checkMouthDay.value) {
    dateNum.value = 31;
    return;
  }
  if (selectM.value === 2) {
    dateNum.value = 28;
    return;
  }
  dateNum.value = 30;
};
const focusD = (idx: number) => {
  activeDIdx.value = idx;
  selectD.value = idx + 1;
  bookingDateCheck.value = true;
};
const errorMes = computed(() => {
  return `${errorNameMes.value}${errorTelMes.value}`;
});
const checkBooking = () => {
  errorNameMes.value = "";
  errorTelMes.value = "";
  if (activeMIdx.value === -1 || activeDIdx.value === -1) {
    bookingDateCheck.value = false;
  }
  if (bookingName.value === "" || !nameRule.test(bookingName.value)) bookingNameCheck.value = false;
  if (bookingTel.value === "") bookingTelCheck.value = false;
  if (bookingNameCheck.value && !bookingTelCheck.value) {
    errorTelMes.value = "輸入正確電話號碼";
    errorShow.value = true;
    return;
  }
  if (bookingTelCheck.value && !bookingNameCheck.value) {
    errorTelMes.value = "輸入正確預約姓名";
    errorShow.value = true;
    return;
  }
  if (!bookingTelCheck.value && !bookingNameCheck.value) {
    errorNameMes.value = "輸入正確預約姓名、";
    errorTelMes.value = "正確電話號碼";
    errorShow.value = true;
    return;
  }
  bookingPopUp.value = true;
};
const cancelBooking = () => {
  bookingPopUp.value = false;
};
const comfirmBooking = () => {
  bookingSuccess.value = true;
  localSet(`bookingDetail${bookingTel.value}`, {
    name: bookingName.value,
    tel: bookingTel.value,
    adults: EatAdults.value,
    childs: Eatchilds.value,
    date: dataString.value,
  });
  setTimeout(() => {
    bookingPopUp.value = false;
    bookingSuccess.value = false;
    bookingName.value = "";
    bookingTel.value = "";
    dataString.value = "選擇日期";
    activeMIdx.value = -1;
    activeDIdx.value = -1;
    EatAdults.value = 2;
    Eatchilds.value = 0;
  }, 3500);
};
const changeName = (e: Event) => {
  bookingName.value = (e.target as HTMLInputElement).value;
  if (!nameRule.test(bookingName.value)) return (bookingNameCheck.value = false);
  bookingNameCheck.value = true;
};
const changeTel = (e: Event) => {
  bookingTel.value = (e.target as HTMLInputElement).value;
  if (!telRule.test(bookingTel.value) && bookingTel.value != "") {
    errorTelMes.value = "正確電話號碼";
    errorShow.value = true;
    bookingTelCheck.value = false;
    return;
  }
  bookingTelCheck.value = true;
  errorShow.value = false;
};
const changeSearchTel = (e: Event) => {
  searchTel.value = (e.target as HTMLInputElement).value;
  if (!telRule.test(searchTel.value) && searchTel.value != "") {
    errorSearchShow.value = true;
    return;
  }
  errorSearchShow.value = false;
};
const upDateBooking = () => {
  if (!telRule.test(searchTel.value) || searchTel.value === "") {
    errorSearchShow.value = true;
    return;
  }
  searchPopUp.value = true;
  searchBookingDetail.value = localGet(`bookingDetail${searchTel.value}`) as TBookingDetail;
  if (searchBookingDetail.value === null) return;
};
const removeBooking = () => {
  localRemove(`bookingDetail${searchTel.value}`);
  removeSuccess.value = true;
  setTimeout(() => {
    removeSuccess.value = false;
    searchPopUp.value = false;
  }, 3000);
};
const closeDetail = () => {
  searchPopUp.value = false;
};

const getWeatherData = async () => {
  try {
    const result = await axios({
      url: "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-07B7EC45-CEE1-4AEA-B4CD-6754E5B6D36C&locationName=&elementName=Wx",
      method: "get",
    });
    weatherData.value = result.data.records.location;
    cityName.value = weatherData.value[cityIdx.value].locationName;
    cityWeather.value = weatherData.value[cityIdx.value].weatherElement[0].time[1].parameter.parameterName;
  } catch (error) {
    console.log(error);
  }
};

const timer = setInterval(() => {
  cityIdx.value++;
  if (cityIdx.value >= weatherData.value.length) cityIdx.value = 0;
  cityName.value = weatherData.value[cityIdx.value].locationName;
  cityWeather.value = weatherData.value[cityIdx.value].weatherElement[0].time[1].parameter.parameterName;
}, 10000);

onMounted(async () => {
  checkRoute();
  window.addEventListener("click", () => {
    if (showData.value) showData.value = false;
  });
  await getWeatherData();
});
onUnmounted(() => {
  window.removeEventListener("click", () => {
    if (showData.value) showData.value = false;
  });
  clearInterval(timer);
});
</script>
<template>
  <div class="w-full mt-20 relative lg:mt-28">
    <div class="w-full mb-3 lg:px-3 lg:mb-7">
      <img class="w-full aspect-[3/1] object-cover" src="../assets/img/bg/banner_bg.jpg" alt="bookingImg" />
    </div>
    <div class="w-full px-3">
      <div class="w-full">
        <span class="text-4xl font-bold lg:text-6xl">築間餐飲</span>
        <div class="w-full mt-2 flex justify-between text-gray-800 lg:text-2xl lg:mt-4">
          <span>鍋物、燒烤、日料</span>
          <span class="flex items-center w-fit cursor-pointer">
            <span class="material-symbols-outlined">ios_share</span>
            Share
          </span>
        </div>
        <span class="w-fit mt-4 flex items-center border-b-4 border-gray-800 lg:text-4xl lg:mt-6 lg:pb-2 lg:w-full">
          <span class="material-symbols-outlined lg:text-4xl">calendar_today</span>
          我要訂位
        </span>
      </div>
      <div class="w-full my-2 flex flex-col gap-3 lg:my-6 lg:flex-row lg:flex-wrap lg:gap-0 lg:justify-between">
        <span class="text-4xl lg:w-full lg:mb-6">選擇訂位時段</span>
        <div class="lg:w-[49%] xl:mt-10">
          <span class="block mb-2 lg:text-3xl">用餐人數</span>
          <div class="w-full flex gap-2 lg:mt-7">
            <select
              ref="selectAdultDom"
              class="w-1/2 pl-1 rounded-md bg-white lg:w-1/4 lg:py-2 lg:text-xl lg:grow"
              name="adults"
              @change.stop="checkLimit"
            >
              <option v-for="n in adults" class="bg-white" :key="n" :value="n" :selected="n == 2">{{ n }}位大人</option>
            </select>
            <select
              ref="selectChildtDom"
              class="w-1/2 pl-1 rounded-md bg-white lg:w-1/4 lg:py-2 lg:text-xl lg:grow"
              name="childs"
              @change.stop="checkLimit"
            >
              <option class="bg-white" :value="0">0位小孩</option>
              <option v-for="n in childs" class="bg-white" :key="n" :value="n">{{ n }}位小孩</option>
            </select>
          </div>
        </div>
        <div class="lg:w-[49%] relative xl:mt-10">
          <span class="block mb-2 relative lg:text-3xl">
            預約日期
            <span
              class="weatherAnimate flex items-center w-fit absolute top-1/2 right-0 translate-y-[-50%] lg:text-sm lg:tracking-wider"
            >
              <span class="material-symbols-outlined mr-1">cloud</span>
              {{ cityName }}今日天氣：{{ cityWeather }}
            </span>
          </span>
          <div class="w-full lg:mt-7">
            <button
              class="w-full pl-1 relative rounded-md text-left border bg-white lg:py-2 lg:pl-2 lg:text-xl"
              :class="{
                'border-red-600': !bookingDateCheck,
              }"
              @click.stop="toggleDate"
            >
              {{ dataString }}
            </button>
            <span
              class="absolute top-full left-0 text-sm text-red-600 lg:text-xl"
              :class="{
                hidden: bookingDateCheck,
              }"
            >
              選擇預約日期
            </span>
          </div>
          <div
            v-show="showData"
            class="w-full aspect-square absolute bottom-[100%] rounded-xl flex flex-col bg-[rgba(233,233,233,0.9)] lg:py-1 2xl:aspect-[2/1]"
            @click.stop="() => '禁止關閉'"
          >
            <div class="w-full flex flex-wrap grow">
              <div class="w-1/3 flex flex-col justify-center">
                <span class="w-full h-fit text-center text-2xl mb-2 font-bold">月</span>
                <div class="w-full grow flex flex-wrap justify-evenly border-r border-dashed border-black">
                  <span
                    v-for="(n, idx) in 12"
                    :key="n"
                    class="w-1/3 m-1 rounded-lg text-center relative bg-slate-100 hover:bg-slate-300"
                    :class="{
                      'bg-slate-300': idx === activeMIdx,
                    }"
                    @click.stop="focusM(idx)"
                  >
                    <span class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-bold lg:text-lg">
                      {{ n }}
                    </span>
                  </span>
                </div>
              </div>
              <div class="w-2/3 flex flex-col justify-center">
                <span class="w-full h-fit text-center text-2xl mb-2 font-bold">日</span>
                <div class="w-full grow flex flex-wrap justify-between">
                  <span
                    v-for="(n, idx) in dateNum"
                    :key="n"
                    class="w-[16%] m-1 rounded-lg text-center relative bg-slate-100 hover:bg-slate-300"
                    :class="{
                      'bg-slate-300': idx === activeDIdx,
                    }"
                    @click.stop="focusD(idx)"
                  >
                    <span class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-bold lg:text-lg">
                      {{ n }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full flex gap-1 justify-around">
              <button class="w-fit py-1 hover:text-slate-500 lg:text-2xl" @click.stop="cancelDate">取消</button>
              <button class="w-fit py-1 hover:text-slate-500 lg:text-2xl" @click.stop="comfirmDate">確認</button>
            </div>
          </div>
        </div>
        <span class="w-full text-sm mt-2 lg:text-base">
          可接受 1-6 位訂位（含大人與小孩），實際訂位請依各門市現場狀況安排。
        </span>
        <div class="relative lg:w-[49%] lg:mt-10">
          <span class="block mb-2 lg:text-3xl">姓名、電話</span>
          <div class="w-full flex gap-2 lg:mt-7">
            <input
              type="text"
              class="w-1/2 pl-1 py-1 rounded-md border lg:w-1/4 lg:py-2 lg:text-xl lg:grow"
              :class="{
                'border-red-600': !bookingNameCheck,
                'focus:outline-red-600': !bookingNameCheck,
              }"
              placeholder="輸入姓名"
              :value="bookingName"
              @change="changeName"
            />
            <input
              type="tel"
              class="w-1/2 pl-1 py-1 rounded-md border lg:w-1/4 lg:py-2 lg:text-xl lg:grow"
              :class="{
                'border-red-600': (!telRule.test(bookingTel) && bookingTel != '') || !bookingTelCheck,
                'focus:outline-red-600': (!telRule.test(bookingTel) && bookingTel != '') || !bookingTelCheck,
              }"
              placeholder="輸入電話號碼"
              :value="bookingTel"
              maxlength="10"
              @change="changeTel"
            />
          </div>
          <span
            class="opacity-0 absolute top-full text-sm text-red-600 lg:text-xl"
            :class="{
              'opacity-100': errorShow,
            }"
          >
            {{ errorMes }}
          </span>
        </div>
      </div>
      <button
        class="w-1/2 block py-1 px-4 mx-auto mt-20 border border-black rounded-full lg:w-1/4 lg:text-2xl lg:hover:bg-black lg:hover:text-white lg:transition-all 2xl:py-4"
        @click="checkBooking"
      >
        確認預約訂位
      </button>
      <div class="w-full mt-10 pt-5 border-t border-dashed border-slate-400 lg:w-full lg:pt-10">
        <span class="block mb-2 lg:text-3xl">預約電話</span>
        <div class="w-full relative lg:mt-7">
          <input
            type="tel"
            class="w-full pl-1 py-1 rounded-md border lg:w-1/2 lg:py-2 lg:text-xl"
            :class="{
              'border-red-600': (!telRule.test(searchTel) && searchTel != '') || errorSearchShow,
              'focus:outline-red-600': (!telRule.test(searchTel) && searchTel != '') || errorSearchShow,
            }"
            placeholder="輸入電話號碼"
            :value="searchTel"
            maxlength="10"
            @change="changeSearchTel"
          />
          <span
            class="opacity-0 absolute top-full left-0 text-sm text-red-600 lg:right-2/3 lg:text-xl"
            :class="{
              'opacity-100': errorSearchShow,
            }"
          >
            輸入正確電話號碼
          </span>
        </div>
      </div>
      <button
        class="w-1/2 block py-1 px-4 mx-auto mt-20 border border-black rounded-full lg:w-1/4 lg:text-2xl lg:hover:bg-black lg:hover:text-white lg:transition-all 2xl:py-4"
        @click="upDateBooking"
      >
        取消 / 查詢訂位
      </button>
    </div>
    <div
      class="fixed inset-0 bg-[rgba(100,100,100,0.6)] z-50"
      :class="{
        hidden: !bookingPopUp,
      }"
    >
      <div
        class="w-1/2 h-1/2 px-2 flex flex-col justify-around absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl text-center bg-white lg:w-1/3 lg:aspect-square lg:justify-center lg:text-2xl lg:h-fit"
        :class="{
          hidden: !bookingPopUp,
        }"
      >
        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: bookingSuccess }"
        >
          預約日期：
          <span class="block w-fit mx-auto mt-1 text-black">
            {{ dataString }}
          </span>
        </span>
        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: bookingSuccess }"
        >
          用餐人數：
          <span class="block w-fit mx-auto mt-1 text-black">{{ EatAdults }}位大人和{{ Eatchilds }}位小孩</span>
        </span>

        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: bookingSuccess }"
        >
          聯絡資訊：
          <span class="block w-fit mx-auto mt-1 text-black">{{ bookingName }} 先生/小姐</span>
          <span class="block w-fit mx-auto text-black">{{ bookingTel }}</span>
        </span>
        <div class="w-full flex justify-around lg:py-10" :class="{ hidden: bookingSuccess }">
          <button class="hover:text-gray-500 transition-all" @click="cancelBooking">取消</button>
          <button class="hover:text-gray-500 transition-all" @click="comfirmBooking">確認</button>
        </div>
        <span class="lg:text-3xl" :class="{ hidden: !bookingSuccess }">預約成功！</span>
      </div>
    </div>
    <div
      class="fixed inset-0 bg-[rgba(100,100,100,0.6)] z-50"
      :class="{
        hidden: !searchPopUp,
      }"
    >
      <div
        class="w-1/2 h-1/2 px-2 flex flex-col justify-around absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl text-center bg-white lg:w-1/3 lg:aspect-square lg:justify-center lg:text-2xl lg:h-fit"
        :class="{
          hidden: !searchPopUp,
        }"
      >
        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{
            hidden: !(searchBookingDetail === null),
          }"
        >
          查無預約紀錄
        </span>
        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: searchBookingDetail === null || removeSuccess }"
        >
          預約日期：
          <span class="block w-fit mx-auto mt-1 text-black">{{ searchBookingDetail?.date }}</span>
        </span>
        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: searchBookingDetail === null || removeSuccess }"
        >
          用餐人數：
          <span class="block w-fit mx-auto mt-1 text-black">
            {{ searchBookingDetail?.adults }}位大人和{{ searchBookingDetail?.childs }}位小孩
          </span>
        </span>
        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: searchBookingDetail === null || removeSuccess }"
        >
          聯絡資訊：
          <span class="block w-fit mx-auto mt-1 text-black">{{ searchBookingDetail?.name }} 先生/小姐</span>
          <span class="block w-fit mx-auto text-black">{{ searchBookingDetail?.tel }}</span>
        </span>
        <!--  -->
        <span class="w-full block pb-3 text-slate-400 lg:py-10" :class="{ hidden: !removeSuccess }">
          <span class="block w-fit mx-auto mt-1 text-black">取消成功</span>
        </span>
        <!--  -->
        <div class="w-full flex justify-around lg:py-10" :class="{ hidden: removeSuccess }">
          <button
            class="text-red-500 hover:text-red-800 transition-all"
            :class="{ hidden: searchBookingDetail === null }"
            @click="removeBooking"
          >
            取消預約
          </button>
          <button class="hover:text-gray-500 transition-all" @click="closeDetail">關閉</button>
        </div>
      </div>
    </div>
    <pageFooter />
  </div>
</template>
<style scoped>
.weatherAnimate {
  animation: fade 10s infinite linear alternate;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
