import { useEffect } from "react"
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { useMap } from "react-leaflet"

interface locations {
    latitude: number
    longitude: number
}
let count = 0
export default function RoutingConfig({ latitude, longitude }: locations) {
    const map = useMap()
    useEffect(() => {
        if (map !== null || count) {
            const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(latitude, longitude),
                    L.latLng(latitude - 0.0002, longitude - 0.0002),
                ],
                routeWhileDragging: true,
            }).addTo(map)
        }
        count = 1
    }, [map, latitude, longitude])

    return null
}
