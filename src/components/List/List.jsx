import RentEase from "../RentEase/RentEase"
import {Grid} from "@mui/material"
import { useContext } from "react"
import DataContext from "../../context/DataContext"

const List = () => {
  const { rentals } = useContext(DataContext)
  // console.log('rentals in list', rentals)
  return (
    <Grid container spacing={3} padding={"10px"}>
      {rentals?.map((rental,i) => (
        <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
          <RentEase rental={rental}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default List