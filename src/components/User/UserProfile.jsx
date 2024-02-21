import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatedUser, getUserProfile } from "../../actions/users";

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.users.authData);
  const { userId } = useParams() || {userId: userData.user._id};
  
  useEffect(() => {
    dispatch(getUserProfile(userId))
    console.log('here is the userData',userData)
  },[userId])
  const [firstName, setFirstName] = useState(
    user.user?.firstName
      ? user.user?.firstName
      : user?.firstName
      ? user?.firstName
      : null
  );
  const [lastName, setLastName] = useState(
    user.user?.lastName
      ? user.user?.lastName
      : user?.lastName
      ? user?.lastName
      : null
  );
  const [phoneNumber, setPhoneNumber] = useState(
    user.user?.phoneNumber
      ? user.user?.phoneNumber
      : user?.phoneNumber
      ? user?.phoneNumber
      : null
  );
  const [bio, setBio] = useState(
    user.user?.bio ? user.user?.bio : user?.bio ? user?.bio : null
  );
  const [country, setCountry] = useState(
    user.user?.country
      ? user.user?.country
      : user?.country
      ? user?.country
      : null
  );
  const [state, setState] = useState(
    user.user?.state ? user.user?.state : user?.state ? user?.state : null
  );
  const [houseAddress, setHouseAddress] = useState(
    user.user?.houseAddress
      ? user.user?.houseAddress
      : user?.houseAddress
      ? user?.houseAddress
      : null
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatedUser(
        userId,
          {
            firstName,
            lastName,
            phoneNumber,
            bio,
            country,
            state,
            houseAddress,
          },
        navigate
      )
    );
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh" }}>
      <Paper elevation={5} style={{ padding: "10px" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          style={{ textAlign: "center", fontFamily: "Georgia" }}
        >
          User Profile
        </Typography>
        <form action="" style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} item>
              <TextField
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                label="First Name"
                fullWidth
                value={firstName}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                label="Last Name"
                value={lastName}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                fullWidth
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                label="Phone Number"
                value={phoneNumber}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                fullWidth
                name="bio"
                onChange={(e) => setBio(e.target.value)}
                variant="outlined"
                label="Bio"
                value={bio}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                fullWidth
                name="country"
                onChange={(e) => setCountry(e.target.value)}
                variant="outlined"
                label="Country"
                value={country}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                fullWidth
                name="state"
                onChange={(e) => setState(e.target.value)}
                variant="outlined"
                label="State"
                value={state}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                fullWidth
                name="houseAdress"
                onChange={(e) => setHouseAddress(e.target.value)}
                variant="outlined"
                label="House Address"
                value={houseAddress}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled=""
              >
                Edit User Profile
              </Button>
            </Grid>
            <Grid xs={12} sm={12} item component={Link} to="/">
              <Button variant="contained" fullWidth color="secondary">
                Back Home
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UserProfile;
