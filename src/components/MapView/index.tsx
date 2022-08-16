/* eslint-disable */
import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AirportContext } from "src/context/AirportContextProvider";
import { clearRoutesMarkers } from "../../utils";

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Map: React.FC = () => {
  const defaultCordinates = {
    lat: 39.023326727962036,
    lng: -101.56867938341637,
  }; //approx United States Cordinates
  const { source, destination } = useContext(AirportContext);
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const routes = useRef<any>([]);
  const sourceMarkers = useRef<any>([]);
  const destinationMarkers = useRef<any>([]);

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
    if (source && source.lat && source.lng) {
      addMarker(
        new google.maps.LatLng(Number(source.lat), Number(source.lng)),
        true
      );
    }
    if (destination && destination.lat && destination.lng) {
      addMarker(
        new google.maps.LatLng(
          Number(destination.lat),
          Number(destination.lng)
        ),
        false
      );
    }
    if (!source || !destination) {
      clearRoutesMarkers(routes.current);
      clearRoutesMarkers(destinationMarkers.current);
      clearRoutesMarkers(sourceMarkers.current);
    }
  }, [source, destination]);

  const addMarker = (location: GoogleLatLng, isSource: boolean): void => {
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
      clearRoutesMarkers(sourceMarkers.current);
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
      clearRoutesMarkers(destinationMarkers.current);
      destinationMarkers.current.push(dMarker);
    }

    if (source && destination) {
      clearRoutesMarkers(routes.current);
      const line = new google.maps.Polyline({
        geodesic: true,
        path: [
          { lat: Number(source.lat), lng: Number(source.lng) },
          { lat: Number(destination.lat), lng: Number(destination.lng) },
        ],
        map: map,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      clearRoutesMarkers(routes.current);
      routes.current.push(line);
    }
    if (
      source &&
      source.lat &&
      source.lng &&
      destination &&
      destination.lat &&
      destination.lng
    ) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({ lat: Number(source.lat), lng: Number(source.lng) });
      bounds.extend({
        lat: Number(destination.lat),
        lng: Number(destination.lng),
      });
      map?.fitBounds(bounds);
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
