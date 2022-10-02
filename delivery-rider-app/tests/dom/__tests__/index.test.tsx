import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Home, { Rider } from "../../../pages"
import { act } from "react-dom/test-utils"
import axios from "axios"

describe("Index Page", () => {
    describe("user modal", () => {
        test("Rider modal render", async () => {
            const { data }: { data: Rider } = await axios.get("http://localhost:3001/riders/1")
            render(<Home userCredentials={data} />)
            await act(() => {
                const modalToggleButton = screen.getByTestId("modalButton")
                fireEvent.click(modalToggleButton)
            })

            expect(screen.getByText(data.name)).toBeInTheDocument()
            expect(screen.getByText(data.email)).toBeInTheDocument()
            expect(screen.getByText(data.todayIncome)).toBeInTheDocument()
        })
        test("Rider avatar renders", async () => {
            const { data }: { data: Rider } = await axios.get("http://localhost:3001/riders/1")
            render(<Home userCredentials={data} />)
            await act(() => {
                const modalToggleButton = screen.getByTestId("modalButton")
                fireEvent.click(modalToggleButton)
            })
            expect(screen.getByTestId("modalProfile")).toBeInTheDocument()
        })
    })
})
