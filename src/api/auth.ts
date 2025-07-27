import axios from "axios";
import { TMemberInfo } from "../type";
const memberRegister = async (registerInfo: TMemberInfo) => {
  const { data } = await axios({
    method: "post",
    url: "/api/member/register",
    data: {
      firstName: registerInfo.firstName,
      lastName: registerInfo.lastName,
      phone: registerInfo.phone,
      mail: registerInfo.mail,
      password: registerInfo.password,
    },
  });
  return data.data;
};

const memberLogin = async (memberInfo: TMemberInfo) => {
  const { data } = await axios({
    method: "post",
    url: "/api/member/login",
    data: {
      phone: memberInfo.phone,
      password: memberInfo.password,
    },
  });
  return data.data;
};

export { memberRegister, memberLogin };
