import { useEffect } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile } from "../../actions/users";
import { getRentalData } from "../../actions/rentals";

const Home = () => {
  const dispatch = useDispatch()
  const { user, filteredRentals} = useContext(DataContext);
  
  // useEffect(() => {
  //   getRentalData()
  // },[])
  
  // const rentDetails = useSelector((state) => state.rentals.getAllRentals)
  // useEffect(() => {
  //   setRentals(rentDetails)
  // }, [rentDetails])
  // console.log(user)
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getUserProfile(user?.user?._id))
  },[user])

  return (
    <>
      {user && (
        <Form />
      )}
      <div style={{ minHeight: "100vh" }}>
        <List rentals={filteredRentals}/>
        <Map rentals={filteredRentals}/>
      </div>
    </>
  );
};

export default Home;
