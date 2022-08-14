import React from "react";
import { Box, Stack, TextField, Autocomplete, Typography } from "@mui/material";
import airplaneIcon from "../../assets/pngIcons/airplaneIcon.png";
import locationIcon from "../../assets/pngIcons/locationIcon.png";

interface Props {}

const SearchPanel: React.FC<Props> = ({}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Box style={{ height: 200, backgroundColor: "#1A73E8" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: "100%" }}
          >
            <img src={airplaneIcon} alt="airplane" width="200" />
            <Typography sx={{ color: "white", fontSize: "32px" }}>
              US AIRPORT <br /> DISTANCE CALCULATOR
            </Typography>
          </Stack>
        </Box>
        <Stack
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ height: 200 }}
        >
          <Stack direction="row"  justifyContent="center"
          alignItems="center" spacing={2} >
            <img src={locationIcon} alt="source" height="36"/>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Source Airport" />
              )}
            />
          </Stack>

          <Stack direction="row"  justifyContent="center"
          alignItems="center" spacing={2} >
            <img src={locationIcon} alt="destination" height="36"/>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Destination Airport" />
              )}
            />
          </Stack>
        </Stack>
        <div></div>
      </Stack>
    </Box>
  );
};

export default SearchPanel;
