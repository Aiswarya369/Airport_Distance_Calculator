import React from "react";
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

const SearchPanel: React.FC = () => {
  const [minDistance, setMinDistance] = React.useState<any>(0);
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    axios
      .get(
        `https://airlabs.co/api/v9/airports?country_code=US&api_key=0cb5f83d-1d96-4195-9f21-5dabbeb4a51e&_fields=name,iata_code,lat,lng`
      )
      .then((response) => {
        setData(response?.data.response);
      });
  }, []);

  const handleGetDistance = () => {
    var origin1 = new google.maps.LatLng(55.930385, -3.118425);
    var origin2 = "Greenwich, England";
    var destinationA = "Stockholm, Sweden";
    var destinationB = new google.maps.LatLng(50.087692, 14.42115);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
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
          setMinDistance(distance);
        }
      }
    );
  };

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
              options={data}
              autoHighlight
              getOptionLabel={(option: any) =>
                option.iata_code + "-" + option.name
              }
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
              options={[]}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Destination Airport" />
              )}
            />
          </Stack>
          <Button variant="contained" onClick={handleGetDistance}>
            Get Distance
          </Button>

          <Typography
            style={{ fontSize: "22px", fontWeight: "bold", marginTop: 60 }}
          >
            Distance :{" "}
            <span style={{ fontSize: "22px", color: "#FF0101" }}>
              {(Number(minDistance) / 1.852).toFixed(2).toLocaleString()} NM
            </span>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchPanel;
