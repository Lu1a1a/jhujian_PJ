<script setup lang="ts"></script>
<template>
  <div id="memberLogin" class="w-full my-10 md:my-20 xl:my-24">
    <div class="w-[90%] mx-auto flex flex-col justify-center md:w-4/5 md:flex-row">
      <div class="w-full md:w-2/5">
        <img src="../../assets/img/memberPage/member_private_bg.jpg" class="w-full h-full object-contain" />
      </div>
      <div class="w-full px-10 my-5 md:w-3/5 md:px-20">
        <div class="w-full">
          <span class="block text-2xl font-extralight lg:text-3xl xl:text-5xl">
            會員/隱私權條款
            <span class="block tracking-wider md:inline">Terms and Privacy of Member</span>
          </span>
        </div>
        <div class="w-full my-10 lg:my-12 xl:my-20">
          <span class="block">
            會員條款：
            <span class="block lg:inline">https://ocard.co/terms</span>
          </span>
          <span class="block">
            隱私權條款：
            <span class="block lg:inline">https://ocard.co/privacy</span>
          </span>
        </div>
        <div class="w-full pt-5 mt-5 border-t-4 border-gray-300 md:pt-10 md:mt-10">
          <div class="w-full">
            <div class="w-full">
              <div
                class="w-fit my-2 relative z-10 font-medium after:w-full after:h-1/2 after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-300 after:opacity-50"
              >
                Become Our Member
              </div>
              <div class="w-fit my-2 font-medium lg:text-2xl">立即加入會員</div>
              <div class="w-fit my-2 text-sm font-light">享有築間會員權益，以及不定期好禮送給您</div>
            </div>
            <div class="max-w-xl my-7 flex gap-2">
              <div class="w-1/2 lg:w-1/3">
                <span class="text-lg xl:text-xl">姓 FirstName</span>
                <input
                  type="text"
                  placeholder="輸入姓氏"
                  class="w-full px-2 py-1 mt-1 rounded-lg focus:outline-none md:py-2"
                />
              </div>
              <div class="w-1/2 lg:w-2/3">
                <span class="text-lg xl:text-xl">名 LastName</span>
                <input
                  type="text"
                  placeholder="輸入名字"
                  class="w-full px-2 py-1 mt-1 rounded-lg focus:outline-none md:py-2"
                />
              </div>
            </div>
            <div class="max-w-xl my-7">
              <span class="text-lg xl:text-xl">電話 Number</span>
              <input
                type="tel"
                placeholder="輸入電話"
                class="block w-full px-2 py-1 mt-1 rounded-lg focus:outline-none md:py-2"
              />
            </div>
            <div class="max-w-xl my-7">
              <span class="text-lg xl:text-xl">信箱 Mail</span>
              <input
                type="email"
                placeholder="輸入信箱"
                class="block w-full px-2 py-1 mt-1 rounded-lg focus:outline-none md:py-2"
              />
            </div>
            <button
              class="max-w-xl w-full py-2 relative z-10 rounded-lg text-base text-white bg-black overflow-hidden after:w-full after:h-full after:absolute after:bottom-0 after:right-0 after:-z-10 after:bg-yellow-300 after:opacity-50 after:translate-x-[-100%] after:transition-transform after:duration-500 hover:after:translate-x-0 xl:text-xl"
            >
              加入會員 JOIN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
