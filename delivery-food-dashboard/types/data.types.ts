interface Coordinate {
    latitude: string
    longitude: string
}
interface Quantity {
    id: number
    quantity: number
}
interface previousPayments {
    date: string
    amount: number
}

interface Common {
    id: number
    createdDate: string
}
interface Customer extends Common {
    name: string
    phoneNumber: string
    email: string
    location: string
    coordinate: Coordinate
    password: string
    orders: Order[]
}

interface Rider extends Common {
    name: string
    email: string
    phoneNumber: string
    password: string
    todayIncome: number
    previousPayments: previousPayments[]
    photoUrl: string
    accessToken: string
    refreshToken: string
    completedOrders: Order[]
    currentOrder: Order
}
interface Food extends Common {
    name: string
    price: number
    description: string
    isAvailable: boolean
    shop: Shop
}
interface Order extends Common {
    customer: Customer
    rider: Rider
    currentOrder: Order
    foods: Food[]
    orderedItems: Quantity[]
    destination: string
    deliveryPercentage: number
    isCompleted: boolean
    isCanceled: boolean
}
interface Shop extends Common {
    name: string
    location: string
    latitudeLongitude: string
    foods: Food[]
}

export type { Customer, Rider, Food, Order, Shop }
