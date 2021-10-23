import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

import ArrowDownwardRounded from "@mui/icons-material/ArrowDownward";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import GiteRoundedIcon from "@mui/icons-material/GiteRounded";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useHistory } from 'react-router-dom'

export default function Gallery({ itemData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const history = useHistory()

  const handleMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentPhoto(item);
  };

  const handleDownload = () => {
    setAnchorEl(null);
    axios({
      url: `http://0.0.0.0:8080/photo/${currentPhoto}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${currentPhoto}.jpg`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "89%", mx: "auto" }}>
      <ImageList variant="masonry" cols={4} gap={15}>
        {itemData.map(({ photoId, meta }) => (
          <ImageListItem key={photoId}>
            <img
              src={`http://0.0.0.0:8080/photo/${photoId}`}
              alt={photoId}
              loading="lazy"
            />
            <ImageListItemBar
              title={photoId}
              subtitle={photoId}
              actionIcon={
                <IconButton
                  aria-label={`info about ${photoId}`}
                  sx={{ color: "rgb(255,255,255)" }}
                  onClick={(event) => handleMenu(event, photoId)}
                >
                  <InfoIcon />
                </IconButton>
              }
              sx={{ bgcolor: "rgba(0,0,0,0.1)" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuList>
            <Divider />
            <MenuItem onClick={() => history.push(`/contribute/${currentPhoto}`)}>
              <ListItemIcon>
                <PostAddOutlinedIcon fontSize="medium" />
              </ListItemIcon>

              <ListItemText>
                Add Data
                <Typography variant="body2" color="text.secondary">
                  Do you know this place?
                </Typography>
              </ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleDownload}>
              <ListItemIcon>
                <ArrowDownwardRounded fontSize="small" />
              </ListItemIcon>
              <ListItemText>Download</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </Paper>
    </Box>
  );
}
