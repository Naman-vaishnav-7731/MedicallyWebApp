import { Route, Routes } from "react-router-dom";
import Home from "./components/main/home";
import Main from "./components/main/main";
import Login from "./components/login/login";
import Registration from "./components/registration/registration";
import Pagenotfound from "./components/pagenotfound";
import AdminLogin from "./components/admin/admin.login";
import AdminDashboard from "./components/admin/admin.dashboard/admin.dashboard";
import UserRoleCard from "./components/google-signup/userrole.card";

const Routers = () => {
  return (
    <Routes>
      {/* Implement Spreate Login Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/userrole" element={<UserRoleCard />} />

      {/* Implement Nested Routing*/}
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
      </Route>

      {/* Implement admin Route */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />}>

      </Route>


      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
};

export default Routers;
