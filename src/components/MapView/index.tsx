import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { useContext } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { AirportContext } from "src/context/AirportContextProvider";

const render = (status: Status) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
}

const Map: React.FC<MapProps> = ({ style }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const { source, destination, plotRoute, setPlotRoute } =
    useContext(AirportContext);

  function calculateAndDisplayRoute() {
    const request: any = {
      origin: source.name,
      destination: destination.name,
      travelMode: "DRIVING",
    };
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
       
      }
    });
  }

  React.useEffect(() => {
    console.log("Re-rendering");
    if (ref.current) {
      directionsRenderer.setMap(
        new window.google.maps.Map(ref.current, {
          zoom: 5,
          center: {
            lat: 39.023326727962036,
            lng: -101.56867938341637,
          },
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
        })
      );
      calculateAndDisplayRoute();
      setPlotRoute(false);
    }
  }, [ref, plotRoute]);

  return (
    <>
      <div ref={ref} style={style} />
    </>
  );
};

const MapView: React.FC = () => {
  return (
    <Wrapper apiKey="AIzaSyBixWJX0eS4dmyWYF-7v27gnUJU1724ntw" render={render}>
      <Map style={{ flexGrow: "1", height: "100%" }}></Map>
    </Wrapper>
  );
};

export default MapView;
