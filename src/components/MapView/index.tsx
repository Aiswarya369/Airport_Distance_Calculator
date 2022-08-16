/* eslint-disable */
import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AirportContext } from "src/context/AirportContextProvider";
import { clearRoutesMarkers, getBounds, plotRoute } from "../../utils";

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Map: React.FC = () => {

  //approx United States Cordinates
  const defaultCordinates = {
    lat: 39.023326727962036,
    lng: -101.56867938341637,
  }; 

  const { source, destination, setDistance } = useContext(AirportContext);

  const ref = useRef<HTMLDivElement>(null);
  const sourceMarkers = useRef<any>([]);
  const destinationMarkers = useRef<any>([]);

  const [map, setMap] = useState<GoogleMap>();
  const routes = useRef<any>([]);

  const isSourceValid = source && source.lat && source.lng;
  const isDestinationValid = destination && destination.lat && destination.lng;

  useEffect(() => {
    if (!map) {
      if (ref.current) {
        setMap(
          new google.maps.Map(ref.current, {
            zoom: 4,
            center: defaultCordinates,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            rotateControl: false,
            fullscreenControl: false,
          })
        );
      }
    }
  }, [map]);

  useEffect(() => {
    if (isSourceValid) {
      addMarkerRoute(
        new google.maps.LatLng(Number(source.lat), Number(source.lng)),
        true
      );
    }
    if (isDestinationValid) {
      addMarkerRoute(
        new google.maps.LatLng(
          Number(destination.lat),
          Number(destination.lng)
        ),
        false
      );
    }
    if (!source || !destination) {
      setDistance(0);
      clearRoutesMarkers(routes.current);
      clearRoutesMarkers(destinationMarkers.current);
      clearRoutesMarkers(sourceMarkers.current);
    }
  }, [source, destination]);

  const addMarkerRoute = (location: GoogleLatLng, isSource: boolean): void => {
    if (isSource && source) {
      clearRoutesMarkers(sourceMarkers.current);
      const sMarker: GoogleMarker = new google.maps.Marker({
        position: location,
        label: {
          text: "A",
          color: "white",
        },
        title: source.name,
        map: map,
      });
      sourceMarkers.current.push(sMarker);
    }

    if (!isSource && destination) {
      clearRoutesMarkers(destinationMarkers.current);
      const dMarker: GoogleMarker = new google.maps.Marker({
        position: location,
        label: {
          text: "B",
          color: "white",
        },
        title: destination.name,
        map: map,
      });
      destinationMarkers.current.push(dMarker);
    }

    if (source && destination) {
      clearRoutesMarkers(routes.current);
      const line = plotRoute(source, destination, map);
      routes.current.push(line);
    }
    if (isSourceValid && isDestinationValid) {
      map?.fitBounds(getBounds(source, destination));
    }
  };

  return (
    <>
      <div ref={ref} style={{ flexGrow: "1", height: "100%" }} />
    </>
  );
};

const MapView: React.FC = () => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_API_KEY!}>
      <Map />
    </Wrapper>
  );
};

export default MapView;
