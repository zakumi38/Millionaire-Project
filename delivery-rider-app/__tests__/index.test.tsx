import Login from "../pages/login"
import { render } from "@testing-library/react"

describe("MyApp", () => {
    test("renders snapshot of app component", () => {
        const { getByText } = render(<Login />)
        expect(getByText("Login")).toBeInTheDocument()
    })
})
