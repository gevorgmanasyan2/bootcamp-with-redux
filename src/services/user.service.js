import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "https://devcamp-api-node.herokuapp.com/api/v1/";

const getBootcamp = () => {
  return axios.get(API_URL + "bootcamps");
};

export
{
  getBootcamp, 
}

