import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
  Dialog
} from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from '@mui/material/Skeleton';
import {Link} from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import { useSelector, useDispatch } from "react-redux"
// import {  NOTLOADING } from "../../constants/actionTypes";
import { deleteHouseById } from "../../actions/rentals";

const RentEase = ({ rental }) => {
  const dispatch = useDispatch()
  const [openDelete, setOpenDelete] = useState(false)
  const { user, setOpen} = useContext(DataContext)
  // const loading = useSelector((state) => state.rentals.loading)
  // console.log('here is the loading state', loading)

  // useEffect(() => {
  //   dispatch({type:NOTLOADING})
  // }, [])
  const handleClose = () => {
    setOpenDelete(false)
  }
  return (
    <>
        <Card elevation={6} style={{ position: "relative" }}>
        <CardMedia
          component={Link}
          to={`/houseDisplay/${rental?._id}`}
          style={{ minHeight: "250px" }}
          image={
            rental?.housePhotos?.fileName
              ? `http://localhost:5000/api/static/${rental?.housePhotos?.fileName}`
              : "https://media.istockphoto.com/id/149060607/photo/for-rent-sign-in-front-of-new-house.jpg?s=612x612&w=0&k=20&c=By627yICPZugFR1j2_a_7MCEn1f5ltYlivg6Tv50JaQ="
          }
          title={rental?.name}
        />
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            position: "absolute",
            top: "5px",
            left: "10px",
            color: "white",
          }}
        >
          {rental?.user?.firstName + " " + rental?.user?.lastName}
        </Typography>
        {(user?.user?._id === rental?.user?._id) &&
        <Link to={`/house/${rental?._id}`}>
          <Button  style={{
            position: "absolute",
            top: "0",
            right: "0",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
          >
            <MoreVertIcon
              fontSize="large"
            />
          </Button>
        </Link>
        }
        <CardContent>
          <Typography gutterBottom variant="h6">
            {rental?.name}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">
              <LocationOnIcon />
            </Typography>
            <Typography variant="subtitle1">
              <b>Country:</b> {(rental?.location?.country || "")}
              <br/>
              <b>City:</b>{(rental?.location?.city || "")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Max Guest</Typography>
            <Typography variant="subtitle1">{rental?.maxGuest}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Number of rooms</Typography>
            <Typography variant="subtitle1">
              {rental?.numberOfRooms}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Amenities:</Typography>
            <div>
              {rental?.amenities?.map((amenity, i) => (
                <Chip
                  label={amenity?.name}
                  key={i}
                  style={{ margin: "10px 0 10px 10px", fontWeight: "bold" }}
                />
              ))}
            </div>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price per Night</Typography>
            <Typography variant="subtitle1">
              {rental?.pricePerNight?.$numberDecimal + "$"}
            </Typography>
          </Box>
        </CardContent>
        <Box display="flex" justifyContent="space-between">
          <FavoriteBorderIcon
            fontSize="large"
            color="primary"
            variant="contained"
            style={{
              position: "relative",
              bottom: "10px",
              left: "10px",
              cursor: "pointer",
            }}
          />
          {(user?.user?._id === rental?.user?._id) &&
            <Button
              variant="contained"
              color="error"
              style={{ position: "relative", right: "10px", bottom: "10px" }}
              onClick={() => setOpenDelete(true)}
            >
            <DeleteIcon fontSize="small" style={{color:'white'}}/>&nbsp;
              Delete
            </Button>
          }        
        </Box>
      </Card>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
      <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete the rent?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this rental listing? This action cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={() => {
            dispatch(deleteHouseById(rental?._id))
            handleClose()
          }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RentEase;
