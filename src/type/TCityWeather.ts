export type TCityWeather = {
  locationName: string;
  weatherElement: {
    elementName: string;
    time: {
      startTime: string;
      endTime: string;
      parameter: {
        parameterName: string;
        parameterValue: string;
      };
    }[];
  }[];
};
