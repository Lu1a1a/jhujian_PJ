import axios from "axios";
import { TMemberInfo } from "../type";
const memberRegister = async (registerInfo: TMemberInfo) => {
  const { data } = await axios({
    method: "post",
    baseURL: "http://localhost:8000/",
    url: "/member/register",
    data: {
      firstName: registerInfo.firstName,
      lastName: registerInfo.lastName,
      phone: Number(registerInfo.phone),
      mail: registerInfo.mail,
      password: registerInfo.password,
    },
  });
  return data.data;
};

const memberLogin = async (memberInfo: TMemberInfo) => {
  const { data } = await axios({
    method: "post",
    baseURL: "http://localhost:8000/",
    url: "/member/login",
    data: {
      phone: Number(memberInfo.phone),
      password: memberInfo.password,
    },
  });
  return data.data;
};

export { memberRegister, memberLogin };
