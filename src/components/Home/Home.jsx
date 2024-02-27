import { useEffect } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import Form from "../Form/Form";

const Home = () => {
  const { user} = useContext(DataContext);
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {user && (
        <Form />
      )}
      <div style={{ minHeight: "100vh" }}>
        <List />
        <Map />
      </div>
    </>
  );
};

export default Home;
