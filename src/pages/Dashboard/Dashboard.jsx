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
import { Avatar, Badge, InputBase, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

const Search = styled("div")(({ theme, showSearch }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: showSearch ? "100%" : "auto",
  display: showSearch ? "flex" : "none",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: showSearch ? "auto" : "100%",
    display: "flex",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const initialItems = [
  { id: 1, name: "Camera 1", fav: 0 },
  { id: 2, name: "Camera 2", fav: 0 },
  { id: 3, name: "Camera 3", fav: 0 },
  { id: 4, name: "Camera 4", fav: 0 },
  { id: 5, name: "Camera 5", fav: 0 },
  { id: 6, name: "Camera 6", fav: 0 },
  { id: 7, name: "Camera 7", fav: 0 },
  { id: 8, name: "Camera 8", fav: 0 },
  { id: 9, name: "Camera 9", fav: 0 },
  { id: 10, name: "Camera 10", fav: 0 },
  { id: 11, name: "Camera 11", fav: 0 },
  { id: 12, name: "Camera 12", fav: 0 },
  { id: 13, name: "Camera 13", fav: 0 },
  { id: 14, name: "Camera 14", fav: 0 },
  { id: 15, name: "Camera 15", fav: 0 },
  { id: 16, name: "Camera 16", fav: 0 },
];

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [items, setItems] = useState(initialItems);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleFavoriteToggle = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, fav: item.fav === 0 ? 1 : 0 } : item
      )
    );
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
        <AppBar position="fixed" open={open}>
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
              CRIS
            </Typography>

            {!isMobile && (
              <Search showSearch={true}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            )}

            {isMobile && !showSearch && (
              <IconButton onClick={() => setShowSearch(true)} color="inherit">
                <SearchIcon />
              </IconButton>
            )}

            {isMobile && showSearch && (
              <Search showSearch={true}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onBlur={() => setShowSearch(false)}
                />
              </Search>
            )}

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
            <Route
              path="/"
              element={
                <DefaultView
                  items={items}
                  handleprop={open}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              }
            />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/multiple" element={<MultipleCamera />} />
            <Route path="/shared" element={<SharedCamera />} />
            <Route path="/add_camera" element={<AddCamera />} />
            <Route path="/settings" element={<Sets />} />
            <Route
              path="/most_viewed"
              element={
                <Favoutrie
                  items={items.filter((item) => item.fav === 1)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              }
            />
          </Routes>
        </Box>
        {isMobile && <BottomNav />}
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
