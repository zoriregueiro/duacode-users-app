import axios from "axios"

export const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres_ccf25f0acf1c42b3b45987e87ec37c50",
  },
})