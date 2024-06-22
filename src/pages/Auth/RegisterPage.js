import {
  Alert,
  Button,
  Divider,
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
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import DiamondIcon from "@mui/icons-material/Diamond";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";

import { registerUser } from "../../State/Auth/userAction";

function RegisterPage() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({ severity: "", content: "" });
  const [snackbar, setSnackbar] = useState({ open: false });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("cnfpassword"),
    };

    dispatch(registerUser(userData, showSnackBar));
  };

  const showSnackBar = (msg, severity) => {
    setMessage({ severity: severity, content: msg });
    setSnackbar({ open: true });
  };

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Grid container className="register-main" sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={6}
        className="register-left"
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
      <Grid item xs={12} sm={6} className="register-right">
        <Grid
          container
          className="register-right-container"
          sx={{
            height: "100%",
            padding: { xs: 2, md: "0 20%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid item sx={{ marginBottom: "15px" }}>
            <Tabs
              value="/register"
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
            className="register-log"
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
            className="register-center"
            sx={{
              textAlign: "center",
              margin: "auto 0",
            }}
          >
            <form
              onSubmit={handleRegister}
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
              <Grid item className="pass-input" sx={{ position: "relative" }}>
                <TextField
                  label="Confirm Password"
                  variant="standard"
                  placeholder="Enter Password Again"
                  fullWidth
                  required
                  name="cnfpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPassword ? (
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
                className="register-center-button"
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
                  Register
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
                  <GoogleIcon /> Register with Google
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
              Already have an account?
              <Button
                onClick={() => navigate("/")}
                sx={{
                  textDecoration: "none",
                  fontWeight: "600",
                  marginLeft: "5px",
                  fontSize: "1rem",
                  color: "#855BAC",
                }}
              >
                Login Here
              </Button>
            </Typography>
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
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
