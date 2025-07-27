import axios from "axios";
const getCarouselImg = async () => {
  const { data } = await axios({
    method: "get",
    url: "/api/carousel",
  });
  return data.data;
};

export { getCarouselImg };
