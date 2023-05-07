import Routers from "./router";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

function App() {
  const loading = useRef(null);
  const location = useLocation();
  const { setisLogged, setadminLogged } = useContext(UserContext);

  const handleAdmin = () => {
    const role = JSON.parse(localStorage.getItem("Role"));
    if (role == "Admin") setadminLogged(true);
    if (role == "Doctor" || role == "Patient") setisLogged(true);
  };

  useEffect(() => {
    loading?.current?.continuousStart(0, 100);
    handleAdmin();

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    promise.then(() => {
      loading?.current?.complete();
    });
  }, [location]);

  return (
    <>
      <LoadingBar color="#4dabf7" loaderSpeed={100} ref={loading} height={3} />
      <Routers />
    </>
  );
}

export default App;
