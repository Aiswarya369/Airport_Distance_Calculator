import React from "react";
import { Grid, Box } from "@mui/material";
import MapView from "../../components/MapView";
import SearchPanel from "../../components/SearchPanel";


interface Props {}

const Home: React.FC<Props> = () => {
  const [directionChange,setDirectionChange] = React.useState<boolean>(false)


  return (
    <Box>
      <Grid container>
        <Grid item xs={5}>
          <SearchPanel />
        </Grid>
        <Grid item xs={7} sx={{height:'100vh'}}>
          <MapView />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
