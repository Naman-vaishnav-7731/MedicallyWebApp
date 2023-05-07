import { Route, Routes } from "react-router-dom";
import Home from "./components/main/home";
import Main from "./components/main/main";
import Login from "./components/login/login";
import Registration from "./components/registration/registration";
import Pagenotfound from "./components/pagenotfound";
import AdminLogin from "./components/admin/admin.login";
import AdminDashboard from "./components/admin/admin.dashboard/admin.dashboard";
import UserRoleCard from "./components/google-signup/userrole.card";
import OurDoctors from "./components/doctor/our.doctor";
import Chat from "./components/chat/chat";
import Profile from "./components/user/profile/profile";
import MyDashboard from "./components/admin/admin.menus/mydashboard";
import ViewDoctors from "./components/admin/admin.menus/doctors/view.doctor";
import AddDoctors from "./components/admin/admin.menus/doctors/add.doctor";
import AddPatient from "./components/admin/admin.menus/patients/add.patient";
import ApproveRequest from "./components/admin/admin.menus/doctors/approve.request";
import ViewPatient from "./components/admin/admin.menus/patients/view.patient";

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
        <Route path="ourdoctors" element={<OurDoctors />} />
        <Route path="chatroom" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Implement admin Route */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />}>
        <Route index element={<MyDashboard />} />
        <Route path="viewdoctors" element={<ViewDoctors />} />
        <Route path="adddoctors" element={<AddDoctors />} />
        <Route path="addpatient" element={<AddPatient />} />
        <Route path="approverequest" element={<ApproveRequest />} />
        <Route path="viewpatient" element={<ViewPatient />} />
      </Route> 

      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
};

export default Routers;
