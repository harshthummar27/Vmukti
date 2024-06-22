import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import ListIcon from "@mui/icons-material/List";
import {
  Home,
  Subscriptions,
  Videocam,
  Settings,
  Logout,
} from "@mui/icons-material";
import StarsIcon from "@mui/icons-material/Stars";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/dashboard");
        break;
      case 1:
        navigate("/dashboard/cameras");
        break;
      case 2:
        navigate("/dashboard/multiple");
        break;
      case 3:
        navigate("/dashboard/shared");
        break;
      case 4: // Open the menu
        handleClick(event);
        break;
      default:
        break;
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Cameras" icon={<Videocam />} />
        <BottomNavigationAction label="Multiple" icon={<Subscriptions />} />
        <BottomNavigationAction label="Shared" icon={<ShareIcon />} />
        <BottomNavigationAction label="More" icon={<ListIcon />} />
      </BottomNavigation>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick("/dashboard/add_camera")}>
          <AddAPhotoIcon sx={{ marginRight: 1 }} />
          Add Camera
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/dashboard/settings")}>
          <Settings sx={{ marginRight: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/dashboard/most_viewed")}>
          <StarsIcon sx={{ marginRight: 1 }} />
          Favourite
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ marginRight: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default BottomNav;
