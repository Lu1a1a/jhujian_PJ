export type TOrderInfo = {
  adult: number;
  child: number;
  date: string;
  firstName: string;
  lastName: string;
  phone: string;
  time: string;
};
export type TBookingOrder = {
  adult_count: number;
  child_count: number;
  first_name: string;
  id: number;
  last_name: string;
  member_id: number | null;
  phone_number: string;
  date: string;
  time: string;
  state: string | null;
};
