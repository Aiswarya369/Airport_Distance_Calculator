import React, { useContext } from "react";
import { Grid, Box } from "@mui/material";
import MapView from "../../components/MapView";
import SearchPanel from "../../components/SearchPanel";
import { AirportContext } from "src/context/AirportContextProvider";
// import axios from "axios";

interface Props {}

const Home: React.FC<Props> = () => {
  const { source, destination, setPlotRoute, setDistance } =
    useContext(AirportContext);

  // const getAllAirports = () => {
  //   const config = {
  //     url: `https://airlabs.co/api/v9/airports?country_code=US&api_key=0cb5f83d-1d96-4195-9f21-5dabbeb4a51e&_fields=name,iata_code,lat,lng`,
  //     method: "GET",
  //   };
  //   return axios(config);
  // };

  // React.useEffect(() => {
  //   setDistance(0);
  // getAllAirports().then((res: any) => setAirports(res?.data.response));
  // }, []);

  const handleGetDistance = () => {
    const service = new google.maps.DistanceMatrixService();
    setPlotRoute(true);
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(source.lat, source.lng), source.name],
        destinations: [
          new google.maps.LatLng(destination.lat, destination.lng),
          destination.name,
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: true,
        avoidTolls: true,
      },
      (response, status) => {
        if (status !== "OK") {
          console.log("Error");
        } else {
          let origins: any = response?.originAddresses;
          let element: any, distance: any, results: any;
          for (let i = 0; i < origins.length; i++) {
            results = response?.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
              element = results[j];
              distance = element.distance.value;
            }
          }
          setDistance(distance);
        }
      }
    );
  };

  return (
    <Box>
      <Grid container>
        <Grid item lg={5} xs={12}>
          <SearchPanel handleGetDistance={handleGetDistance} />
        </Grid>
        <Grid item lg={7} xs={12} sx={{ height: "100vh" }}>
          <MapView />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
