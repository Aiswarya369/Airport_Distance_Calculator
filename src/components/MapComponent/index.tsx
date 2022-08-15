import React from "react";
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  directionChange?: any;
  zoom?: any;
  center?: any;
}

const Map: React.FC<MapProps> = ({ style, directionChange, zoom, center }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  function calculateAndDisplayRoute() {
    var start = "chicago, il";
    var end = "barstow, ca";
    var request: any = {
      origin: start,
      destination: end,
      travelMode: "DRIVING",
    };
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }

  React.useEffect(() => {
    if (ref.current) {
      directionsRenderer.setMap(
        new window.google.maps.Map(ref.current, {
          zoom,
          center,
        })
      );
    }
  }, [ref]);

  return (
    <>
      <div ref={ref} style={style} />
    </>
  );
};

export default Map;
