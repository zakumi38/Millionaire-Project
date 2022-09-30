import Login from "../../../pages/login"
import { jest } from "@jest/globals"
import "@testing-library/jest-dom"
import api from "../../../axios-api/axios"

describe("MyApp", () => {
    test("mock api call", async () => {
        const { data, headers } = await api.post("/login", {
            email: "auagds23@gdma2sil.com",
            password: "Aung123",
        })
        expect(data).toHaveProperty("user")
    })
})
