import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.254.2.34:3333",
    timeout: 700,
})