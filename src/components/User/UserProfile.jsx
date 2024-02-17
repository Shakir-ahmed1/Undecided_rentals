import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updatedUser } from "../../actions/users";

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [firstName, setFirstName] = useState(user?.firstName || null);
  const [lastName, setLastName] = useState(user?.lastName || null);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || null)
  const [bio, setBio] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [houseAddress, setHouseAddress] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updatedUser(userId, {firstName, lastName, phoneNumber, bio, country, state, houseAddress}))
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={5}>
        <Typography
          variant="h3"
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          User Profile
        </Typography>
        <form action="" style={{padding:'20px'}} onSubmit={handleSubmit}>
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
                <Button variant="contained" color="primary" fullWidth type="submit" disabled=''>Edit User Profile</Button>
              </Grid>
              <Grid xs={12} sm={12} item component={Link} to='/'>
                <Button variant="contained" fullWidth color="secondary">Back Home</Button>
              </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UserProfile;
