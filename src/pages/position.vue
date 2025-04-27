<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { usePageCheckStore } from "../store/usePageCheck";
import pageFooter from "../components/common/footer.vue";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
const titleSw = ref(true);
const restaurantName = ref<string>("");
const route = useRoute();
let filterIcon: { icon: string; img: string; name: string }[] = [];
const logoIcon = ref("");
const data = ref([
  {
    icon: new URL("../assets/companyImg/3_20231219150840oktl6ywAh0.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_202312141600232q11ec8kJ0.jpg", import.meta.url).href,
    name: "築間幸福鍋物",
  },
  {
    icon: new URL("../assets/companyImg/3_20231219151249qwfwqwpUE0.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_2023121416101264v7o8xR94.jpg", import.meta.url).href,
    name: "燒肉smile",
  },
  {
    icon: new URL("../assets/companyImg/3_20231219151525koe6jjJOG1.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_20231214161548k7bc80KkT6.jpg", import.meta.url).href,
    name: "有之和牛",
  },
  {
    icon: new URL("../assets/companyImg/3_202312191517122jqvu4g2z2.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_20231214162200gsmaukIZr8.jpg", import.meta.url).href,
    name: "本格燒肉",
  },
  {
    icon: new URL("../assets/companyImg/3_20231219193822c5gamcWnZ0.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
    name: "築間酸菜魚",
  },
  {
    icon: new URL("../assets/companyImg/3_202409131151209ipcu7STK3.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
    name: "紫木槿韓餐酒館",
  },
  {
    icon: new URL("../assets/companyImg/3_202312191950595n7k6aYwP2.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_202312141600232q11ec8kJ0.jpg", import.meta.url).href,
    name: "紫木槿韓國烤肉",
  },
  {
    icon: new URL("../assets/companyImg/3_20240105111611zf6g89WEp0.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_20231219194216cbjy3khMQ1.jpg", import.meta.url).href,
    name: "絵馬別邸",
  },
  {
    icon: new URL("../assets/companyImg/3_202404161644191qucssBGv0.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
    name: "築間麻辣火鍋",
  },
  {
    icon: new URL("../assets/companyImg/3_20240726110350fxx27qKAX2.png", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_20231219195528hmcttpg8g3.jpg", import.meta.url).href,
    name: "築間燒肉本命",
  },
  {
    icon: new URL("../assets/companyImg/3_202407261128174vj74vY2y7.png", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_202312141631255wvo85cqV11.jpg", import.meta.url).href,
    name: "築間台灣鹽酥雞",
  },
  {
    icon: new URL("../assets/companyImg/3_20240918134734ygfkvqgqH0.png", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_202407051325403mvk03FH40.png", import.meta.url).href,
    name: "朴庶韓國銅盤烤肉",
  },
  {
    icon: new URL("../assets/companyImg/3_20240918134845oruiuh8UV1.png", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/3_20240913115334bs5ac4soC4.jpg", import.meta.url).href,
    name: "朴庶韓國烤肉公社",
  },
  {
    icon: new URL("../assets/companyImg/3_20250310174341u8andhVOt0.jpg", import.meta.url).href,
    img: new URL("../assets/companyImg/hoverImg/JhuJian__index_brand_01_750x850.jpg", import.meta.url).href,
    name: "芡芳石頭火鍋",
  },
]);
let center;
let map: google.maps.Map;
//@ts-ignore
let markers: google.maps.AdvancedMarkerElement[] = [];
async function initMap(name: string): Promise<void> {
  const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
  center = { lat: 23.6978, lng: 120.9605 };
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: center,
    zoom: 8,
    mapId: "DEMO_MAP_ID",
  });
  findPlaces(name);
}

async function findPlaces(name: string) {
  const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
  const request = {
    textQuery: name,
    fields: ["displayName", "location", "businessStatus"],
    includedType: "restaurant",
    locationBias: { lat: 23.6978, lng: 120.9605 },
    maxResultCount: 8,
    useStrictTypeFiltering: false,
  };
  //@ts-ignore
  const { places } = await Place.searchByText(request);

  if (places.length === 0) return;

  const { LatLngBounds } = (await google.maps.importLibrary("core")) as google.maps.CoreLibrary;
  const bounds = new LatLngBounds();
  places.forEach((place) => {
    const markerView = new AdvancedMarkerElement({
      map,
      position: place.location,
      title: place.displayName,
    });
    markers.push(markerView);
    bounds.extend(place.location as google.maps.LatLng);
  });
  map.fitBounds(bounds);
}

onBeforeRouteUpdate((to) => {
  restaurantName.value = to.query.name as string;
  findPlaces(restaurantName.value);
  filterIcon = data.value.filter((item) => {
    return item.name === to.query.name;
  });
  logoIcon.value = filterIcon[0].icon;
});

onMounted(() => {
  checkRoute()
  filterIcon = data.value.filter((item) => {
    return item.name === route.query.name;
  });
  logoIcon.value = filterIcon[0].icon;
  restaurantName.value = route.query.name as string;
  initMap(restaurantName.value);
});
</script>
<template>
  <div class="w-full">
    <div class="w-full h-screen relative">
    <div class="w-full aspect-square absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] mx-auto lg:w-4/5 lg:h-4/5">
      <div class="w-full mb-5 flex gap-3 justify-center items-center">
        <img class="w-11 lg:w-14 2xl:w-20" :src="logoIcon" />
        <div v-show="titleSw" class="font-bold text-center tracking-widest text-xl 2xl:text-4xl">{{ route.query.name }}據點</div>
      </div>
      <div id="map" class="h-full"></div>
    </div>
    </div>
    <pageFooter />
  </div>
</template>
<style scoped>
fade-enter-from,
fade-leave-to {
  opacity: 0;
}
fade-enter-to,
fade-leave-from {
  opacity: 1;
}
fade-enter-active,
fade-leave-active {
  transition: opacity 1s;
}
.loading :first-child {
  background: conic-gradient(#777676 0% 33%, transparent 33% 100%);
  animation: spin 2s infinite linear;
}
.loading :last-child {
  background-image: url("../../assets/img/JhuJian__background.jpg");
}
@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
