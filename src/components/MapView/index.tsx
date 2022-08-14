import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../MapComponent"

interface Props{
  directionChange:any
}

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapView: React.FC<Props> = ({directionChange}) => {

  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };
  return (
    <Wrapper apiKey="AIzaSyBixWJX0eS4dmyWYF-7v27gnUJU1724ntw" render={render}>
    <Map
      center={center}
      onClick={onClick}
      onIdle={onIdle}
      zoom={zoom}
      style={{ flexGrow: "1", height: "100%" }}
      directionChange={directionChange}
    ></Map>
  </Wrapper>
  );
};





export default MapView;
