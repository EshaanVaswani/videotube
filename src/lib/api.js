import axios from "axios";

import { HOST } from "@/constants";

export const api = axios.create({
   baseURL: `${HOST}/api/v1`,
   withCredentials: true,
});
