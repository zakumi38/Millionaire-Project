import axios, { AxiosInstance } from "axios"

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001" as const,
})

export default api
