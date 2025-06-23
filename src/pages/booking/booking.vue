<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useDateFormat } from "@vueuse/core";
import { usePageCheckStore } from "../../store/usePageCheck";
import { AxiosError } from "axios";
import { reservationSchedule, reservationOrder, reservationFind, reservationOrderDel, getWeather } from "../../api";
import { firstNameAuth, lastNameAuth, telAuth, searchTelAuth, dateAuth } from "../../composables/useFormAuth.ts";

import { TScheduleArr, TBookingOrder, TCityWeather } from "../../type";
import pageFooter from "../../components/common/footer.vue";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
const adults = ref(6);
const childs = ref(4);
const EatAdults = ref(2);
const Eatchilds = ref(0);
const firstName = ref("");
const firstNameState = ref(true);
const lastName = ref("");
const lastNameState = ref(true);
const tel = ref("");
const telState = ref(true);
const searchTel = ref("");
const SearchTelState = ref(true);
const dateString = ref("選擇日期");
const showData = ref(false);
const dateAuthState = ref(true);
const bookingPopUp = ref(false);
const bookingSuccess = ref(false);
const bookingFail = ref(false);
const searchDataArray = ref<TBookingOrder[] | null>(null);
const searchPopUp = ref(false);
const removeSuccess = ref(false);
const weatherData = ref<TCityWeather[]>([]);
const cityName = ref();
const cityWeather = ref();
const cityIdx = ref(0);
const selectedDate = ref(null);
const currentIdx = ref(-1);
const timeString = ref();
const Myear = ref("");
const Mmonth = ref("");
const Mdate = ref("");
const searchOrder = ref(false);
const searchOrderNone = ref(false);
const reservationDay = ref<TScheduleArr[] | null>(null);
const handleDate = async (data: Date) => {
  dateAuthState.value = true;
  const dateFormat = useDateFormat(data, "YYYY-MM-DD");
  const [year, month, date] = String(dateFormat.value).split("-");
  Myear.value = year;
  Mmonth.value = month;
  Mdate.value = date;
  dateString.value = `${month}月${date}日`;
  try {
    const data = await reservationSchedule(dateFormat.value);
    const reservationArr = Object.entries(data.data).map((item) => {
      const { 0: hour, 1: min } = item[0].split(":");
      item[0] = `${hour}:${min}`;
      return item;
    });
    reservationDay.value = reservationArr as TScheduleArr[];
    currentIdx.value = -1;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
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
const checkBooking = () => {
  FirstNameAuth();
  LastNameAuth();
  TelAuth();
  DateAuth();
  if (!firstNameState.value || !lastNameState.value || !telState.value || !dateAuthState.value) return;
  bookingPopUp.value = true;
};

const cancelBooking = () => {
  bookingPopUp.value = false;
};

const DateAuth = () => {
  dateAuthState.value = dateAuth(selectedDate.value);
};

const FirstNameAuth = () => {
  firstNameState.value = firstNameAuth(firstName.value);
};
const LastNameAuth = () => {
  lastNameState.value = lastNameAuth(lastName.value);
};
const TelAuth = () => {
  telState.value = telAuth(tel.value);
};
const SearchTelAuth = () => {
  SearchTelState.value = searchTelAuth(searchTel.value);
  console.log(SearchTelState.value);
};

const comfirmBooking = async () => {
  const orderInfo = {
    adult: EatAdults.value,
    child: Eatchilds.value,
    date: `${Myear.value}-${Mmonth.value}-${Mdate.value}`,
    time: `${timeString.value}:00`,
    firstName: firstName.value,
    lastName: lastName.value,
    phone: tel.value,
  };
  try {
    await reservationOrder(orderInfo);
    bookingSuccess.value = true;
  } catch (error) {
    const err = error as AxiosError;
    bookingFail.value = true;
    console.log(err.response?.data);
  }
  setTimeout(() => {
    bookingPopUp.value = false;
    bookingSuccess.value = false;
    bookingFail.value = false;
    firstName.value = "";
    lastName.value = "";
    reservationDay.value = [];
    tel.value = "";
    dateString.value = "選擇日期";
    EatAdults.value = 2;
    Eatchilds.value = 0;
  }, 3000);
};

const upDateOrder = async () => {
  SearchTelAuth();
  if (!SearchTelState.value) return;
  try {
    const data = await reservationFind(searchTel.value);
    searchPopUp.value = true;
    if (data.data.length === 0) {
      searchOrderNone.value = true;
      searchOrder.value = true;
      return;
    }
    searchDataArray.value = [];
    searchDataArray.value = data.data.map((item: TBookingOrder) => {
      const [hour, min] = item.time.split(":");
      item.time = `${hour}:${min}`;
      return item;
    });
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
const removeOrder = async (idx: number) => {
  const { id } = (searchDataArray.value as TBookingOrder[])[idx];
  try {
    await reservationOrderDel(id);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
  searchDataArray.value = [];
  removeSuccess.value = true;
  setTimeout(() => {
    removeSuccess.value = false;
    searchPopUp.value = false;
  }, 3000);
};
const closeOrder = () => {
  searchPopUp.value = false;
  searchOrder.value = false;
  searchOrderNone.value = false;
};

const getWeatherData = async () => {
  try {
    const data = await getWeather();
    weatherData.value = data.data.records.location;
    cityName.value = weatherData.value[cityIdx.value].locationName;
    cityWeather.value = weatherData.value[cityIdx.value].weatherElement[0].time[1].parameter.parameterName;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

const timer = setInterval(() => {
  cityIdx.value++;
  if (cityIdx.value >= weatherData.value.length) cityIdx.value = 0;
  cityName.value = weatherData.value[cityIdx.value].locationName;
  cityWeather.value = weatherData.value[cityIdx.value].weatherElement[0].time[1].parameter.parameterName;
}, 10000);

const selectTime = (idx: number, e: Event) => {
  timeString.value = (e.target as HTMLElement).innerText;
  currentIdx.value = idx;
  dateAuthState.value = true;
};
onMounted(() => {
  checkRoute();
  window.addEventListener("click", () => {
    if (showData.value) showData.value = false;
  });
  getWeatherData();
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
      <img class="w-full aspect-[3/1] object-cover" src="../../assets/img/common/bg/banner_bg.jpg" alt="bookingImg" />
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
          <VueDatePicker
            v-model="selectedDate"
            :enable-time-picker="false"
            :min-date="new Date()"
            @update:modelValue="handleDate"
          >
            <template #trigger>
              <div class="w-full lg:mt-7">
                <button
                  class="w-full pl-1 relative rounded-md text-left border bg-white lg:py-2 lg:pl-2 lg:text-xl"
                  :class="{
                    'border-red-600': !dateAuthState,
                  }"
                >
                  {{ dateString }}
                </button>
              </div>
            </template>
          </VueDatePicker>
          <span
            class="opacity-0 absolute top-full text-sm text-red-600 lg:text-xl"
            :class="{
              'opacity-100': !dateAuthState,
            }"
          >
            請選擇日期及時段
          </span>
        </div>
        <span class="w-full text-sm mt-2 order-1 lg:w-[49%] lg:order-none lg:text-base">
          可接受 1-6 位訂位（含大人與小孩），實際訂位請依各門市現場狀況安排。
        </span>
        <div class="w-full mt-2 flex flex-wrap gap-2 relative md:mt-6 lg:w-[49%] xl:mt-10">
          <div
            v-for="(item, idx) in reservationDay"
            :key="idx"
            class="w-fit h-fit px-2 py-1 mt-2 border-[1px] border-white rounded-lg cursor-pointer lg:px-4 lg:py-2 lg:text-xl xl:mx-2 xl:px-6 xl:py-4"
            :class="{
              'bg-white': currentIdx !== idx,
              'bg-gray-500': currentIdx === idx,
              'text-white': currentIdx === idx,
              'border-white/0': currentIdx === idx,
              'pointer-events-none': item[1].remaining === 0,
              'bg-slate-500': item[1].remaining === 0,
              'bg-black': item[1].remaining === 0,
            }"
            @click="selectTime(idx, $event)"
          >
            {{ item[0] }}
          </div>
        </div>
        <div class="relative order-2 lg:w-[49%] lg:mt-10 lg:-order-none">
          <span class="block mb-2 lg:text-3xl">姓名</span>
          <div class="w-full flex gap-2 lg:mt-7">
            <input
              type="text"
              class="w-1/3 pl-1 py-1 rounded-md outline-none lg:py-2 lg:text-xl lg:grow"
              :class="{
                'outline-1 outline-red-500': !firstNameState,
              }"
              placeholder="輸入姓"
              v-model="firstName"
              @change="FirstNameAuth"
            />
            <input
              type="text"
              class="w-2/3 pl-1 py-1 rounded-md outline-none lg:py-2 lg:text-xl lg:grow"
              :class="{
                'outline-1 outline-red-500': !lastNameState,
              }"
              placeholder="輸入名"
              v-model="lastName"
              @change="LastNameAuth"
            />
          </div>
          <span
            class="absolute top-full text-sm text-red-600 lg:text-xl"
            :class="{
              'opacity-0': firstNameState && lastNameState,
            }"
          >
            輸入正確性名
          </span>
        </div>
        <div class="relative order-2 lg:w-[49%] lg:mt-10 lg:-order-none">
          <span class="block mb-2 lg:text-3xl">電話</span>
          <div class="w-full flex gap-2 lg:mt-7">
            <input
              type="tel"
              class="w-full pl-1 py-1 rounded-md outline-none lg:w-1/4 lg:py-2 lg:text-xl lg:grow"
              :class="{
                'outline-1 outline-red-500': !telState,
              }"
              placeholder="輸入電話號碼"
              maxlength="10"
              v-model="tel"
              @change="TelAuth"
            />
          </div>
          <span
            class="absolute top-full text-sm text-red-600 lg:text-xl"
            :class="{
              'opacity-0': telState,
            }"
          >
            輸入正確電話號碼
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
            class="w-full pl-1 py-1 rounded-md border outline-none lg:w-1/2 lg:py-2 lg:text-xl"
            :class="{
              'outline-1 outline-red-500': !SearchTelState,
            }"
            placeholder="輸入電話號碼"
            v-model="searchTel"
            maxlength="10"
            @change="SearchTelAuth"
          />
          <span
            class="absolute top-full left-0 text-sm text-red-600 lg:right-2/3 lg:text-xl"
            :class="{
              'opacity-0': SearchTelState,
            }"
          >
            輸入正確電話號碼
          </span>
        </div>
      </div>
      <button
        class="w-1/2 block py-1 px-4 mx-auto mt-20 border border-black rounded-full lg:w-1/4 lg:text-2xl lg:hover:bg-black lg:hover:text-white lg:transition-all 2xl:py-4"
        @click="upDateOrder"
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
          :class="{ hidden: bookingSuccess || bookingFail }"
        >
          預約日期：
          <span class="block w-fit mx-auto mt-1 text-black">
            {{ dateString }}
            <br />
            {{ timeString }}
          </span>
        </span>
        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: bookingSuccess || bookingFail }"
        >
          用餐人數：
          <span class="block w-fit mx-auto mt-1 text-black">{{ EatAdults }}位大人和{{ Eatchilds }}位小孩</span>
        </span>

        <span
          class="w-full block pb-3 border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
          :class="{ hidden: bookingSuccess || bookingFail }"
        >
          聯絡資訊：
          <span class="block w-fit mx-auto mt-1 text-black">{{ firstName }}{{ lastName }} 先生/小姐</span>
          <span class="block w-fit mx-auto text-black">{{ tel }}</span>
        </span>
        <div class="w-full flex justify-around lg:py-10" :class="{ hidden: bookingSuccess || bookingFail }">
          <button class="hover:text-gray-500 transition-all" @click="cancelBooking">取消</button>
          <button class="hover:text-gray-500 transition-all" @click="comfirmBooking">確認</button>
        </div>
        <span class="lg:text-3xl" :class="{ hidden: !bookingSuccess }">預約成功！</span>
        <span class="lg:text-3xl" :class="{ hidden: !bookingFail }">
          預約失敗！
          <br />
          同一天只允許預訂一次
        </span>
      </div>
    </div>
    <div
      class="fixed inset-0 bg-[rgba(100,100,100,0.6)] z-50"
      :class="{
        hidden: !searchPopUp,
      }"
    >
      <div
        class="w-full h-full absolute"
        :class="{
          hidden: !searchPopUp,
        }"
      >
        <div
          class="w-screen h-screen py-12 flex flex-wrap justify-center items-center gap-2 relative overflow-y-auto md:py-16 md:gap-4 lg:py-20 lg:gap-6"
          :class="{ hidden: searchOrderNone }"
        >
          <div
            class="w-1/2 h-fit py-1 fixed bottom-1 left-1/2 translate-x-[-50%] border-[1px] border-black rounded-full text-white text-center bg-black transition-all md:text-black md:bg-transparent md:hover:bg-black md:hover:text-white md:py-2 md:bottom-3 md:1/3 lg:w-1/4 lg:text-2xl"
            @click="closeOrder"
          >
            <button>關閉</button>
          </div>
          <div
            class="w-2/3 h-fit px-2 py-4 text-center rounded-xl bg-white md:w-2/5 xl:w-1/4"
            v-for="(item, idx) in searchDataArray"
            :key="idx"
          >
            <span
              class="w-full block py-3 border-b border-dashed text-slate-400 border-slate-400 md:text-xl xl:text-2xl lg:py-10"
            >
              預約日期：
              <span class="block w-fit mx-auto mt-1 text-black">
                {{ item.date }}
                <br />
                {{ item.time }}
              </span>
            </span>
            <span
              class="w-full block py-3 border-b border-dashed text-slate-400 border-slate-400 md:text-xl xl:text-2xl lg:py-10"
            >
              用餐人數：
              <span class="block w-fit mx-auto mt-1 text-black">
                {{ item.adult_count }}位大人
                <br />
                {{ item.child_count }}位小孩
              </span>
            </span>
            <span
              class="w-full block py-3 border-b border-dashed text-slate-400 border-slate-400 md:text-xl xl:text-2xl lg:py-10"
            >
              聯絡資訊：
              <span class="block w-fit mx-auto mt-1 text-black">
                {{ item.first_name }}{{ item.last_name }} 先生/小姐
              </span>
              <span class="block w-fit mx-auto text-black">{{ item.phone_number }}</span>
            </span>
            <div class="w-full py-3 justify-around md:text-xl xl:text-2xl lg:py-10">
              <button class="text-red-500 hover:text-red-800 transition-all" @click="removeOrder(idx)">取消預約</button>
            </div>
          </div>
        </div>
        <div
          class="w-1/2 h-fit px-3 py-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-5 bg-white rounded-2xl lg:w-1/3 lg:text-2xl xl:w-1/4"
          :class="{ hidden: !searchOrderNone }"
        >
          <span
            class="w-full block pb-3 text-center border-b border-dashed text-slate-400 border-slate-400 lg:py-10"
            :class="{
              hidden: false,
            }"
          >
            查無預約紀錄
          </span>
          <div class="w-full flex justify-around cursor-pointer lg:py-10">
            <button class="hover:text-gray-500 transition-all" @click="closeOrder">關閉</button>
          </div>
        </div>
        <div
          class="w-1/2 h-fit py-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl text-center bg-white lg:py-10 lg:text-xl xl:2xl"
          :class="{ hidden: !removeSuccess }"
        >
          <span class="">取消成功!</span>
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
