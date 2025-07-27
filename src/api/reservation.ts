import axios from "axios";
import { TOrderInfo } from "../type";
const reservationSchedule = async (reservationDate: string) => {
  const { data } = await axios({
    method: "get",
    url: "/api/reservation/schedule",
    params: {
      date: reservationDate,
    },
  });
  return data.data;
};

const reservationOrder = async (orderInfo: TOrderInfo) => {
  const { data } = await axios({
    method: "post",
    url: "/api/reservation",
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
  return data.data;
};

const reservationFind = async (phone: string) => {
  const { data } = await axios({
    method: "post",
    url: "/api/reservation/find",
    params: {
      phone: phone,
    },
  });
  return data.data;
};

const reservationOrderDel = async (id: number) => {
  await axios({
    method: "delete",
    url: "/api/reservation",
    params: {
      id: id,
    },
  });
};
export { reservationSchedule, reservationOrder, reservationFind, reservationOrderDel };
