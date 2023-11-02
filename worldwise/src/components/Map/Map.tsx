import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LatLngExpression } from "leaflet";
import { useCitiesContext } from "@/contexts";
import { Button, Spinner } from "@/components";
import { useGeolocation } from "@/hooks";
import styles from "@/components/Map/Map.module.css";

const CenterHandler = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();

  map.setView(position);

  return null;
};

const ClickHandler = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
};

const defaultPosition = { lat: 53.770226, lng: 20.490189 } as LatLngExpression;

export const Map = () => {
  const [position, setPosition] = useState<LatLngExpression>(defaultPosition);
  const { cities, currentCity, isLoading } = useCitiesContext();
  const [searchParams] = useSearchParams();
  const {
    getPosition: getMyPosition,
    isLoading: isMyPositionLoading,
    position: myPosition,
  } = useGeolocation();
  const params = new URLSearchParams(searchParams);
  const { lat, lng } = Object.fromEntries(params.entries());

  useEffect(() => {
    if (lat && lng) {
      setPosition({
        lat: Number(lat),
        lng: Number(lng),
      } as LatLngExpression);
    } else {
      setPosition(
        currentCity?.position || cities?.[0]?.position || defaultPosition
      );
    }
  }, [currentCity, cities, lat, lng]);

  useEffect(() => {
    if (myPosition) {
      setPosition(myPosition);
    }
  }, [myPosition]);

  return (
    <div className={styles.mapContainer}>
      {isLoading && !cities?.length ? (
        <Spinner />
      ) : (
        <>
          {JSON.stringify(position) !== JSON.stringify(myPosition) && (
            <Button styleType="position" onClick={getMyPosition}>
              {isMyPositionLoading ? "Loading..." : "Use my current position"}
            </Button>
          )}
          <MapContainer
            className={styles.map}
            center={position}
            zoom={6}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {myPosition && (
              <Marker position={myPosition}>
                <Popup>
                  <span>📍</span>
                  <span>Your current position</span>
                </Popup>
              </Marker>
            )}
            {cities?.map(({ id, cityName, emoji, position: { lat, lng } }) => (
              <Marker key={id} position={[lat, lng]}>
                <Popup>
                  <span>{emoji}</span>
                  <span>{cityName}</span>
                </Popup>
              </Marker>
            ))}
            <CenterHandler position={position} />
            <ClickHandler />
          </MapContainer>
        </>
      )}
    </div>
  );
};
