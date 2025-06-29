import axios from "axios";
const getMapKey = async () => {
  const { data } = await axios({
    method: "get",
    baseURL: "http://localhost:8000/",
    url: "/mapKey",
  });
  return data.data;
};

export { getMapKey };
