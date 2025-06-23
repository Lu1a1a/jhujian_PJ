import notFoundPage from "../../pages/notFoundPage.vue";
export default [
  { path: "/", redirect: "/home/allNews" },
  {
    name: "notFound",
    path: "/:pathMatch(.*)*",
    component: notFoundPage,
  },
];
