import { UserCardImage } from "../../UserCardImage/user.card.image";
import img from "../../../assests/image/naman.jpg";
import { Tabs, Container } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useContext, useMemo } from "react";
import { UserContext } from "../../../context/userContext";
import { getRequest } from "../../../utils/helpers/helper";
import EditUser from "./edituser/edituser";

const Profile = () => {
  const { loggedUserdata, setloggedUserdata } = useContext(UserContext);  
  const userEmail = JSON.parse(localStorage.getItem("userData")).email;

  useMemo(async () => {
    try {
      const response = await getRequest("user/" + userEmail);
      if (response.status == 200) {
        setloggedUserdata(response?.data);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const bgImg =
    "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
  const stats = [
    {
      fname: loggedUserdata?.firstname,
      lname: loggedUserdata?.lastname,
      address: loggedUserdata?.email,
    },
  ];

  return (
    <>
      <UserCardImage
        image={bgImg}
        avatar={`/usersImage/${loggedUserdata?.image}`}
        name={"namna"}
        stats={stats}
      />
      <Container>
        <Tabs defaultValue="myprofile">
          <Tabs.List>
            <Tabs.Tab value="myprofile" icon={<IconUserCircle size="0.8rem" />}>
              My Profile
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="myprofile" pt="xs">
            <Container
              size={500}
              sx={{ border: "1px solid #e9ecef" }}
              p={20}
              mb={20}
              mt={10}
            >
              {" "}
              <EditUser />
            </Container>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default Profile;
