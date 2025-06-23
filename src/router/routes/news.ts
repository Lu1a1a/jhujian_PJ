import news from "../../pages/news/news.vue";
import newsDetailType from "../../pages/news/newsDetailType.vue";
import newsType from "../../pages/news/newsType.vue";
import recruiting from "../../pages/news/recruiting.vue";
export default [
  {
    name: "news",
    path: "/news",
    component: news,
    children: [
      { path: ":type", name: "newsType", component: newsType },
      { path: "recruiting", name: "recruiting", component: recruiting },
    ],
  },
  {
    name: "newsDetail",
    path: "/news/:date/:id",
    component: newsDetailType,
  },
];
