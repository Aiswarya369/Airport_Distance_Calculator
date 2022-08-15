import React, { useContext } from "react";
import { AirportContext } from "src/context/AirportContextProvider";
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  zoom?: any;
  center?: any;
}

const Map: React.FC<MapProps> = ({ style, zoom, center }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const { source, destination, plotRoute ,setPlotRoute} = useContext(AirportContext);

  function calculateAndDisplayRoute() {
    const request: any = {
      origin: source,
      destination: destination,
      travelMode: "DRIVING",
    };
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
        setPlotRoute(false)
      }
    });
  }

  React.useEffect(() => {
    console.log("Rerendering",plotRoute)
    if (ref.current) {
      directionsRenderer.setMap(
        new window.google.maps.Map(ref.current, {
          zoom,
          center,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
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
