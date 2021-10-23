import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

export default function Header() {
  const history = useHistory();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const signOut = useSignOut();

  const isAuthenticated = useIsAuthenticated();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = (event) => {
    handleClose();
    signOut();
  };

  const handleSignIn = (event) => {
    handleClose();
    history.push("/login");
  };

  const loginMenuItem = isAuthenticated() ? (
    <MenuItem onClick={handleSignOut}>Log out</MenuItem>
  ) : (
    <MenuItem onClick={handleSignIn}>Log in</MenuItem>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
        <Box sx={{ flexGrow: 1 }} mx={50}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Photos
            </Typography>

            <Button
              component={Link}
              to="/"
              type="button"
              variant="outlined"
              color="inherit"
              mr={5}
              sx={{ mr: 2 }}
            >
              Browse
            </Button>
            <Button
              component={Link}
              to="/contribute"
              type="button"
              variant="outlined"
              color="inherit"
              mr={5}
            >
              Contribute
            </Button>

            {auth && (
              <Box sx={{ borderRadius: 16 }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  variant="outlined"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
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
                  {loginMenuItem}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
