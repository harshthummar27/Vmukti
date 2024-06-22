import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginUser } from "../../State/Auth/userAction"; // Correct import path to loginUser action
import { useDispatch } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import DiamondIcon from "@mui/icons-material/Diamond";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ severity: "", content: "" });
  const [snackbar, setSnackbar] = useState({ open: false });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const userData = { email, password };
    dispatch(LoginUser(userData, showSnackBar));
  };

  const showSnackBar = (msg, severity) => {
    setMessage({ severity: severity, content: msg });
    setSnackbar({ open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Grid container className="login-main" sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={6}
        className="login-left"
        sx={{
          height: { sm: "100vh" },
          backgroundColor: "#F0F0F0",
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="logo2.jpeg"
          alt=""
          width={"100%"}
          style={{ maxWidth: "400px" }}
        />
      </Grid>
      <Grid item xs={12} sm={6} className="login-right">
        <Grid
          container
          className="login-right-container glassmorphism"
          sx={{
            height: "100%",
            padding: { xs: 2, md: "0 20%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "20px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Grid item sx={{ marginBottom: "15px" }}>
            <Tabs
              value="/"
              onChange={handleTabChange}
              centered
              indicatorColor="primary"
              textColor="primary"
              sx={{ margin: "15px" }}
            >
              <Tab label="Login" value="/" />
              <Tab label="Register" value="/register" />
            </Tabs>
          </Grid>

          <Grid
            item
            className="login-log"
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            <DiamondIcon sx={{ width: "100%" }} />
          </Grid>
          <Grid
            item
            className="login-center"
            sx={{
              textAlign: "center",
              margin: "auto 0",
            }}
          >
            <form
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                type="email"
                label="Email"
                placeholder="Enter Your Email"
                required
                fullWidth
                name="email"
                variant="standard"
                InputProps={{
                  style: {
                    marginBottom: "20px",
                  },
                }}
              />
              <Grid item className="pass-input" sx={{ position: "relative" }}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  placeholder="Enter Your Password"
                  fullWidth
                  required
                  variant="standard"
                  InputProps={{
                    style: {
                      marginBottom: "20px",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                className="login-center-option"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "2px",
                  }}
                />
                <a
                  href="/forgetPassword"
                  style={{
                    textDecoration: "none",
                    fontSize: "1rem",
                    marginTop: "2px",
                    color: "#855BAC",
                  }}
                >
                  Forgot Password
                </a>
              </Grid>
              <Grid
                item
                className="login-center-button"
                sx={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    border: "3px solid black",
                    fontWeight: "600",
                    borderRadius: "30px",
                    "&:hover": { color: "black", backgroundColor: "white" },
                  }}
                >
                  Login
                </Button>

                {/* Divider */}
                <Divider
                  sx={{
                    color: "black", // Optional: This sets the color of the text inside Divider
                  }}
                >
                  OR
                </Divider>

                <Button
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "700",
                    borderRadius: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid",
                    columnGap: "10px",
                    "&:hover": { color: "white", backgroundColor: "black" },
                  }}
                >
                  <GoogleIcon /> Log In with Google
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid
            item
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              paddingBottom: "40px",
            }}
          >
            <Typography>
              Don't have an account?
              <Button
                onClick={() => navigate("/register")}
                sx={{
                  textDecoration: "none",
                  fontWeight: "600",
                  marginLeft: "5px",
                  fontSize: "1rem",
                  color: "#855BAC",
                }}
              >
                Register Here
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={message.severity} variant="filled">
          {message.content}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default LoginPage;
