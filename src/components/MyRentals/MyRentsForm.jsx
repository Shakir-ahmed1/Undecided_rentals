import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography, TextField, Dialog, Paper } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { postRentalDetails, deleteAmenityById, getRentalData, updateHouseById } from "../../actions/rentals";
import { useContext, useEffect, useState } from "react";
import Location from "../Location/Location";
import Amenity from "../Amenity/Amenity";
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from "../Image/Image";
import DataContext from "../../context/DataContext";
import { useParams, useNavigate } from 'react-router-dom';

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

const MyRentalForm = () => {
  const navigate = useNavigate()
  const { houseId } = useParams()
  // console.log('here is the useParams hook', houseId)
  const [rentalData, setRentalData] = useState({
    name: '', description: '', numberOfRooms: null, maxGuest: null, pricePerNight: null, location:"", amenities:[''],
    sharedBetween:'',housePhotos:[''], reservedBy:null
  });
  const dispatch = useDispatch();
  const {open, setOpen} = useContext(DataContext)
  const [openLocation, setOpenLocation] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openAmenity, setOpenAmenity] = useState(false);
  const [amenityName, setAmenityName] = useState([]);
  const location_id = useSelector((state) => state.rentals?.rentalDetails || '')
  const amenities = useSelector((state) => state.rentals?.rentalDetails?.amenities)
  const selectedAmenityIds = amenityName?.map((name) => {
    const selectedAmenity = amenities?.find((amenity) => amenity?.name === name);
    return selectedAmenity?._id;
  });
  const EditRentalData = useSelector((state) => (houseId ? state?.rentals?.getAllRentals?.find((rental) => rental?._id === houseId) : null));
  // console.log('here is the data of the edited rental',EditRentalData)

  useEffect(() => {
    if (EditRentalData) {
      setRentalData({
        ...EditRentalData,
        location: EditRentalData?.location?._id,
        amenities: EditRentalData?.amenities?.map((amenity) => amenity._id),
        pricePerNight:EditRentalData?.pricePerNight?.$numberDecimal
      });
    }
  },[EditRentalData])
  // console.log('here is your rentals Data', rentalData)
  // console.log('here is your amenitis', amenities)
  // console.log(location_id,'here is youe rentalDetails reducer')
  const err = useSelector((state) => state.rentals?.error);
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

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (houseId) {
      setRentalData({
        ...EditRentalData,
        location: EditRentalData?.location?._id
      })
    } else {
      setRentalData({ ...rentalData, location: location_id?.location?._id });
    }
    console.log('here is your rental Data state', rentalData)
}, [location_id]);

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

  const handleClickOpen = () => {
    setOpen(true);
    navigate('/my_rentals');
    clear()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(houseId){
      dispatch(updateHouseById(houseId, rentalData))
    } else {
      dispatch(postRentalDetails(rentalData));
    }
    dispatch(getRentalData())
      setTimeout(() => {

        window.location.reload()
      },2000)
  };


  const canSave = rentalData.name && rentalData.numberOfRooms && rentalData.maxGuest && rentalData.pricePerNight && rentalData.location && rentalData.amenities
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button color="primary" variant="contained" onClick={handleClickOpen} style={{marginBottom:'20px'}}>
        Rent Your House
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
              {houseId ? 'Edit your house' : 'Rent your house'}
            </Typography>
            {err && (
              <Alert severity="error">
                {err?.errors?.location ||
                  err?.error ||
                  err?.errors?.amenities ||
                  err?.errors?.name ||
                  "Something went wrong"}
              </Alert>)}
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
              value={rentalData.location || ''}
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
              <Button onClick={() => setOpenAmenity(true)} style={{height:'40px'}}>Add New Amenity <AddIcon color="primary"/></Button>
              {amenities?.map((amenity) => (
                <MenuItem key={amenity?.name} value={amenity?.name} style={{cursor:'default'}}>
                  <Checkbox checked={amenityName.indexOf(amenity?.name) > -1} />
                  <ListItemText primary={amenity?.name} />
                  <RemoveIcon style={{color:'red', cursor:'pointer'}} onClick={(e) => {
                    e.stopPropagation() 
                    dispatch(deleteAmenityById(amenity._id))
                    }}/>
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
                setRentalData({ ...rentalData, sharedBetween: parseFloat(e.target.value) })
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
              value={rentalData?.housePhotos || ''}
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
              { houseId ? 'Edit your rental' : 'Submit your rental' }
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
      <Dialog open={openAmenity} onClose={() => setOpenAmenity(false)}>
        <Paper
          style={{
            padding: "10px",
          }}
        >
          <Amenity setOpenAmenity={setOpenAmenity} />
        </Paper>
      </Dialog>
      <Dialog open={openImage} onClose={() => setOpenImage(false)}>
        <Paper
          style={{
            padding: "10px",
          }}
        >
          <Image setOpenImage={setOpenImage} />
        </Paper>
      </Dialog>
    </div>
  );
};

export default MyRentalForm;
