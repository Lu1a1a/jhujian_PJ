import axios from "axios";
const getMapKey = async () => {
  const { data } = await axios({
    method: "get",
    url: "/api/mapKey",
  });
  return data.data;
};

export { getMapKey };
