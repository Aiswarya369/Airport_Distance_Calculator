import React, { useContext } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import airplaneIcon from "../../assets/pngIcons/airplaneIcon.png";
import locationIcon from "../../assets/pngIcons/locationIcon.png";
import { AirportContext } from "src/context/AirportContextProvider";
import { airports } from "../../data/us_airports";
import { calculateFlyingDistance } from "../../utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const SearchPanel: React.FC = () => {
  const {
    setSource,
    setDestination,
    distance,
    setDistance,
    source,
    destination,
  } = useContext(AirportContext);

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  const filterOptionMethod = createFilterOptions();
  const filterOptions = (options, state) => {
    const result = filterOptionMethod(options, state);
    if (result.length === 0) {
      return filterOptionMethod(options, {
        ...state,
        getOptionLabel: (o: any) => o.name.toString() || o.iata_code.toString(),
      });
    }
    return result;
  };

  const renderOption = (props, option) => (
    <Box component="li" {...props}>
      <span>
        <b>{option.iata_code}</b>
        {" - "}
        {option.name}
      </span>
    </Box>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setDistance({ d: 0, comment: "" });
    const d: string = calculateFlyingDistance(
      Number(source?.lat),
      Number(source?.lng),
      Number(destination?.lat),
      Number(destination?.lng)
    );
    setDistance({
      d: Number(d),
      comment:
        source?.lat === destination?.lat && source?.lng === destination?.lng
          ? "Source and Destination Airports are the same."
          : "",
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Box style={{ backgroundColor: "#1A73E8" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <img src={airplaneIcon} alt="airplane" width={lgUp ? 180 : 150} />
            <Typography
              sx={{ color: "white", fontSize: "30px", fontWeight: 500 }}
            >
              US AIRPORTS <br /> DISTANCE CALCULATOR
            </Typography>
          </Stack>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", margin: "42px 8px" }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ width: "100%" }}
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
                renderOption={renderOption}
                onChange={(_event, newValue) => {
                  setSource(newValue);
                }}
                selectOnFocus
                sx={{ width: "80%" }}
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
              sx={{ width: "100%" }}
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
                onChange={(_event, newValue) => {
                  setDestination(newValue);
                }}
                renderOption={renderOption}
                selectOnFocus
                sx={{ width: "80%" }}
                renderInput={(params) => (
                  <TextField required {...params} label="Destination Airport" />
                )}
              />
            </Stack>
            <Button type="submit" variant="contained">
              Get Distance
            </Button>
            {((distance.d !== 0 && !distance.comment) || distance.comment) &&
              source &&
              destination && (
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Distance :{" "}
                  <span
                    style={{
                      fontSize: "22px",
                      color: "#FF0101",
                      fontWeight: 600,
                    }}
                  >
                    {distance.d} Nautical miles
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    {distance.comment}
                  </span>
                </Typography>
              )}
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default SearchPanel;
