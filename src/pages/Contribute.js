import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Skeleton } from "@mui/material";
import { Picker } from "../components";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useHistory, useParams } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Contribute() {
  const [isKnown, setIsKnown] = React.useState(false);
  const [isMapOld, setIsMapOld] = React.useState(false);
  const [photoId, setPhotoId] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [info, setInfo] = React.useState(
    {
      position: { latitude: "", longitude: "" },
      name: "no name",
      year: 0,
    },
    []
  );

  const [openDialog, setOpenDialog] = React.useState(false);
  const {photoIdUrl} = useParams()
  const history = useHistory()

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleMarker = ({ lat, lon }) =>
    setInfo((prevInfo) => ({
      ...prevInfo,
      position: { latitude: lat.toString(), longitude: lon.toString() },
    }));

  const requestNextPhoto = () => {
    setLoading(true);
    axios({
      url: `http://0.0.0.0:8080/photo/next`,
      method: "GET",
    }).then((response) => {
      history.push(`/contribute/${response.data}`)
      setPhotoId(response.data);
    });
  };

  React.useEffect(() => {
    if(photoIdUrl === undefined) {
      requestNextPhoto()
    } else {
      setLoading(true)
      setPhotoId(photoIdUrl)
    }
  }, []);

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: "20px" }}>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && (
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{
              width: "750px",
              height: "100vh",
              maxHeight: "64vh",
              borderRadius: "8px",
              backgroundColor: "#D3D3D3",
            }}
          />
        )}
        <img
          style={loading ? { display: "none" } : {}}
          className="contribute"
          src={`http://0.0.0.0:8080/photo/${photoId}`}
          alt=""
          onLoad={() => setLoading(false)}
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
          onClick={() => handleClickOpen(true)}
        >
          Open full screen
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
            onClick={requestNextPhoto}
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
      <Dialog
        fullScreen
        sx={{ background: "#000" }}
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#212121" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Fullscreen mode
            </Typography>

            <Button
              autoFocus
              variant="outlined"
              color="inherit"
              onClick={handleClose}
              sx={{ mr: "10px" }}
              startIcon={<BlurOnOutlinedIcon />}
            >
              upscale
            </Button>
            <Button
              autoFocus
              variant="outlined"
              color="inherit"
              onClick={handleClose}
              sx={{ mr: "10px" }}
              startIcon={<AutoAwesomeOutlinedIcon />}
            >
              colorize
            </Button>
            <Button
              autoFocus
              variant="outlined"
              color="inherit"
              onClick={requestNextPhoto}
              sx={{ mr: "20px" }}
              startIcon={<RotateRightOutlinedIcon />}
            >
              next one
            </Button>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            height: "100%",
            maxHeight: "94vh",
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className={"contribute fullscreen"}
            src={`http://0.0.0.0:8080/photo/${photoId}`}
            alt=""
          />
        </Box>
      </Dialog>
    </Box>
  );
}

export default Contribute;
