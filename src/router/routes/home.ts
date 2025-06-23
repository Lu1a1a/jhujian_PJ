import home from "../../pages/home/home.vue";
import newsCarouselType from "../../pages/home/newsCarouselType.vue";
export default [
  {
    name: "home",
    path: "/home",
    component: home,
    children: [
      {
        name: "newsCarouselType",
        path: ":type",
        component: newsCarouselType,
      },
    ],
  },
];
