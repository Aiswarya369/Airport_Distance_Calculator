import React, { useContext } from "react";
import { AirportContext } from "src/context/AirportContextProvider";
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
        setPlotRoute(false);
      }
    });
  }

  React.useEffect(() => {
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
    }
    calculateAndDisplayRoute();
  }, [plotRoute]);

  return (
    <>
      <div ref={ref} style={style} />
    </>
  );
};

export default Map;
