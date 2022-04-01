import axios from "axios";

const fetchRegionPumps = async (regionId) => {
  const baseURL = "https://carburanti.mise.gov.it/ospzApi/search/area";
  const params = JSON.stringify({
    region: regionId,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(baseURL, params, config);

  return response.data.results;
};

export default fetchRegionPumps;
