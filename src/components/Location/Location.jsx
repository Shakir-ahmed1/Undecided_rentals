import { useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { TextField, Grid, Button, Dialog, Box } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { postRentalLocation } from "../../actions/rentals";
import GoogleMapReact from "google-map-react";
import RoomIcon from '@mui/icons-material/Room';
import { countries } from "./countries";
import Autocomplete from '@mui/material/Autocomplete';
import DataContext from "../../context/DataContext";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Location = ({setOpenLocation}) => {
    const {
      locationData,
      setLocationData,
      rentalValue,
      setRentalValue,
      rentals,
    } = useContext(DataContext);
    const {houseId} = useParams()
    const [openLat, setOpenLat] = useState(false)
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
    const [bounds, setBounds] = useState({})
    const [rentalCoordinates, setRentalCoordinates] = useState({lat: 0, lng: 0})
    // console.log('here is the location data', locationData)
    // console.log('here is the rental location data', rentalCoordinates)
    // console.log('here is the location _id', location_id)
    
    const dispatch = useDispatch();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude }}) => {
          setCoordinates({lat: latitude, lng: longitude})
          setBounds({ne:{lat:latitude+0.05,lng:longitude+0.03},sw:{lat:latitude-0.05, lng:longitude-0.03}})
        })
      },[])

    const back = () => {
        setOpenLocation(false)
    }

    const handleClose = () => {
        setOpenLat(false)
        setRentalCoordinates({lat: 0, lng: 0})
    }

    const save = () => {
      setOpenLat(false)
    }

    const handleMapClick = (e) => {
      console.log(e)
      setRentalCoordinates({lat:e.lat, lng:e.lng})
      setLocationData(prevState => ({
        ...prevState,
        latitude: e.lat,
        longitude: e.lng
      }));
    }
    const rental = rentals?.find((rentalId) => rentalId?._id === houseId) || null;

    const handleLocationSubmit = (e) => {
        e.preventDefault()
        dispatch(postRentalLocation(locationData)).then(() => {
          setOpenLocation(false)
          setRentalValue(() => {
            return {
              ...rental,
              location: {
                ...rental?.location,
                country:locationData.country,
                city:locationData.city
              }
            }
          })
        })
    }

  return (
    <div>
      <form action="" onSubmit={handleLocationSubmit}>
        <CloseIcon
          onClick={() => setOpenLocation(false)}
          style={{ cursor: "pointer" }}
        />
        <h1>Specify your location</h1>
        <Autocomplete
          onChange={(event, newValue) =>
            setLocationData({ ...locationData, country: newValue.label })
          }
          id="country-select-demo"
          fullWidth
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        <TextField
          value={locationData.city}
          label={"City"}
          required
          onChange={(e) =>
            setLocationData({ ...locationData, city: e.target.value })
          }
          fullWidth
          name="city"
          variant="outlined"
          style={{
            margin: "10px 0 10px 0",
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              value={rentalCoordinates ? rentalCoordinates.lat : ""}
              label={"Latitude"}
              fullWidth
              name="latitude"
              onClick={() => setOpenLat(true)}
              onChange={(e) =>
                setLocationData({ ...locationData, latitude: e.target.value })
              }
              variant="outlined"
              type="number"
              required
              style={{
                margin: "10px 0 10px 0",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              value={rentalCoordinates ? rentalCoordinates.lng : ""}
              label={"Longitude"}
              onClick={() => setOpenLat(true)}
              fullWidth
              name="longitude"
              onChange={(e) =>
                setLocationData({ ...locationData, longitude: e.target.value })
              }
              variant="outlined"
              required
              type="number"
              style={{
                margin: "10px 0 10px 0",
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          style={{ marginBottom: "10px" }}
          disabled={""}
        >
          Submit your location
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={back}
          fullWidth
        >
          back
        </Button>
      </form>
      <Dialog open={openLat} onClose={handleClose}>
        <div style={{ width: "600px", height: "400px" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            <Button color="primary" variant="contained" onClick={save}>
              Save
            </Button>
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API }}
            center={coordinates}
            defaultZoom={13}
            margin={[50, 50, 50, 50]}
            options={""}
            onClick={handleMapClick}
            onChange={(e) => {
              console.log(e);
              setCoordinates({ lat: e.center.lat, lng: e.center.lng });
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
            }}
          >
            {rentalCoordinates && (
              <Marker
                key={rentalCoordinates.lat}
                lat={rentalCoordinates.lat}
                lng={rentalCoordinates.lng}
              />
            )}
          </GoogleMapReact>
        </div>
      </Dialog>
    </div>
  );
};
const Marker = () => (
  <div>
    <RoomIcon fontSize="large" color="primary"/>
  </div>
);

export default Location;
