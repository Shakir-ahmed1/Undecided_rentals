import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import Input from "./Input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../actions/users";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};
const Register = ({ setUser }) => {
  const [focusEmail, setFocusEmail] = useState(false)
  const [focuspwd, setFocusPwd] = useState(false)
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false)
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  let TEST_EMAIL = /\S+@\S+\.\S+/;
  let TEST_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [formData, setFormData] = useState(initialState);
  const ValidEmail = TEST_EMAIL.test(formData.email);
  const ValidPassword = TEST_PASSWORD.test(formData.password);
  const matchpwd = (formData.password === formData.confirmPassword)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const canSave = [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phoneNumber,
    formData.password,
    formData.confirmPassword,
  ].every(Boolean) && matchpwd && ValidEmail && ValidPassword;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const GoogleSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    const { sub, name, picture, email } = decoded;
    const userData = { id: sub, name, imageUrl: picture, email };
    try {
      dispatch({ type: "AUTH", payload: userData });
      navigate("/");
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      TEST_EMAIL.test(formData.email) &&
      TEST_PASSWORD.test(formData.password) &&
      (formData.password === formData.confirmPassword) === true
    ) {
      try {
        dispatch(signUp(formData));
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.log("check the inputs");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {success ? (
        <Container maxWidth="xs" component="main">
          <Paper
            elevation={3}
            style={{ padding: "20px", position: "relative" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
              <Alert severity="success">You are registered successfully</Alert>
            </div>
          </Paper>
        </Container>
      ) : (
        <Container maxWidth="xs" component="main">
          <Paper
            elevation={3}
            style={{ padding: "20px", position: "relative" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" style={{ margin: "10px" }}>
                Sign Up
              </Typography>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                />
                 <Stack sx={{ width: '100%' }} spacing={2}>
                  {!ValidEmail && focusEmail ? <Alert severity="error">Enter Valid Email</Alert> : null}            
                 </Stack>
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  handleChange={handleChange}
                />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  onFocus={() => setFocusPwd(true)}
                  onBlur={() => setFocusPwd(false)}
                />
                <Stack sx={{ width: '100%' }} spacing={2}>
                  {!ValidPassword && focuspwd ? <Alert severity="error">Enter Valid Password</Alert> : null}            
                 </Stack>
                <Input
                  name="confirmPassword"
                  label="Repeat password"
                  handleChange={handleChange}
                  type="password"
                  onFocus={() => setFocusConfirmPassword(true)}
                  onBlur={() => setFocusConfirmPassword(false)}
                />
                <Stack sx={{ width: '100%' }} spacing={2}>
                  {!matchpwd && focusConfirmPassword && <Alert severity="error">This password is not matching</Alert>}            
                </Stack>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: "20px 0" }}
                disabled={!canSave}
              >
                Sign Up
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
              >
                <GoogleLogin
                  onSuccess={GoogleSuccess}
                  onError={() => console.log("Error")}
                />
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Button onClick="" component={Link} to="/login">
                    Already have an account ? Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Register;
