import axios from "axios";

const API_URL = "https://devcamp-api-node.herokuapp.com/api/v1/";

const getBootcamp = () => {
  return axios.get(API_URL + "bootcamps");
};

export { getBootcamp };
