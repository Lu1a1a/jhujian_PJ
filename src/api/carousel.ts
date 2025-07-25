import axios from "axios";
const getCarouselImg = async () => {
  const { data } = await axios({
    method: "get",
    baseURL: "http://localhost:8000/",
    url: "/carousel",
  });
  return data.data;
};

export { getCarouselImg };
