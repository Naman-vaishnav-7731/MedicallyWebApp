import { Headbar } from "./header/header";
import Footer from "./footer/footer";
import { Outlet } from "react-router-dom";

const Main = () => {
    return(
        <>
            <Headbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Main;