import React from "react";
import { Grid, Box } from "@mui/material";
import MapView from "../../components/MapView";
import SearchPanel from "../../components/SearchPanel";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={5}>
          <SearchPanel />
        </Grid>
        <Grid item xs={12}>
          <MapView />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
