import { createContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux'

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude }}) => {
      setCoordinates({lat: latitude, lng: longitude})
      setBounds({ne:{lat:latitude+0.05,lng:longitude+0.03},sw:{lat:latitude-0.05, lng:longitude-0.03}})
    })
  },[])
  const [errMsg, setErrMsg] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
  const [open, setOpen] = useState(false);
  const [bounds, setBounds] = useState({})
  const [locationData, setLocationData] = useState({ country: "", city: "", latitude: "", longitude: "" });
  const [rentals, setRentals] = useState([])
  const [filteredRentals, setFilteredRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [rentalValue, setRentalValue] = useState({})
  const location_id = useSelector((state) => state?.rentals?.rentalDetails?.location?._id)
  // console.log('here is the location id ', location_id)
  const [rentalData, setRentalData] = useState({
    name: '', description: '', numberOfRooms: null, maxGuest: null, pricePerNight: null, location:location_id, amenities:[''],
    sharedBetween:'',housePhotos:[''], reservedBy:null
  });
  // console.log('here is your rental Data state', rentalData)
  // console.log('here is the rental value', rentalValue)
  useEffect(() => {
    if (location_id) {
      setRentalData(prevData => ({
        ...prevData,
        location: location_id
      }));
    }
  }, [location_id]);
 
  return (
    <DataContext.Provider value={{ 
      user, setUser, coordinates, 
    setCoordinates, bounds, setBounds,
    rentals, setRentals, errMsg, setErrMsg,
    loading, setLoading, open, setOpen,
    filteredRentals, setFilteredRentals,
    locationData, setLocationData, rentalValue,
    setRentalValue, rentalData, setRentalData}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
