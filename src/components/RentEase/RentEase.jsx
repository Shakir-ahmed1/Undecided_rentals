import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PhoneIcon from "@mui/icons-material/Phone";
import Skeleton from '@mui/material/Skeleton';
import { useContext } from "react";
import DataContext from "../../context/DataContext";

const RentEase = ({ rental }) => {
  const {loading} = useContext(DataContext)
  return (
    <>
      {!loading ? (
        <Card elevation={6} style={{ position: "relative" }}>
          <CardMedia
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
          <MoreVertIcon
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "white",
              cursor: "pointer",
            }}
            fontSize="large"
          />
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
                <br />
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
            <Button
              variant="contained"
              color="error"
              style={{ position: "relative", right: "10px", bottom: "10px" }}
            >
              Delete
            </Button>
          </Box>
        </Card>
      ) : (
        <Skeleton animation="wave" height={10} width="40%" />
      )}
    </>
  );
};

export default RentEase;
