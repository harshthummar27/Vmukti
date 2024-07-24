import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { forgotPassword } from "../../State/Auth/userAction";
import Alert from "@mui/material/Alert";

function Forgetpassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ severity: "", content: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const new_password = formData.get("password");

    try {
      await dispatch(forgotPassword({ email, new_password }, showSnackBar));
    } catch (error) {
      showSnackBar(error.response.data.message, "error");
    }
  };

  const showSnackBar = (msg, severity) => {
    setMessage({ severity, content: msg });
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container className="login-main" sx={{ minHeight: "100vh" }}>
      {/* Left section with logo */}
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

      {/* Right section with login form */}
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
          {/* Logo and title */}
          <Grid
            item
            className="login-log"
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "cursive",
                fontSize: "30px",
                marginTop: "50px",
              }}
            >
              Reset Password
            </Typography>
          </Grid>

          {/* Form */}
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
                  Change Password
                </Button>
              </Grid>
            </form>

            {/* Register link */}
            <Typography>
              Don't have an account?
              <Button
                onClick={() => navigate("/register")}
                sx={{
                  textDecoration: "none",
                  fontWeight: "600",
                  marginLeft: "5px",
                  fontSize: "1rem",
                  padding: "20px",
                  color: "#855BAC",
                }}
              >
                Register Here
              </Button>
            </Typography>
          </Grid>

          {/* Snackbar for notifications */}
          <Grid
            item
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              paddingBottom: "30px",
            }}
          >
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
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

export default Forgetpassword;