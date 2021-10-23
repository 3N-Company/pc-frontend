import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Picker } from "../components";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";

function Contribute() {
  const [cover, setCover] = React.useState(true);
  const [isKnown, setIsKnown] = React.useState(false);
  const [isMapOld, setIsMapOld] = React.useState(false);
  const [photoId, setPhotoId] = React.useState(1);
  const [info, setInfo] = React.useState(
    {
      position: { latitude: "", longitude: "" },
      name: "no name",
      year: 0,
    },
    []
  );

  const handleMarker = ({ lat, lon }) =>
    setInfo((prevInfo) => ({
      ...prevInfo,
      position: { latitude: lat.toString(), longitude: lon.toString() },
    }));

  React.useEffect(() => {
    axios({
      url: `http://0.0.0.0:8080/photo/next`,
      method: "GET",
    }).then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className={cover ? "contribute cover" : "contribute "}
          src={`http://0.0.0.0:8080/photo/${photoId}`}
          alt=""
        />
      </Box>
      <Box
        sx={{
          mx: "auto",
          my: "21px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FitScreenOutlinedIcon />}
          onClick={() => setCover(!cover)}
        >
          {cover ? "Show original" : "Fit screen"}
        </Button>
      </Box>
      {!isKnown && (
        <Box
          sx={{
            mx: "auto",
            mt: "21px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            color="success"
            startIcon={<DoneAllOutlinedIcon />}
            sx={{ mr: "8px" }}
            onClick={() => setIsKnown(true)}
          >
            Yes, I know this place!
          </Button>
          <Button
            variant="contained"
            disableElevation
            color="error"
            endIcon={<DoNotDisturbAltOutlinedIcon />}
            onClick={() => setPhotoId(photoId + 1)}
          >
            No, maybe next one.
          </Button>
        </Box>
      )}
      {isKnown && (
        <Box>
          <Box sx={{ width: "50%", mx: "auto", mb: "15px" }}>
            <Typography variant="h4" gutterBottom component="div">
              Please provide some details about this place
            </Typography>
            <Typography variant="h5" gutterBottom component="div" my={"12px"}>
              Name and Year
              <Typography variant="body2" color="text.secondary">
                If you know the date on the photo, please provide below
              </Typography>
            </Typography>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ mr: "10px" }}
              onChange={(event) =>
                setInfo((prevInfo) => ({
                  ...prevInfo,
                  name: event.target.value,
                }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Year"
              variant="outlined"
              onChange={(event) =>
                setInfo((prevInfo) => ({
                  ...prevInfo,
                  year: event.target.value,
                }))
              }
            />
            <Typography variant="h5" gutterBottom component="div" my={"12px"}>
              Location
              <Typography variant="body2" color="text.secondary">
                Please select a point on the map.
                {info?.position?.longitude &&
                  `You have selected: ${info?.position?.latitude},
                ${info?.position?.longitude}`}
              </Typography>
              <Box>
                <FormControlLabel
                  control={<Switch onChange={() => setIsMapOld(!isMapOld)} />}
                  label="Oldify the map"
                />
              </Box>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "82%",
              maxHeight: "200px",
              mx: "auto",
              marginBottom: "1000px",
            }}
          >
            <Picker
              onPickerSet={(marker) => handleMarker(marker)}
              zoom={13}
              height={"600px"}
              oldMap={isMapOld}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Contribute;
