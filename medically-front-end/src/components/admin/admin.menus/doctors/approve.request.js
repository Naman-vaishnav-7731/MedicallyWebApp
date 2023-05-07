import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardSection,
  Divider,
  Text,
  Badge,
  Container,
} from "@mantine/core";
import { getRequest } from "../../../../utils/helpers/helper";
import { useMemo } from "react";

const ApproveRequest = () => {
  const [approveRequest, setapproveRequest] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getRequest("user/");
      console.log(response);
      if (response?.status == 200) {
        setapproveRequest(
          response.data.users.filter((user) => user.userType == "Doctor")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(approveRequest);

  useMemo(() => {
    fetchUsers();
  }, []);

  const renderFollowRequest = (request) => (
    <div
      key={request.id}
      style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
    >
      <Avatar
        src={`/usersImage/${request.image}`}
        alt={`${request.firstname} ${request.lastName}`}
        size="md"
        style={{ marginRight: "16px" }}
      />
      <div style={{ flex: 1 }}>
        <Text weight={500}>{`${request.firstname} ${request.lastname}`}</Text>
        <Badge
          variant="outline"
          color="indigo"
          size="sm"
          style={{ marginTop: "4px" }}
        >
          Approve Request
        </Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button variant="outline" style={{ marginRight: "16px" }}>
          View
        </Button>
        <Button variant="outline" color="red" style={{ marginRight: "16px" }}>
          Decline
        </Button>
        <Button color="teal">Approve</Button>
      </div>
    </div>
  );

  return (
    <Container>
      <Text weight={700} size="lg" style={{ marginBottom: "16px" }}>
        Doctor Approve requests
      </Text>
      {approveRequest.length > 0 ? (
        approveRequest.map(renderFollowRequest)
      ) : (
        <Text color="gray" size="sm">
          No Doctors requests
        </Text>
      )}
    </Container>
  );
};

export default ApproveRequest;
