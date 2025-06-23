import axios from "axios";
const getWeather = async () => {
  const data = await axios({
    method: "get",
    url: "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-07B7EC45-CEE1-4AEA-B4CD-6754E5B6D36C&locationName=&elementName=Wx",
  });
  return data;
};

export { getWeather };
