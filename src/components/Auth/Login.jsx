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
import { signIn } from "../../actions/users";
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
const Login = ({ setUser }) => {
  const [formData, setFormData] = useState(initialState);
  const [focusEmail, setFocusEmail] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  let TEST_EMAIL = /\S+@\S+\.\S+/;
  const ValidEmail = TEST_EMAIL.test(formData.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const err = useSelector((state) => state.users.error)
  const success = useSelector((state) => state.users.success)

  const [showPassword, setShowPassword] = useState(false);
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
      console.log(decoded)
    } catch (error) {
      console.log(error);
    }
  };
  const dispatchSignIn = () => {
    dispatch(signIn(formData))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchSignIn()
    if(err) {
      setErrMsg(err.IncoreectDetails)
    } else {
      setErrMsg('No Server Response')
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canSave = [formData.email, formData.password].every(Boolean) && ValidEmail;
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
              <Alert severity="success">You are signed in successfully</Alert>
            </div>
            <Link to='/'><div>Go to the main page</div></Link>
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
                Sign In
              </Typography>
            </div>
            <Stack sx={{ width: '100%' }} spacing={2} style={{marginBottom:'20px'}}>
                  {errMsg && <Alert severity="error" variant="filled">{errMsg}</Alert>}
            </Stack>
            <form action="" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: "20px 0" }}
                disabled={!canSave}
              >
                Sign In
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
                  <Link to={"/register"}>
                    <Button onClick="" style={{fontWeight:'bold', textTransform:'none'}}>Dont have an account ? Sign Up</Button>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Login;
