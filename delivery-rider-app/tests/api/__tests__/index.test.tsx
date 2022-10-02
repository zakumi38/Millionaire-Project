import "@testing-library/jest-dom"
import api from "../../../axios-api/axios"
import { render } from "@testing-library/react"
import Home, { Rider } from "../../../pages"

describe("MyApp", () => {
    test("mock api call", async () => {
        const { data, headers } = await api.post("/login", {
            email: "auagds23@gdma2sil.com",
            password: "Aung123"
        })
        expect(data).toHaveProperty("user")
    })
})
