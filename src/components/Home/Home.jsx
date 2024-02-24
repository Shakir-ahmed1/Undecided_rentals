import { useEffect } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import { Button, Paper, Typography, TextField } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";
import FileBase from 'react-file-base64';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux'
import { postRentalDetails } from "../../actions/rentals";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(DataContext)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [rentalData, setRentalData] = useState({
    name: '', description: '', numberOfRooms: '', maxGuest: '', pricePerNight: '', location:'', amenities:[''],
    sharedBetween:'',housePhotos:[''], reservedBy:['']
  });
  console.log('here is the rentalData that is posted', rentalData)
  const clear = () => {
    setRentalData({
      name: '', description: '', numberOfRooms: '', maxGuest: '', pricePerNight: '', location:'', amenities:[''],
      sharedBetween:'',housePhotos:[''], reservedBy:['']
    });
}
const handleClickOpen = () => {
  setOpen(true);
  clear();
};

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(postRentalDetails, rentalData)
}

const handleClose = () => {
  setOpen(false);
};
  return (
    <>
    {user && (
      <div style={{display:'flex', justifyContent:'center'}}>
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Rent Your House
        </Button>
        <Dialog 
          open={open}
          onClose={handleClose}
          PaperProps={{
            onSubmit: () => {
              handleClose();
            },
          }}
      >
        <Paper style={{
          padding:'10px'
        }}>
          <form autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
                >
                  <CloseIcon onClick={handleClose} style={{cursor:'pointer'}}/>
                  <Typography variant="h5" style={{fontWeight:'bold',height:'50px', textAlign:'center'}}>Renting your house</Typography>
                  <TextField
                      name="name"
                      variant="outlined"
                      label="Name"
                      fullWidth
                      value={rentalData.name}
                      required
                      onChange={(e) => setRentalData({ ...rentalData, name:e.target.value })}
                      style={{
                        margin:'10px 0 10px 0'
                      }}
                      />
                  <TextField
                      name="description"
                      variant="outlined"
                      label="Description"
                      fullWidth
                      value={rentalData.description}
                      onChange={(e) => setRentalData({ ...rentalData, description:e.target.value })}
                      style={{
                        margin:'10px 0 10px 0'
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
                      onChange={(e) => setRentalData({ ...rentalData, numberOfRooms:e.target.value })}
                      style={{
                        margin:'10px 0 10px 0'
                      }}
                      />
                  <TextField
                      name="maxGuest"
                      variant="outlined"
                      label="Max Guest Number"
                      required
                      fullWidth
                      value={rentalData.maxGuest}
                      onChange={(e) => setRentalData({ ...rentalData, maxGuest:e.target.value })}
                      type="number"
                      style={{
                        margin:'10px 0 10px 0'
                      }}
                      />
                  <TextField
                      name="pricePerNight"
                      variant="outlined"
                      label="Price per Night"
                      required
                      fullWidth
                      value={rentalData.pricePerNight}
                      onChange={(e) => setRentalData({ ...rentalData, pricePerNight:e.target.value })}
                      type="number"
                      style={{
                        margin:'10px 0 10px 0'
                  }}
                  />
                  <TextField
                      name="location"
                      variant="outlined"
                      label="Location"
                      required
                      fullWidth
                      value={rentalData.location}
                      onChange={(e) => setRentalData({ ...rentalData, location:e.target.value })}
                      style={{
                        margin:'10px 0 10px 0'
                  }}
                  />
                  <TextField
                      name="amenities"
                      variant="outlined"
                      label="Amenities"
                      fullWidth
                      value={rentalData.amenities}
                      onChange={(e) => setRentalData({ ...rentalData, amenities:e.target.value })}
                      style={{
                        margin:'10px 0 10px 0'
                  }}
                  />
                  <TextField
                      name="sharedBetween"
                      variant="outlined"
                      label="Shared Between"
                      fullWidth
                      value={rentalData.sharedBetween}
                      onChange={(e) => setRentalData({ ...rentalData, sharedBetween:e.target.value })}
                      type="number"
                      style={{
                        margin:'10px 0 10px 0'
                  }}
                  />
                  <TextField
                      name="reservedBy"
                      variant="outlined"
                      label="Reserved By"
                      fullWidth
                      value={rentalData.reservedBy}
                      onChange={(e) => setRentalData({ ...rentalData, reservedBy:e.target.value })}
                      style={{
                        margin:'10px 0 10px 0'
                  }}
                  />
                  <div style={{
                        margin:'10px 0 10px 0',
                        display:'flex',
                        justifyContent:'space-between'
                      }}>
                      <span>
                        <p style={{position:'relative', bottom:'10px', fontWeight:'bold'}}>House Photos:</p>
                      </span>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({base64}) => setRentalData({ ...rentalData, selectedFile: base64})}
                    />
                  </div>
                  <Button variant="contained" color="primary" size="large" type="submit" fullWidth style={{marginBottom:'10px'}} disabled={''}>Submit</Button>
                  <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
      </Dialog>
      </div>
    )}
    <div style={{ minHeight: "100vh" }}>
      <List />
      <Map />
    </div>
    </>
    
  );
};

export default Home;
