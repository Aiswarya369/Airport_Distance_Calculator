import React from "react";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { deepEqual } from "fast-equals";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  directionChange?: any;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  directionChange,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
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
        console.log(result);
        directionsRenderer.setDirections(result);
      }
    });
  }

  React.useEffect(() => {
    if (ref.current && !map) {
      directionsRenderer.setMap(new window.google.maps.Map(ref.current, {}));
      calculateAndDisplayRoute();
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
    </>
  );
};

const deepCompareEqualsForMaps = (a: any, b: any) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  return deepEqual(a, b);
};

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();
  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default Map;
