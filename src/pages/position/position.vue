<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { usePageCheckStore } from "../../store/usePageCheck";
import pageFooter from "../../components/common/footer.vue";
import { useCarouselImg } from "../../store/useCarouselImg.ts";
const pageCheckStore = usePageCheckStore();
const { checkRoute } = pageCheckStore;
const titleSw = ref(true);
const restaurantName = ref<string>("");
const route = useRoute();
let filterIcon: any = [];
const logoIcon = ref("");
const carouselImg = useCarouselImg();
const { carouselImgArr } = storeToRefs(carouselImg);
const brandIconImg = carouselImgArr.value.filter((item: any) => {
  const { 2: type, 3: folder } = item.path.split("/");
  return type === "brandCarousel" && folder === "brandIcon";
});
const data = ref([
  {
    icon: `../../assets/img${brandIconImg[0].path}`,
    name: "芡芳石頭火鍋",
  },
  {
    icon: `../../assets/img${brandIconImg[1].path}`,
    name: "絵馬別邸",
  },
  {
    icon: `../../assets/img${brandIconImg[2].path}`,
    name: "本格燒肉",
  },
  {
    icon: `../../assets/img${brandIconImg[3].path}`,
    name: "燒肉本命",
  },
  {
    icon: `../../assets/img${brandIconImg[4].path}`,
    name: "築間台灣鹽酥雞",
  },
  {
    icon: `../../assets/img${brandIconImg[5].path}`,
    name: "築間幸福鍋物",
  },
  {
    icon: `../../assets/img${brandIconImg[6].path}`,
    name: "築間酸菜魚",
  },
  {
    icon: `../../assets/img${brandIconImg[7].path}`,
    name: "朴庶韓國烤肉公社",
  },
  {
    icon: `../../assets/img${brandIconImg[8].path}`,
    name: "朴庶韓國銅盤烤肉",
  },
  {
    icon: `../../assets/img${brandIconImg[9].path}`,
    name: "燒肉smile",
  },
  {
    icon: `../../assets/img${brandIconImg[10].path}`,
    name: "有之和牛",
  },
  {
    icon: `../../assets/img${brandIconImg[11].path}`,
    name: "紫木槿韓國烤肉",
  },
  {
    icon: `../../assets/img${brandIconImg[12].path}`,
    name: "紫木槿韓餐酒館",
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
  checkRoute();
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
      <div
        class="w-full aspect-square absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] mx-auto lg:w-4/5 lg:h-4/5"
      >
        <div class="w-full mb-5 flex gap-3 justify-center items-center">
          <img class="w-11 lg:w-14 2xl:w-20" :src="logoIcon" />
          <div v-show="titleSw" class="font-bold text-center tracking-widest text-xl 2xl:text-4xl">
            {{ route.query.name }}據點
          </div>
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
