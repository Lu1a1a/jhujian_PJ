import axios, { AxiosError } from "axios";
const getCarouselImg = async () => {
  try {
    const { data } = await axios({
      method: "get",
      baseURL: "http://localhost:8000/",
      url: "/carousel",
    });
    return data.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export { getCarouselImg };
