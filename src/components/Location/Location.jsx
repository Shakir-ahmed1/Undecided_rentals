import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { TextField, Grid, Button, Dialog } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { postRentalLocation } from "../../actions/rentals";
import GoogleMapReact from "google-map-react";
import RoomIcon from '@mui/icons-material/Room';

const Location = ({setOpenLocation}) => {
    const [openLat, setOpenLat] = useState(false)
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
    const [bounds, setBounds] = useState({})
    const [rentalCoordinates, setRentalCoordinates] = useState({lat: 0, lng: 0})
    const initialState = { country: "", city: "", latitude: "", longitude: "" };
    const [locationData, setLocationData] = useState(initialState);
    console.log('here is the location data', locationData)
    console.log('here is the rental location data', rentalCoordinates)
    
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
        latitude: rentalCoordinates.lat,
        longitude: rentalCoordinates.lng
      }));
    }

    const handleLocationSubmit = (e) => {
        e.preventDefault()
        dispatch(postRentalLocation(locationData))
        setOpenLocation(false)
    }

  return (
    <div>
      <form action="" onSubmit={handleLocationSubmit}>
        <CloseIcon
          onClick={() => setOpenLocation(false)}
          style={{ cursor: "pointer" }}
        />
        <h1>Specify your location</h1>
        <TextField
          value={locationData.country}
          label={"Country"}
          onChange={(e) =>
            setLocationData({ ...locationData, country: e.target.value })
          }
          fullWidth
          name="country"
          required
          variant="outlined"
          style={{
            margin: "10px 0 10px 0",
          }}
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
              value={rentalCoordinates.lat}
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
              value={rentalCoordinates.lng}
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
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            <Button color="primary" variant="contained" onClick={save}>Save</Button>
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
