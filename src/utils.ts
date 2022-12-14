/*global google*/
import { GoogleMarker, GooglePolyLine ,ICordsData, GoogleMap} from "./types";
// Function to calculate the distance in nautical miles
export const calculateFlyingDistance = (
  sourceLat: number,
  sourceLng: number,
  destinationLat: number,
  destinationLng: number
) => {
  const R = 3440; //Earth mean radius in nautical miles
  //Distance between latitudes and longitudes
  const latDifference = (sourceLat - destinationLat) * (Math.PI / 180);
  const lngDifference = (sourceLng - destinationLng) * (Math.PI / 180);

  //Convert to Radians
  const sourceLatRad = sourceLat * (Math.PI / 180);
  const destinationRad = destinationLat * (Math.PI / 180);

  // Haversine formula
  const a =
    Math.sin(latDifference / 2) * Math.sin(Math.sin(latDifference / 2)) +
    Math.cos(sourceLatRad) *
      Math.cos(destinationRad) *
      Math.sin(lngDifference / 2) *
      Math.sin(lngDifference / 2);
  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;
  return (R * c).toFixed(2);
};

//To clear previous routes and markers
export const clearRoutesMarkers = (
  array: Array<GoogleMarker | GooglePolyLine>
) => {
  for (let arr of array) {
    arr.setMap(null);
  }
};

//To set boundaries of map based on markers
export const getBounds = (source: ICordsData, destination: ICordsData) => {
  const bounds = new google.maps.LatLngBounds();
  bounds.extend({ lat: Number(source.lat), lng: Number(source.lng) });
  bounds.extend({
    lat: Number(destination.lat),
    lng: Number(destination.lng),
  });
  return bounds;
};

// To plot the route between points
export const plotRoute = (source: ICordsData, destination: ICordsData, map: GoogleMap) => {
  return new google.maps.Polyline({
    geodesic: true,
    path: [
      { lat: Number(source.lat), lng: Number(source.lng) },
      { lat: Number(destination.lat), lng: Number(destination.lng) },
    ],
    icons: [
      {
        icon: {
          path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
        },
      },
    ],
    map: map,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
};
