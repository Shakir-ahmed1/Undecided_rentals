import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatedUser, getUserProfile } from "../../actions/users";
import DataContext from "../../context/DataContext";

const UserProfile = () => {
  const { user } = useContext(DataContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams() || {userId: user?.user?._id};
  console.log('here is the userId',userId)
  const userProfileData = useSelector((state) => state?.users?.userProfileData)
  
  useEffect(() => {
    setTimeout(() => {
      dispatch(getUserProfile(userId))
    }, 10000)
    console.log('here is the userProfile Data', userProfileData)
  },[userProfileData])
  const [firstName, setFirstName] = useState(
    userProfileData?.firstName
      ? userProfileData?.firstName
      : null
  );
  const [lastName, setLastName] = useState(
    userProfileData?.lastName
      ? userProfileData?.lastName
      : null
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userProfileData?.phoneNumber
      ? userProfileData?.phoneNumber
      : null
  );
  const [bio, setBio] = useState(
    userProfileData?.profile?.bio ? userProfileData?.profile?.bio : null
  );
  const [country, setCountry] = useState(
    userProfileData?.profile?.country
      ? userProfileData?.profile?.country
      : null
  );
  const [state, setState] = useState(
    userProfileData?.profile?.state ? userProfileData?.profile?.state : null
  );
  const [houseAddress, setHouseAddress] = useState(
    userProfileData?.profile?.houseAddress
      ? userProfileData?.profile?.houseAddress
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
