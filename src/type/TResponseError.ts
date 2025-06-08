export type TResError = {
  success: boolean;
  data: {
    [key: string]: string | number | string[] | number[];
  };
  msg: string;
};
