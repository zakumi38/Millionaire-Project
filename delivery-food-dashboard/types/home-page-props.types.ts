import type { Customer, Rider, Order, Food, Shop } from "types/data.types"

interface HomePageProps {
    customers?: Customer[]
    riders?: Rider[]
    orders?: Order[]
    foods?: Food[]
    shops?: Shop[]
}
export type { HomePageProps }
