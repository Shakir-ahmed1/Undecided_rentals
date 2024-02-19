import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from "@mui/material"
import LocationOutlinedIcon from "@material-ui/icons/LocationOutlinedIcon"
import Rating from "@material-ui/lab";

const Map = () => {
    const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = {lat : 0, lng: 0}
  return (
    <div>
        <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={}
            onChange={}
            onChildClick={}
        >
            
        </GoogleMapReact>
    </div>
  )
}

export default Map