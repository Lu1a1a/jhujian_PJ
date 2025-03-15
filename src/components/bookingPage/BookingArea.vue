<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const adults = ref(6);
const childs = ref(6);
const dataString = ref("選擇日期");
const activeMIdx = ref(-1);
const activeDIdx = ref(-1);
const selectM = ref(1);
const selectD = ref(1);
const showData = ref(false);
const checkLimit = (e: Event) => {
  const peopleNum = Number((e.target as HTMLSelectElement).value);
  const type = (e.target as HTMLSelectElement).name;
  if (type === "adults") {
    childs.value = Math.abs(peopleNum - 6);
    return;
  }
  if (type === "childs") {
    adults.value = Math.abs(peopleNum - 6);
    return;
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
};
const focusD = (idx: number) => {
  activeDIdx.value = idx;
  selectD.value = idx + 1;
};
const comfirmBooking = () => {
  //點擊後要開啟彈窗確認
  //並顯示人數及時間
  //再次按下確認就把資料存到cookie裡
  //按取消則關掉彈裝窗就好
  //彈窗還沒寫好
};
onMounted(() => {
  window.addEventListener("click", () => {
    if (showData.value) showData.value = false;
  });
});
onUnmounted(() => {
  window.removeEventListener("click", () => {
    if (showData.value) showData.value = false;
  });
});
</script>
<template>
  <div class="w-full mt-20 relative lg:mt-28">
    <div class="w-full mb-3 lg:px-3 lg:mb-7">
      <img class="w-full aspect-[3/1] object-cover" src="../../assets/img/3_202312211856499tlbjhxTE1.jpg" />
    </div>
    <div class="w-full px-3">
      <div class="w-full">
        <span class="text-4xl font-bold lg:text-6xl">築間餐飲</span>
        <div class="w-full mt-2 flex justify-between text-gray-800 lg:text-2xl lg:mt-4">
          <span>鍋物、燒烤、日料</span>
          <span class="flex items-center w-fit cursor-pointer"><span class="material-symbols-outlined"> ios_share </span>Share</span>
        </div>
        <span class="w-fit mt-4 flex items-center border-b-4 border-gray-800 lg:text-4xl lg:mt-6 lg:pb-2 lg:w-full"> <span class="material-symbols-outlined lg:text-4xl"> calendar_today </span>我要訂位</span>
      </div>
      <div class="w-full my-2 flex flex-col gap-3 lg:my-6 lg:flex-row lg:flex-wrap lg:gap-0 lg:justify-between">
        <span class="text-4xl lg:w-full lg:mb-6">選擇訂位時段</span>
        <div class="lg:w-[49%]">
          <span class="block mb-2 lg:text-3xl">用餐人數</span>
          <div class="w-full flex gap-2">
            <select class="w-1/2 pl-1 rounded-md lg:w-1/4 lg:py-2 lg:text-xl lg:grow" name="adults" @click.stop="checkLimit">
              <option disabled>選擇人數</option>
              <option v-for="n in adults" :key="n" :value="n">{{ n }}位大人</option>
            </select>
            <select class="w-1/2 pl-1 rounded-md lg:w-1/4 lg:py-2 lg:text-xl lg:grow" name="childs" @click.stop="checkLimit">
              <option value="選擇人數" disabled>選擇人數</option>
              <option v-for="n in childs" :key="n" :value="n">{{ n }}位小孩</option>
            </select>
          </div>
        </div>
        <div class="lg:w-[49%] relative">
          <span class="block mb-2 lg:text-3xl">用餐日期</span>
          <div class="w-full">
            <button class="w-full pl-1 rounded-md text-left bg-white lg:py-2 lg:pl-2 lg:text-xl" @click.stop="toggleDate">{{ dataString }}</button>
          </div>
          <div v-show="showData" class="w-full aspect-square absolute bottom-[100%] rounded-xl flex flex-col bg-[rgba(233,233,233,0.9)] lg:py-1 2xl:aspect-[2/1]" @click.stop="() => '禁止關閉'">
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
                    <span class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-bold lg:text-lg">{{ n }}</span>
                  </span>
                </div>
              </div>
              <div class="w-2/3 flex flex-col justify-center">
                <span class="w-full h-fit text-center text-2xl mb-2 font-bold">日</span>
                <div class="w-full grow flex flex-wrap justify-between">
                  <span
                    v-for="(n, idx) in 31"
                    :key="n"
                    class="w-[16%] m-1 rounded-lg text-center relative bg-slate-100 hover:bg-slate-300"
                    :class="{
                      'bg-slate-300': idx === activeDIdx,
                    }"
                    @click.stop="focusD(idx)"
                  >
                    <span class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-bold lg:text-lg">{{ n }}</span>
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
        <span class="w-full text-sm mt-2 lg:text-base">可接受 1-6 位訂位（含大人與小孩），實際訂位請依各門市現場狀況安排。</span>
        <button class="w-fit py-1 px-2 mx-auto my-1 border border-black rounded-full lg:w-1/6 lg:text-2xl lg:my-10 lg:hover:bg-black lg:hover:text-white lg:transition-all" @click="comfirmBooking">確認預約訂位</button>
      </div>
    </div>
    <!-- <div class="w-1/3 h-1/3 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-slate-400"></div> -->
  </div>
</template>
<style scoped></style>
