/* eslint-disable no-unused-vars */
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { forwardRef, useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/List";
import DataContext from "../../context/DataContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyRentMap = ({myRent}) => {
  const { coordinates, setCoordinates, setBounds, rentals } = useContext(DataContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isDesktop = useMediaQuery("(min-width:600px)");
  // console.log("here is the rental from the map pagem", rentals)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("bottom-button");
      const footer = document.getElementById("footer");

      if (!button || !footer) return;

      const buttonRect = button.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const distanceToFooterTop = footerRect.top - buttonRect.top;

      setIsVisible(distanceToFooterTop > 70); // Adjust threshold as needed
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={`button-container ${isVisible ? "visible" : "hidden"}`}>
        <Button
          id="bottom-button"
          variant="contained"
          onClick={handleClickOpen}
          style={{
            backgroundColor: "black",
            borderRadius: "20px",
            textTransform: "none",
            fontFamily: "Georgia",
            fontWeight: "bold",
            padding: "15px",
          }}
        >
          Show Google Maps &nbsp; <MapIcon />
        </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div>
          <NavBar user={user} setUser={setUser} />
        </div>
        <AppBar
          sx={{ position: "relative", top: "-20px" }}
          style={{ backgroundColor: "black" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Google Maps
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div>
              <GoogleMapReact
                bootstrapURLKeys={{ key:import.meta.env.VITE_GOOGLE_MAP_API}}
                style={{ position: "relative", height: "700px", top: "-20px" }}
                center={coordinates}
                defaultZoom={12}
                margin={[50, 50, 50, 50]}
                options={""}
                onChange={(e) => {
                  console.log(e);
                  setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                  setBounds({ne:e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
              >
                <>
                  {myRent?.map((rental, i) => (
                  <div
                    key={i}
                    lat={Number(myRent?.location?.latitude)}
                    lng={Number(myRent?.location?.longitude)}
                    >
                      {!isDesktop ? (
                        <LocationOnIcon color="primary" lat={Number(myRent?.location?.latitude)}
                        lng={Number(myRent?.location?.longitude)}/> 
                        ): (
                        // <Paper elevation={3} style={{width:'50px'}}>
                        //   <Typography variant="subtitle2" gutterBottom>
                        //     {rental.name}
                        //   </Typography>
                        //   <img src={rental.photo ? rental.photo.images.large.url : "https://media.istockphoto.com/id/149060607/photo/for-rent-sign-in-front-of-new-house.jpg?s=612x612&w=0&k=20&c=By627yICPZugFR1j2_a_7MCEn1f5ltYlivg6Tv50JaQ="} alt={rental.name} />
                        // </Paper>
                        <LocationOnIcon color="primary"
                        lat={Number(myRent?.location?.latitude)}
                    lng={Number(myRent?.location?.longitude)}/> 
                      )
                      }
                      
                  </div>
                  ))}
                  <Button
                    id="bottom-button"
                    variant="contained"
                    onClick={handleClose}
                    style={{
                      backgroundColor: "black",
                      borderRadius: "20px",
                      textTransform: "none",
                      fontFamily: "Georgia",
                      fontWeight: "bold",
                      padding: "15px",
                      position: "relative",
                      bottom: "-550px",
                      left:'700px'
                    }}
                  >
                    Show Lists &nbsp; <ListIcon />
                  </Button>
                </>  
              </GoogleMapReact>
        </div>
      </Dialog>
    </div>
  );
};

export default MyRentMap;