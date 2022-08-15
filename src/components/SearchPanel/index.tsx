import React, { useContext } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import airplaneIcon from "../../assets/pngIcons/airplaneIcon.png";
import locationIcon from "../../assets/pngIcons/locationIcon.png";
import { AirportContext } from "src/context/AirportContextProvider";
import { airports } from "../../data/us_airports";

interface Props {
  handleGetDistance?: any;
}

const SearchPanel: React.FC<Props> = ({ handleGetDistance }) => {
  const { setSource, setDestination, distance } = useContext(AirportContext);

  const _filterOptions = createFilterOptions();
  const filterOptions = (options: any, state: any) => {
    const result = _filterOptions(options, state);

    if (result.length === 0) {
      return _filterOptions(options, {
        ...state,
        getOptionLabel: (o: any) => o.name.toString() || o.iata_code.toString(),
      });
    }

    return result;
  };

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
            <img src={airplaneIcon} alt="airplane" width="180" />
            <Typography
              sx={{ color: "white", fontSize: "32px", fontWeight: 500 }}
            >
              US AIRPORTS <br /> DISTANCE CALCULATOR
            </Typography>
          </Stack>
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGetDistance();
          }}
        >
          <Stack
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", margin: 8 }}
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
                filterOptions={filterOptions}
                getOptionLabel={(option: any) =>
                  option.iata_code + "-" + option.name
                }
                renderOption={(props: any, option: any) => (
                  <Box component="li" {...props}>
                    <span>
                      <b>{option.iata_code}</b>
                      {" - "}
                      {option.name}
                    </span>
                  </Box>
                )}
                onChange={(event, newValue) => {
                  setSource(newValue);
                }}
                selectOnFocus
                sx={{ width: 500 }}
                renderInput={(params) => (
                  <TextField required {...params} label="Source Airport" />
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
                filterOptions={filterOptions}
                autoHighlight
                getOptionLabel={(option: any) =>
                  option.iata_code + "-" + option.name
                }
                onChange={(event, newValue) => {
                  setDestination(newValue);
                }}
                renderOption={(props: any, option: any) => (
                  <Box component="li" {...props}>
                    <span>
                      <b>{option.iata_code}</b>
                      {" - "}
                      {option.name}
                    </span>
                  </Box>
                )}
                selectOnFocus
                sx={{ width: 500 }}
                renderInput={(params) => (
                  <TextField required {...params} label="Destination Airport" />
                )}
              />
            </Stack>
            <Button type="submit" variant="contained">
              Get Distance
            </Button>

            <Typography sx={{ fontSize: "22px", fontWeight: 400 }}>
              Driving Distance :{" "}
              <span
                style={{ fontSize: "22px", color: "#FF0101", fontWeight: 600 }}
              >
                {(Number(distance) * 0.00054).toFixed(2).toLocaleString()} NM
              </span>
            </Typography>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default SearchPanel;
