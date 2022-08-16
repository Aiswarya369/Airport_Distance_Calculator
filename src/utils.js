export const calculateFlyingDistance = (
  sourecLat,
  sourecLng,
  destinationLat,
  destinationLng
) => {
  const latDiff = (sourecLat - destinationLat) * (Math.PI / 180);
  const lngDiff = (sourecLng - destinationLng) * (Math.PI / 180);
  const startLatRad = sourecLat * (Math.PI / 180);
  const endLatRad = destinationLat * (Math.PI / 180);

  const a =
    Math.sin(latDiff / 2) * Math.sin(Math.sin(latDiff / 2)) +
    Math.cos(startLatRad) *
      Math.cos(endLatRad) *
      Math.sin(lngDiff / 2) *
      Math.sin(lngDiff / 2);
  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;
  return (3440 * c).toFixed(2);
};

export const clearRoutesMarkers = (array) => {
  for (let arr of array) {
    arr.setMap(null);
  }
};
