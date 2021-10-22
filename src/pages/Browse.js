import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Typography, Box } from "@mui/material";

import { Gallery } from "../components";

import { fetchPhotos } from "../redux/actions/photos";

function Browse() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchPhotos()), [dispatch]);
  const items = useSelector(({ photos }) => photos.items);

  return (
    <div>
      <Box sx={{ width: "70%", mx: "auto", textAlign: "center" }}>
        <Typography variant="h1" gutterBottom component="div">
          Experience the Past <br /> of Dresden
        </Typography>
      </Box>
      <Gallery itemData={items} />
    </div>
  );
}

export default Browse;
