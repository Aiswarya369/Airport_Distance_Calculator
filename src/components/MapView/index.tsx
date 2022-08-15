import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../MapComponent";
import { CircularProgress, Stack } from "@mui/material";

const render = (status: Status) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
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
