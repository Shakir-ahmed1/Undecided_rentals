import { useDispatch } from "react-redux";
import { useState } from "react";
import { TextField, Button } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { postRentalAmenity } from "../../actions/rentals";

const Amenity = ({ setOpenAmenity }) => {
  const dispatch = useDispatch();
  const [amenityData, setAmenityData] = useState({ name: "" });
  // console.log(amenityData, 'here is the data of amenity')

  const back = () => {
    setOpenAmenity(false);
  };

  const handleAmenitySubmit = (e) => {
    e.preventDefault();
    dispatch(postRentalAmenity(amenityData));
    setOpenAmenity(false);
  };
  return (
    <div>
      <form action="" onSubmit={handleAmenitySubmit}>
        <CloseIcon
          onClick={() => setOpenAmenity(false)}
          style={{ cursor: "pointer" }}
        />
        <h1>Add your amenities</h1>
        <TextField
          value={amenityData.name}
          label={"Name"}
          onChange={(e) =>
            setAmenityData({ ...amenityData, name: e.target.value })
          }
          fullWidth
          name="name"
          variant="outlined"
          style={{
            margin: "10px 0 10px 0",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          style={{ marginBottom: "10px" }}
          disabled={""}
        >
          Add Amenity
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
    </div>
  );
};

export default Amenity