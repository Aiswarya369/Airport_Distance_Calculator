import React, { useContext, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import MapView from "../../components/MapView";
import SearchPanel from "../../components/SearchPanel";
import { AirportContext } from "src/context/AirportContextProvider";

interface Props {}

const Home: React.FC<Props> = () => {
  const { setDistance, setSource, setDestination } = useContext(AirportContext);

  useEffect(() => {
    setDistance({ d: 0, comment: "" });
    setSource({ name: "", lat: "", lng: "" });
    setDestination({ name: "", lat: "", lng: "" });
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid item lg={5} xs={12}>
          <SearchPanel />
        </Grid>
        <Grid item lg={7} xs={12} sx={{ height: "100vh" }}>
          <MapView />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
