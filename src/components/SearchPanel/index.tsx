import React from "react";
import {
  Box,
  Stack,
  TextField,
  Autocomplete,
  Typography,
  Button,
} from "@mui/material";
import airplaneIcon from "../../assets/pngIcons/airplaneIcon.png";
import locationIcon from "../../assets/pngIcons/locationIcon.png";

interface Props {
  setDirectionChange:any
}

const SearchPanel: React.FC<Props> = ({setDirectionChange}) => {
  const [minDistance, setMinDistance] = React.useState<any>(0);

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
    setDirectionChange(true);
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
          sx={{ height: '100%' ,marginTop:8}}
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
              options={[]}
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

          <Typography style={{ fontSize: "22px", fontWeight: "bold",marginTop:60 }}>
            Minimum Distance :{" "}
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
