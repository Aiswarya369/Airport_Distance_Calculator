import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../MapComponent";
import { AirportContext } from "src/context/AirportContextProvider";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapView: React.FC = () => {
  const [zoom, setZoom] = React.useState(5);
  const { source, destination, plotRoute } = React.useContext(AirportContext); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 39.023326727962036,
    lng: -101.56867938341637,
  });

React.useEffect(()=>{
console.log("Rerendering")
},[plotRoute])
  return (
    <Wrapper apiKey="AIzaSyBixWJX0eS4dmyWYF-7v27gnUJU1724ntw" render={render}>
      <Map
        center={center}
        zoom={zoom}
        style={{ flexGrow: "1", height: "100%" }}
      ></Map>
    </Wrapper>
  );
};

export default MapView;
