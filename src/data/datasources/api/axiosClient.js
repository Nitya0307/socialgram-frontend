import axios from "axios";

import {
  APP_CONFIG,
} from "../../../core/config/apiConfig";

const axiosClient = axios.create({

  baseURL:
    APP_CONFIG.API_BASE_URL,
});

export default axiosClient;