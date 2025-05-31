<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useDateFormat } from "@vueuse/core";
import { usePageCheckStore } from "../../store/usePageCheck";
import { TScheduleArr } from "../../type/TBookingDate";
import { TBookingOrder } from "../../type/TBookingOrder";
import { TCityWeather } from "../../type/TCityWeather";
import pageFooter from "../../components/common/footer.vue";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
const adults = ref(6);
const childs = ref(4);
const EatAdults = ref(2);
const Eatchilds = ref(0);
const dataString = ref("選擇日期");
const showData = ref(false);
const bookingFirstName = ref("");
const bookingLastName = ref("");
const bookingTel = ref("");
const bookingDateCheck = ref(true);
const bookingPopUp = ref(false);
const bookingSuccess = ref(false);
const bookingFail = ref(false);
const errorTelMes = ref("");
const errorFirstName = ref(false);
const errorLastName = ref(false);
const errorTel = ref(false);
const searchTel = ref("");
const errorSearchTel = ref(false);
const searchDataArray = ref<TBookingOrder[] | null>(null);
const searchPopUp = ref(false);
const removeSuccess = ref(false);
const telRule = /^\d{10}$/;
const nameRule = /^[A-Za-z\u4e00-\u9fff\s]+$/;
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
const handleDateChange = async (data: Date) => {
  bookingDateCheck.value = true;
  const dateFormat = useDateFormat(data, "YYYY-MM-DD");
  const [year, month, date] = String(dateFormat.value).split("-");
  Myear.value = year;
  Mmonth.value = month;
  Mdate.value = date;
  dataString.value = `${month}月${date}日`;
  try {
    const { data } = await axios({
      method: "get",
      baseURL: "http://localhost:8000/",
      url: "/reservation/schedule",
      params: {
        date: dateFormat.value,
      },
    });
    const reservationArr = Object.entries(data.data).map((item) => {
      const { 0: hour, 1: min } = item[0].split(":");
      item[0] = `${hour}:${min}`;
      return item;
    });
    reservationDay.value = reservationArr as TScheduleArr[];
    currentIdx.value = -1;
  } catch (error) {
    console.log(error);
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
  errorTelMes.value = "";
  if (dataString.value === "選擇日期" || currentIdx.value === -1) {
    bookingDateCheck.value = false;
  }
  if (bookingFirstName.value === "") errorFirstName.value = true;
  if (bookingLastName.value === "") errorLastName.value = true;
  if (bookingTel.value === "") errorTel.value = true;
  if (errorFirstName.value || errorLastName.value || errorTel.value || !bookingDateCheck.value) return;
  bookingPopUp.value = true;
};
const cancelBooking = () => {
  bookingPopUp.value = false;
};
const comfirmBooking = async () => {
  try {
    await axios({
      method: "post",
      baseURL: "http://localhost:8000/",
      url: "/reservation",
      data: {
        adult: EatAdults.value,
        child: Eatchilds.value,
        date: `${Myear.value}-${Mmonth.value}-${Mdate.value}`,
        time: `${timeString.value}:00`,
        firstName: bookingFirstName.value,
        lastName: bookingLastName.value,
        phone: bookingTel.value,
      },
    });
    bookingSuccess.value = true;
  } catch (error) {
    bookingFail.value = true;
    console.log(error);
  }
  setTimeout(() => {
    bookingPopUp.value = false;
    bookingSuccess.value = false;
    bookingFail.value = false;
    bookingFirstName.value = "";
    bookingLastName.value = "";
    reservationDay.value = [];
    bookingTel.value = "";
    dataString.value = "選擇日期";
    EatAdults.value = 2;
    Eatchilds.value = 0;
  }, 3000);
};

const changeFirstName = (e: Event) => {
  bookingFirstName.value = (e.target as HTMLInputElement).value;
  if (!nameRule.test(bookingFirstName.value)) return (errorFirstName.value = true);
  errorFirstName.value = false;
};
const changeLastName = (e: Event) => {
  bookingLastName.value = (e.target as HTMLInputElement).value;
  if (!nameRule.test(bookingLastName.value)) return (errorLastName.value = true);
  errorLastName.value = false;
};
const changeTel = (e: Event) => {
  bookingTel.value = (e.target as HTMLInputElement).value;
  if (!telRule.test(bookingTel.value) && bookingTel.value != "") {
    errorTel.value = true;
    return;
  }
  errorTel.value = false;
};
const changeSearchTel = (e: Event) => {
  searchTel.value = (e.target as HTMLInputElement).value;
  if (!telRule.test(searchTel.value) && searchTel.value != "") {
    errorSearchTel.value = true;
    return;
  }
  errorSearchTel.value = false;
};

const upDateOrder = async () => {
  searchDataArray.value = [];
  if (searchTel.value === "" || errorSearchTel.value) return (errorSearchTel.value = true);
  try {
    const { data: order_data } = await axios({
      method: "post",
      baseURL: "http://localhost:8000/",
      url: "/reservation/find",
      params: {
        phone: searchTel.value,
      },
    });
    searchPopUp.value = true;
    console.log(order_data);
    if (order_data.data.length === 0) {
      searchOrderNone.value = true;
      searchOrder.value = true;
    }
    searchDataArray.value = order_data.data.map((item: TBookingOrder) => {
      const [hour, min] = item.time.split(":");
      item.time = `${hour}:${min}`;
      return item;
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
const removeOrder = async (idx: number) => {
  const { id } = (searchDataArray.value as TBookingOrder[])[idx];
  try {
    await axios({
      method: "delete",
      baseURL: "http://localhost:8000/",
      url: "/reservation",
      params: {
        order_id: id,
      },
    });
  } catch (error) {
    console.log(error);
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

const selectTime = (idx: number, e: Event) => {
  timeString.value = (e.target as HTMLElement).innerText;
  currentIdx.value = idx;
  bookingDateCheck.value = true;
};

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
            @update:modelValue="handleDateChange"
          >
            <template #trigger>
              <div class="w-full lg:mt-7">
                <button
                  class="w-full pl-1 relative rounded-md text-left border bg-white lg:py-2 lg:pl-2 lg:text-xl"
                  :class="{
                    'border-red-600': !bookingDateCheck,
                  }"
                >
                  {{ dataString }}
                </button>
              </div>
            </template>
          </VueDatePicker>
          <span
            class="opacity-0 absolute top-full text-sm text-red-600 lg:text-xl"
            :class="{
              'opacity-100': !bookingDateCheck,
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
              class="w-1/3 pl-1 py-1 rounded-md border lg:py-2 lg:text-xl lg:grow"
              :class="{
                'border-red-600': errorFirstName,
                'focus:outline-red-600': errorFirstName,
              }"
              placeholder="輸入姓"
              :value="bookingFirstName"
              @change="changeFirstName"
            />
            <input
              type="text"
              class="w-2/3 pl-1 py-1 rounded-md border lg:py-2 lg:text-xl lg:grow"
              :class="{
                'border-red-600': errorLastName,
                'focus:outline-red-600': errorLastName,
              }"
              placeholder="輸入名"
              :value="bookingLastName"
              @change="changeLastName"
            />
          </div>
          <span
            class="opacity-0 absolute top-full text-sm text-red-600 lg:text-xl"
            :class="{
              'opacity-100': errorLastName || errorFirstName,
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
              class="w-full pl-1 py-1 border rounded-md lg:w-1/4 lg:py-2 lg:text-xl lg:grow"
              :class="{
                'border-red-600': errorTel,
                'focus:outline-red-600': errorTel,
              }"
              placeholder="輸入電話號碼"
              maxlength="10"
              :value="bookingTel"
              @change="changeTel"
            />
          </div>
          <span
            class="opacity-0 absolute top-full text-sm text-red-600 lg:text-xl"
            :class="{
              'opacity-100': errorTel,
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
            class="w-full pl-1 py-1 rounded-md border lg:w-1/2 lg:py-2 lg:text-xl"
            :class="{
              'border-red-600': errorSearchTel,
              'focus:outline-red-600': errorSearchTel,
            }"
            placeholder="輸入電話號碼"
            :value="searchTel"
            maxlength="10"
            @change="changeSearchTel"
          />
          <span
            class="opacity-0 absolute top-full left-0 text-sm text-red-600 lg:right-2/3 lg:text-xl"
            :class="{
              'opacity-100': errorSearchTel,
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
            {{ dataString }}
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
          <span class="block w-fit mx-auto mt-1 text-black">{{ bookingFirstName }}{{ bookingLastName }} 先生/小姐</span>
          <span class="block w-fit mx-auto text-black">{{ bookingTel }}</span>
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
          <div class="w-full flex justify-around lg:py-10">
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
