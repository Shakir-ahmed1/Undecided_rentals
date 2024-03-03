import {
  Container,
  Grid,
  Button,
  Box,
  CardMedia,
  Card,
  Divider,
  Avatar,
  Paper,
  Dialog,
  Typography,
  TextField,
  Select,
  InputLabel,
  Alert,
  Chip,
  Snackbar
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Location from "../Location/Location";
import { useParams, useNavigate } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";
import { getReviewByHouseId,requestRent } from "../../actions/rentals";
import GoogleMapReact from "google-map-react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataContext from "../../context/DataContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteHouseById } from "../../actions/rentals";
import { updateHouseById } from "../../actions/rentals";
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { CLEARSTATUS } from "../../constants/actionTypes";

const HouseDisplay = ({ rentals }) => {
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 5;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const {rentalValue, setRentalValue} = useContext(DataContext)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { houseId } = useParams();
  const [openDelete, setOpenDelete] = useState(false);
  const { user } = useContext(DataContext);
  const rental = rentals?.find((rentalId) => rentalId?._id === houseId);
  // console.log("here is the rental", rental);
  const [rentalData, setRentalData] = useState({
    name: rental?.name || '', 
    description: rental?.description || '', 
    numberOfRooms: rental?.numberOfRooms || null, 
    maxGuest: rental?.maxGuest || null, 
    pricePerNight: rental?.pricePerNight?.$numberDecimal || null, 
    location: rental?.location?._id || "", 
    amenities: rental?.amenities?.map(amenity => amenity._id) || [], 
    sharedBetween: rental?.sharedBetween || '', 
    housePhotos: rental?.housePhotos || [''], 
    reservedBy: rental?.reservedBy || null
  });

  useEffect(() => {
    dispatch(getReviewByHouseId(houseId));
    window.scrollTo(0, 0);
  }, [houseId]);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const review = useSelector((state) => state?.rentals?.getReview);

  // console.log('here is the data of reviews', review)

  function createData(property, value) {
    return { property, value };
  }

  const rows = [
    createData("Name", rental?.name),
    createData("Number of rooms", rental?.numberOfRooms),
    createData("Max guest", rental?.maxGuest),
    createData("shared between", rental?.sharedBetween),
  ];
  const {open, setOpen} = useContext(DataContext)
  const [openLocation, setOpenLocation] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openAmenity, setOpenAmenity] = useState(false);
  const [amenityName, setAmenityName] = useState([]);
  const amenities = useSelector((state) => state.rentals?.rentalDetails?.amenities)
  const selectedAmenityIds = amenityName?.map((name) => {
    const selectedAmenity = amenities?.find((amenity) => amenity?.name === name);
    return selectedAmenity?._id;
  });

  // console.log('here is the rental value', rentalValue)
  useEffect(() => {
    if (rental) {
      setRentalData(() => {
        return {
          ...rental,
          location: rental?.location?._id,
          amenities: rental?.amenities?.map((amenity) => amenity._id),
          pricePerNight: rental?.pricePerNight?.$numberDecimal
        };
      });
      setRentalValue(() => {
        return {
          ...rental
        }
      })
    }
  }, [rental]);
  
  // console.log('here is your rental Data state', rentalData)

  // console.log('here is your amenitis', amenities)
  // console.log(location_id,'here is youe rentalDetails reducer')
  const err = useSelector((state) => state?.rentals?.error);
  // console.log(err)
  
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAmenityName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
    };
    
    const handleCloseForm = () => {
      setOpen(false);
    };
    



  useEffect(() => {     
    setRentalData({
      ...rentalData,
      amenities: selectedAmenityIds,
    });
  }, [amenities, amenityName]);

  const clear = () => {
    setRentalData({
      name: "",
      description: "",
      numberOfRooms: null,
      maxGuest: null,
      pricePerNight: null,
      location: "",
      amenities: [""],
      sharedBetween: "",
      housePhotos: [""],
      reservedBy: [null],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(houseId){
      dispatch(updateHouseById(houseId, rentalData))
    } 
      setTimeout(() => {

        window.location.reload()
      },500)
  };
  
  const handleRequestRent = () => {
    dispatch(requestRent(houseId))
  }

  const error = useSelector((state) => state?.rentals?.requestStatus?.error)
  const requestStatus = useSelector((state) => state?.rentals?.requestStatus?.success)
  console.log(requestStatus)

  const canSave = rentalData.name && rentalData.numberOfRooms && rentalData.maxGuest && rentalData.pricePerNight && rentalData.location && rentalData.amenities
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setErrorAlertOpen(true);
      setTimeout(() => {
        setErrorAlertOpen(false);
        dispatch({type:CLEARSTATUS})
      }, 3000); // Adjust the duration as needed (3000 milliseconds = 3 seconds)
    }
  }, [error]);
  
  useEffect(() => {
    if (requestStatus) {
      setSuccessAlertOpen(true);
      setTimeout(() => {
        setSuccessAlertOpen(false);
        dispatch({type:CLEARSTATUS})
      }, 3000); // Adjust the duration as needed (3000 milliseconds = 3 seconds)
    }
  }, [requestStatus]);
  return (
    <div style={{ minHeight: "90vh", marginTop: "30px" }}>
      <Container maxWidth="lg">
      {errorAlertOpen  && <Alert severity="error" style={{marginBottom:'20px'}}>{error}</Alert>}
      {successAlertOpen  && <Alert severity="success" style={{marginBottom:'20px'}}>{requestStatus}</Alert>}
        <Grid container display={"flex"} spacing={4}>
          <Grid item xs={12} md={7}>
            <CardMedia
              style={{ minHeight: "350px", borderRadius: "12px" }}
              image={
                rental?.housePhotos?.fileName
                  ? `http://localhost:5000/api/static/${rental?.housePhotos?.fileName}`
                  : "https://media.istockphoto.com/id/149060607/photo/for-rent-sign-in-front-of-new-house.jpg?s=612x612&w=0&k=20&c=By627yICPZugFR1j2_a_7MCEn1f5ltYlivg6Tv50JaQ="
              }
              title={rental?.name}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={5}>
            <Card style={{ borderRadius: "10px", padding: "10px" }}>
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                style={{ padding: "10px" }}
              >
                <div>
                  <FavoriteIcon color="primary" style={{ cursor: "pointer" }} />
                  <br />
                  <span style={{ position: "relative", right: "3px" }}>
                    Save
                  </span>
                </div>
                {rental?.user?._id !== user?.user?._id &&
                <div>
                  <HomeIcon color="primary" style={{ cursor: "pointer", position:'relative', left:'25px' }} onClick={handleRequestRent}/>
                  <br />
                  <span style={{ position: "relative", right: "3px" }}>
                    Request Rent
                  </span>
                </div>}
                {rental?.user?._id === user?.user?._id && (
                  <div>
                    <EditIcon
                      color="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpen(true)}
                    />
                    <br />
                    <span style={{ position: "relative", right: "3px" }}>
                      Edit
                    </span>
                  </div>
                )}
                {rental?.user?._id === user?.user?._id && (
                  <div>
                    <DeleteIcon
                      color="error"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenDelete(true)}
                    />
                    <br />
                    <span style={{ position: "relative", right: "10px" }}>
                      Delete
                    </span>
                  </div>
                )}
                <div>
                  <ShareIcon color="primary" style={{ cursor: "pointer" }} />
                  <br />
                  <span style={{ position: "relative", right: "10px" }}>
                    Share
                  </span>
                </div>
              </Box>
              <Divider />
              <Grid
                container
                spacing={2}
                display={"flex"}
                justifyContent={"center"}
                style={{ padding: "10px" }}
              >
                <Grid item xs={2} md={4}>
                  <Avatar
                    src={
                      rental?.user?.profile?.profileImage
                        ? `http://localhost:5000/api/static/${rental?.user?.profile?.profileImage}`
                        : null
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  md={8}
                  style={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  {rental?.user?.firstName + " " + rental?.user?.lastName}
                </Grid>
              </Grid>
              {rental?.user?._id !== user?.user?._id && (
                <>
                  <Divider />
                  <div
                    style={{
                      padding: "20px 40px",
                    }}
                  >
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      style={{
                        fontWeight: "bold",
                        textTransform: "none",
                        marginTop: "5px",
                        borderRadius: "20px",
                      }}
                    >
                      <LocalPhoneIcon />
                      &nbsp;&nbsp;Call
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      style={{
                        fontWeight: "bold",
                        textTransform: "none",
                        marginTop: "10px",
                        borderRadius: "20px",
                        backgroundColor: "gray",
                        color: "white",
                      }}
                    >
                      <EmailIcon style={{ color: "white" }} />
                      &nbsp;&nbsp;Send Email
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
        <div style={{ padding: "20px" }}>
          <span style={{ fontSize: "25px" }}>
            Price:&nbsp;&nbsp;
            <span style={{ fontWeight: "bold" }}>
              {rental?.pricePerNight?.$numberDecimal}
            </span>
            &nbsp;$
          </span>
          <div style={{ marginTop: "30px" }}>
            <LocationOnIcon color="primary" fontSize="large" />
            <span
              style={{
                position: "relative",
                bottom: "10px",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              &nbsp;&nbsp;&nbsp;Country:&nbsp;{rental?.location?.country}
              &nbsp;&nbsp;&nbsp;City:&nbsp;{rental?.location?.city}
            </span>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2>Rental Details</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Rental Details
                        </TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.property}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.property}
                          </TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
          <div>
            <h2 style={{ marginTop: "50px" }}>Listing Description</h2>
            <span>{rental?.description}</span>
          </div>
          <div>
            <h2 style={{ marginTop: "50px" }}>Amenities</h2>
            <span>
              {rental?.amenities?.map((amenity, i) => (
                <Chip
                  label={amenity?.name}
                  key={i}
                  style={{ margin: "10px 0 10px 10px", fontWeight: "bold" }}
                />
              ))}
            </span>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2 style={{ marginBottom: "30px" }}>
              {review?.length}{" "}
              <span style={{ fontWeight: "bold" }}>reviews</span>
            </h2>
            <Grid container spacing={3}>
              {review?.map((rev, i) => (
                <Grid key={i} item xs={12} md={6} style={{ padding: "20px" }}>
                  <Box
                    display={"flex"}
                    justifyContent={"flexStart"}
                    gap={"20px"}
                  >
                    <Avatar
                      src={
                        rev?.user?.profile?.profileImage
                          ? `http://localhost:5000/api/static/${rev?.user?.profile?.profileImage}`
                          : null
                      }
                    />
                    <span
                      style={{
                        position: "relative",
                        top: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {rev?.user?.firstName + " " + rev?.user?.lastName}
                    </span>
                  </Box>
                  <div style={{ marginTop: "20px" }}>
                    <span style={{ fontSize: "18px", lineHeight: "30px" }}>
                      {rev?.text}
                    </span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2 style={{ marginBottom: "50px" }}>Where you’ll be</h2>
            <div>
              <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API }}
                style={{ position: "relative", height: "500px", top: "-20px" }}
                center={{
                  lat: rental?.location?.latitude,
                  lng: rental?.location?.longitude,
                }}
                defaultZoom={12}
                margin={[50, 50, 50, 50]}
                options={""}
              >
                <Box>
                  <LocationOnIcon
                    color="primary"
                    style={{ position: "relative" }}
                  />
                </Box>
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </Container>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete the rent?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this rental listing? This action
            cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              dispatch(deleteHouseById(rental?._id));
              handleClose();
              navigate("/");
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleCloseForm}>
        <Paper
          style={{
            padding: "10px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <CloseIcon
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            />
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                height: "50px",
                textAlign: "center",
              }}
            >
              {houseId ? "Edit your house" : "Rent your house"}
            </Typography>
            {err && (
              <Alert severity="error">
                {err?.errors?.location ||
                  err?.error ||
                  err?.errors?.amenities ||
                  err?.errors?.name ||
                  "Something went wrong"}
              </Alert>
            )}
            <TextField
              name="name"
              variant="outlined"
              label="Name"
              fullWidth
              value={rentalData.name}
              required={true}
              onChange={(e) =>
                setRentalData({ ...rentalData, name: e.target.value })
              }
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <TextField
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              value={rentalData.description}
              onChange={(e) =>
                setRentalData({ ...rentalData, description: e.target.value })
              }
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <TextField
              name="numberOfRooms"
              variant="outlined"
              label="Number of rooms"
              type="number"
              required
              fullWidth
              value={rentalData.numberOfRooms}
              onChange={(e) =>
                setRentalData({
                  ...rentalData,
                  numberOfRooms: parseFloat(e.target.value),
                })
              }
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <TextField
              name="maxGuest"
              variant="outlined"
              label="Max Guest Number"
              required
              fullWidth
              value={rentalData.maxGuest}
              onChange={(e) =>
                setRentalData({
                  ...rentalData,
                  maxGuest: parseFloat(e.target.value),
                })
              }
              type="number"
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <TextField
              name="pricePerNight"
              variant="outlined"
              label="Price per Night"
              required
              fullWidth
              value={rentalData.pricePerNight}
              onChange={(e) =>
                setRentalData({
                  ...rentalData,
                  pricePerNight: parseFloat(e.target.value),
                })
              }
              type="number"
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <TextField
              name="location"
              variant="outlined"
              required
              label="Specify your location"
              fullWidth
              onClick={() => setOpenLocation(true)}
              value={(rentalValue?.location?.country + ', ' +rentalValue?.location?.city) || ""}
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <InputLabel id="choose-amenity">Add your amenities</InputLabel>
            <Select
              labelId="choose-amenity"
              id="choose-amenity"
              fullWidth
              multiple
              value={amenityName}
              onChange={handleChange}
              input={<OutlinedInput label="Add your amenities" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              <Button
                onClick={() => setOpenAmenity(true)}
                style={{ height: "40px" }}
              >
                Add New Amenity <AddIcon color="primary" />
              </Button>
              {amenities?.map((amenity) => (
                <MenuItem
                  key={amenity?.name}
                  value={amenity?.name}
                  style={{ cursor: "default" }}
                >
                  <Checkbox checked={amenityName.indexOf(amenity?.name) > -1} />
                  <ListItemText primary={amenity?.name} />
                  <RemoveIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteAmenityById(amenity._id));
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="sharedBetween"
              variant="outlined"
              label="Shared Between"
              fullWidth
              value={rentalData.sharedBetween}
              onChange={(e) =>
                setRentalData({
                  ...rentalData,
                  sharedBetween: parseFloat(e.target.value),
                })
              }
              type="number"
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <TextField
              name="reservedBy"
              variant="outlined"
              label="Reserved By"
              fullWidth
              value={rentalData.reservedBy}
              onChange={(e) =>
                setRentalData({ ...rentalData, reservedBy: e.target.value })
              }
              style={{
                margin: "10px 0 10px 0",
              }}
            />
            <div
              style={{
                margin: "10px 0 10px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                variant="outlined"
                label="Insert Image"
                onClick={() => setOpenImage(true)}
                value={rentalData?.housePhotos || ""}
                fullWidth
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              style={{ marginBottom: "10px" }}
              disabled={!canSave}
            >
              {houseId ? "Edit your rental" : "Submit your rental"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      </Dialog>
      <Dialog open={openLocation} onClose={() => setOpenLocation(false)}>
        <Paper
          style={{
            padding: "10px",
          }}
        >
          <Location setOpenLocation={setOpenLocation} />
        </Paper>
      </Dialog>
    </div>
  );
};

export default HouseDisplay;
