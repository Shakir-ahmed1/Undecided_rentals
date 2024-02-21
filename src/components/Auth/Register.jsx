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
import { useDispatch, useSelector } from "react-redux";
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
  const [focusFirst, setFocusFirst] = useState(false)
  const [focusLast, setFocusLast] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focuspwd, setFocusPwd] = useState(false)
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false)
  const err = useSelector((state) => state.users.error);

  let TEST_EMAIL = /\S+@\S+\.\S+/;
  let TEST_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [formData, setFormData] = useState(initialState);
  const ValidEmail = TEST_EMAIL.test(formData.email);
  const ValidPassword = TEST_PASSWORD.test(formData.password);
  const ValidFirst = formData.firstName.length < 80 ? true : false
  const ValidLast = formData.lastName.length < 80 ? true : false
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
  ].every(Boolean) && matchpwd && ValidEmail && ValidPassword && ValidFirst && ValidLast;

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
      window.location.reload()
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
        dispatch(signUp(formData, navigate));
    }
       
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container maxWidth="xs" component="main" style={{minHeight:'100vh'}}>
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
          <Stack sx={{ width: '100%' }} spacing={2} style={{marginBottom:'20px'}}>
                {err && <Alert severity="error" variant="filled">{err.response.data.errors.email}</Alert>}            
          </Stack>
          <form action="" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            {!ValidFirst && focusFirst ? (
              <Input
                name="firstName"
                label="First Name"
                error
                handleChange={handleChange}
                onFocus={() => setFocusFirst(true)}
                autoFocus
                half
                helperText="First Name should be less than 80 characters"
              />
            ) : (
              <Input
                name="firstName"
                label="First Name"
                handleChange={handleChange}
                onFocus={() => setFocusFirst(true)}
                autoFocus
                half
              />
            )}
              {!ValidLast && focusLast ? (
                <Input
                name="lastName"
                label="Last Name"
                handleChange={handleChange}
                half
                error
                helperText="Last Name should be less than 80 characters"
                onFocus={() => setFocusLast(true)}
              />
              ) : (
              <Input
                name="lastName"
                label="Last Name"
                handleChange={handleChange}
                half
                onFocus={() => setFocusLast(true)}
              />
              )}
              {!ValidEmail && focusEmail && formData.email.length > 5 ? (
                <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                error
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                helperText="Enter Valid Email Address"
              />
              ) : (
                <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
              />
              )}
              <Input
                name="phoneNumber"
                label="Phone Number"
                handleChange={handleChange}
              />
              {!ValidPassword && focuspwd && formData.password.length > 7 ? (
                <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                error
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                onFocus={() => setFocusPwd(true)}
                onBlur={() => setFocusPwd(false)}
                helperText="Enter Valid Password"
              />
              ) : (
                <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                onFocus={() => setFocusPwd(true)}
                onBlur={() => setFocusPwd(false)}
              />
              )}
               {!matchpwd && focusConfirmPassword && formData.confirmPassword.length > 7 ? (
                <Input
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type="password"
                error
                onFocus={() => setFocusConfirmPassword(true)}
                onBlur={() => setFocusConfirmPassword(false)}
                helperText="This Password is not matching"
              />
               ) : (
                <Input
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type="password"
                onFocus={() => setFocusConfirmPassword(true)}
                onBlur={() => setFocusConfirmPassword(false)}
              />
               )}
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
              style={{ marginBottom: "20px" }}>
                <GoogleLogin
                  onSuccess={GoogleSuccess}
                  onError={() => console.log("Error")}
                  text='signup_with'
                  locale="en"
                  theme="filled_blue"
                />
              </Button>
        
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Button onClick="" component={Link} to="/login" style={{fontWeight:'bold', textTransform:'none'}}>
                  Already have an account ? Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Register;