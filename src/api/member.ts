import axios from "axios";
const getMemberInfo = async (token: string) => {
  const { data } = await axios({
    method: "get",
    url: "/api/member",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export { getMemberInfo };
