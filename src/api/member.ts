import axios from "axios";
const getMemberInfo = async (token: string) => {
  const { data } = await axios({
    method: "get",
    baseURL: "http://localhost:8000/",
    url: "/member",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { getMemberInfo };
