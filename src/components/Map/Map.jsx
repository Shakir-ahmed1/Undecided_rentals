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
import { forwardRef, useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./Map.css";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/List";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Map = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useMediaQuery("(min-width:600px)");
  const coordinates = { lat: 0, lng: 0 };

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
            style={{ position: "relative", height: "700px", top: "-20px" }}
            bootstrapURLKeys={{
              key: import.meta.env.VITE_GOOGLE_MAP_API
            }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={""}
          >
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
                position:'relative',
                bottom:'-200px',
                right:'50px',
              }}
            >
              Show Lists &nbsp; <ListIcon />
            </Button>
          </GoogleMapReact>
        </div>
      </Dialog>
    </div>
  );
};

export default Map;
