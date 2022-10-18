import React from "react"
import type { Customer, Rider, Order, Food, Shop } from "types/data.types"

interface inputProps {
    children?: JSX.Element
    headerData: string[]
    bodyData: {
        customers?: Customer[]
        riders?: Rider[]
        orders?: Order[]
        foods?: Food[]
        shops?: Shop[]
    }
}
export default inputProps
