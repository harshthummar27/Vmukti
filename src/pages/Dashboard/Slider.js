import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import {
  ChevronLeft,
  Home,
  Logout,
  Settings,
  Subscriptions,
  Videocam,
} from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import StarsIcon from "@mui/icons-material/Stars";
import SpeedIcon from "@mui/icons-material/Speed";
import { Link, useLocation } from "react-router-dom";
// import jwtDecode from "jwt-decode";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menu = [
  { name: "Home", path: "/dashboard", icon: <SpeedIcon /> },
  { name: "Home", path: "/dashboard/Home", icon: <Home /> },
  { name: "Camera", path: "/dashboard/cameras", icon: <Videocam /> },
  { name: "Multiple", path: "/dashboard/multiple", icon: <Subscriptions /> },
  { name: "Shared Camera", path: "/dashboard/shared", icon: <ShareIcon /> },
  {
    name: "Add Camera",
    path: "/dashboard/add_camera",
    icon: <AddAPhotoIcon />,
  },
  { name: "Settings", path: "/dashboard/settings", icon: <Settings /> },
  { name: "Most Viewed", path: "/dashboard/most_viewed", icon: <StarsIcon /> },
];

function Slider({ open, setOpen }) {
  const location = useLocation();
  const user = localStorage.getItem("user");

  let userEmail = "";
  // if (user) {
  //   const decodetoken = jwtDecode(user);
  //   userEmail = decodetoken?.User?.id;
  // }
  // console.log("userEmail:", userEmail);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/";
    }, []);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ flex: 1 }}>
        <List>
          {menu.map((item) => (
            <ListItem disablePadding key={item.name}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  pt: 1.5,
                  position: "relative",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  backgroundColor:
                    location.pathname === item.path ? "#E3F2FD" : "inherit",
                  "& .MuiListItemIcon-root": {
                    color:
                      location.pathname === item.path ? "#1976D2" : "inherit",
                  },
                  "& .MuiListItemText-primary": {
                    color:
                      location.pathname === item.path ? "#1976D2" : "inherit",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: 3,
                    height: 20,
                    backgroundColor:
                      location.pathname === item.path
                        ? "#1976D2"
                        : "transparent",
                    transform: "translate(-100%, -50%)",
                    borderRadius: "0 5px 5px 0",
                  },
                }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Tooltip title={userEmail}>
          <Avatar>R</Avatar>
        </Tooltip>
        <Tooltip title="Logout" sx={{ mt: 1 }}>
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}

export default Slider;
