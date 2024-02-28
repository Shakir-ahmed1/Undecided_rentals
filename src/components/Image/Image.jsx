import {TextField, Button} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { getRentalData, uploadPostPhoto } from "../../actions/rentals";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import FileBase from "react-file-base64"

const Image = ({setOpenImage}) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState([])
    console.log(image)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(uploadPostPhoto(image))
        dispatch(getRentalData())
    }
    
  return (
    <div>
        <form action="http://localhost:5000/api/house/photos" onSubmit={handleSubmit} encType="multipart/form-data">
        <CloseIcon
            onClick={() => setOpenImage(false)}
            style={{ cursor: "pointer" }}
        />
        <h1>Insert Your Image</h1>
        <FileBase 
            type="file"
            name="Image"
            multiple={false}
            onDone={({base64}) => setImage({...image, Image:base64})} 
        />
        <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            value="upload"
            style={{ margin: "10px 0" }}
            disabled={!image}
        >
            Insert Your Image
        </Button>
        <Button
            variant="contained"
            color="secondary"
            size="large"
            value="Upload"
            onClick={() => setOpenImage(false)}
            fullWidth
        >
            back
        </Button>
        </form>
    </div>
  )
}

export default Image