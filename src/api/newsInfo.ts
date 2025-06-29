import axios from "axios";
const getNewsInfo = async (type: string, size: number) => {
  const { data } = await axios({
    method: "get",
    baseURL: "http://localhost:8000/",
    url: "/newsInfo",
    params: {
      category: type,
      size: size,
    },
  });
  return data.data;
};
const getNewsDetailInfo = async (newsId: string) => {
  const { data } = await axios({
    method: "get",
    baseURL: "http://localhost:8000/",
    url: "/newsDetailInfo",
    params: {
      id: newsId,
    },
  });
  return data.data;
};

export { getNewsInfo, getNewsDetailInfo };
