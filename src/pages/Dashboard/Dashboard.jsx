import React, { useMemo, useState } from "react";
import {
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Route, Routes } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "./Slider";
import BottomNav from "./BottomNav";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Cameras from "../Cameras/Cameras";
import MultipleCamera from "../Cameras/MultipleCamera";
import SharedCamera from "../Cameras/SharedCamera";
import AddCamera from "../Cameras/AddCamera";
import Sets from "../Cameras/Sets";
import DefaultView from "./DefaultView";
import Favoutrie from "../Cameras/Favoutrie";
import { Avatar, Badge } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const user = localStorage.getItem("user");

  // const email = user?.User?.Detail?.email;
  // const userName = email?.split("@")[0];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? "dark" : "light",
        },
      }),
    [dark]
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ bgcolor: "#215588e6" }}>
          <Toolbar>
            {!isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Ambicam
            </Typography>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {isMobile && <Avatar>R</Avatar>}
          </Toolbar>
        </AppBar>
        {!isMobile && <Slider open={open} setOpen={setOpen} />}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, margin: "24px 16px", padding: "3%" }}
        >
          <Routes>
            <Route path="/" element={<DefaultView handleprop={open} />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/multiple" element={<MultipleCamera />} />
            <Route path="/shared" element={<SharedCamera />} />
            <Route path="/add_camera" element={<AddCamera />} />
            <Route path="/settings" element={<Sets />} />
            <Route path="/most_viewed" element={<Favoutrie />} />
          </Routes>
        </Box>
        {isMobile && <BottomNav />}
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
