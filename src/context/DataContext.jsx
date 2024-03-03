import { createContext, useEffect, useState } from "react";

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
  const [rentals, setRentals] = useState([])
  const [filteredRentals, setFilteredRentals] = useState([])
  const [loading, setLoading] = useState(true)
 
  return (
    <DataContext.Provider value={{ 
      user, setUser, coordinates, 
    setCoordinates, bounds, setBounds,
    rentals, setRentals, errMsg, setErrMsg,
    loading, setLoading, open, setOpen,
    filteredRentals, setFilteredRentals}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
