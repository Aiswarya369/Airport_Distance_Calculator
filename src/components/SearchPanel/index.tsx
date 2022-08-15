import React, { useContext } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import airplaneIcon from "../../assets/pngIcons/airplaneIcon.png";
import locationIcon from "../../assets/pngIcons/locationIcon.png";
import axios from "axios";
import { AirportContext } from "src/context/AirportContextProvider";

interface Props {
  minDistance?: any;
  handleGetDistance?: any;
}

const SearchPanel: React.FC<Props> = ({ minDistance, handleGetDistance }) => {
  const { setSource, setDestination, setPlotRoute } =
    useContext(AirportContext);
  const [airports, setAirports] = React.useState<any>([]);
  const getAllAirports = () => {
    const config = {
      url: `https://airlabs.co/api/v9/airports?country_code=US&api_key=0cb5f83d-1d96-4195-9f21-5dabbeb4a51e&_fields=name,iata_code,lat,lng`,
      method: "GET",
    };
    return axios(config);
  };

  React.useEffect(() => {
    getAllAirports().then((res: any) => setAirports(res?.data.response));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Box style={{ backgroundColor: "#1A73E8" }}>
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
          sx={{ height: "100%", marginTop: 8 }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <img src={locationIcon} alt="source" height="36" />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={airports}
              autoHighlight
              getOptionLabel={(option: any) =>
                option.iata_code + "-" + option.name
              }
              onChange={(event, newValue) => {
                setSource(newValue);
              }}
              selectOnFocus
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Source Airport" />
              )}
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <img src={locationIcon} alt="destination" height="36" />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={airports}
              autoHighlight
              getOptionLabel={(option: any) =>
                option.iata_code + "-" + option.name
              }
              onChange={(event, newValue) => {
                setDestination(newValue);
              }}
              selectOnFocus
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Destination Airport" />
              )}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              handleGetDistance();
           
            }}
          >
            Get Distance
          </Button>

          <Typography
            style={{ fontSize: "22px", fontWeight: "bold", marginTop: 60 }}
          >
            Driving Distance :{" "}
            <span style={{ fontSize: "22px", color: "#FF0101" }}>
              {(Number(minDistance) * 0.00054).toFixed(2).toLocaleString()} NM
            </span>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchPanel;
