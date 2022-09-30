import Login from "../../../pages/login"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Login Page", () => {
    test("login component", () => {
        const { container } = render(<Login />)
        expect(container).toBeInTheDocument()
    })
})
