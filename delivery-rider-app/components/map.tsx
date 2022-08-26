import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import RoutingConfig from "./routing"

interface locations {
    latitude: number
    longitude: number
}

const Map = ({ latitude, longitude }: locations) => {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: "calc(100% - 60px)", width: "100vw" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RoutingConfig {...{ latitude, longitude }} />
        </MapContainer>
    )
}

export default Map
