import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
function Contribute() {
  const [cover, setCover] = React.useState(true);
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
          class={cover ? "contribute cover" : "contribute "}
          src="http://0.0.0.0:8080/photo/5"
          alt=""
        />
      </Box>
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
          variant="outlined"
          startIcon={<FitScreenOutlinedIcon />}
          onClick={() => setCover(!cover)}
        >
          {cover ? "Show original" : "Fit screen"}
        </Button>
      </Box>
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
        >
          Yes, I know this place!
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="error"
          endIcon={<DoNotDisturbAltOutlinedIcon />}
        >
          No, maybe next one.
        </Button>
      </Box>
    </Box>
  );
}

export default Contribute;
