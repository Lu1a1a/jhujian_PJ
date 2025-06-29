import { getMapKey } from "../api";
const useMapScript = async () => {
  const apikey = await getMapKey();
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}&libraries=maps&loading=async`;
  script.async = true;
  document.head.appendChild(script);
};

export { useMapScript };
