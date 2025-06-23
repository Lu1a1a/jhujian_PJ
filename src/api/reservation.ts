import axios from "axios";
import { TOrderInfo } from "../type";
const reservationSchedule = async (reservationDate: string) => {
  const { data } = await axios({
    method: "get",
    baseURL: "http://localhost:8000/",
    url: "/reservation/schedule",
    params: {
      date: reservationDate,
    },
  });
  return data;
};

const reservationOrder = async (orderInfo: TOrderInfo) => {
  const { data } = await axios({
    method: "post",
    baseURL: "http://localhost:8000/",
    url: "/reservation",
    data: {
      adult: orderInfo.adult,
      child: orderInfo.child,
      date: orderInfo.date,
      time: orderInfo.time,
      firstName: orderInfo.firstName,
      lastName: orderInfo.lastName,
      phone: orderInfo.phone,
    },
  });
  return data;
};

const reservationFind = async (phone: string) => {
  const { data } = await axios({
    method: "post",
    baseURL: "http://localhost:8000/",
    url: "/reservation/find",
    params: {
      phone: phone,
    },
  });
  return data;
};

const reservationOrderDel = async (id: number) => {
  await axios({
    method: "delete",
    baseURL: "http://localhost:8000/",
    url: "/reservation",
    params: {
      id: id,
    },
  });
};
export { reservationSchedule, reservationOrder, reservationFind, reservationOrderDel };
