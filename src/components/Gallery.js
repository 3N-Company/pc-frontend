import * as React from "react";
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
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export default function MasonryImageList({ itemData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ width: "89%", mx: "auto" }}>
      <ImageList variant="masonry" cols={4} gap={15}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`http://0.0.0.0:8080/photo/${item}`}
              alt={item}
              loading="lazy"
            />
            <ImageListItemBar
              title={item}
              subtitle={item}
              actionIcon={
                <IconButton
                  aria-label={`info about ${item}`}
                  sx={{ color: "rgb(255,255,255)" }}
                  onClick={handleMenu}
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
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <GiteRoundedIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>About this region</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FilterRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>More from this region</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ArticleOutlinedIcon fontSize="medium" />
              </ListItemIcon>

              <ListItemText>
                Add Data
                <Typography variant="body2" color="text.secondary">
                  Do you know this place?
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ArticleOutlinedIcon fontSize="medium" />
              </ListItemIcon>

              <ListItemText>
                Add Data
                <Typography variant="body2" color="text.secondary">
                  Do you have photos of this place?
                </Typography>
              </ListItemText>
            </MenuItem>

            <Divider />
            <MenuItem onClick={handleClose}>
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
