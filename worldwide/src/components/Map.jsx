import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getFlag } from "../utils/flag";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const Flag = getFlag(city.country); // ✅ correct place

          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <div
                  style={{ display: "flex", gap: "6px", alignItems: "center" }}
                >
                  {Flag && <Flag style={{ width: "20px" }} />}
                  <span>{city.cityName}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
