import { Table, Pagination } from "@mantine/core";
import { Input, Avatar, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { getRequest } from "../../../../utils/helpers/helper";
import { useMemo, useState } from "react";

const ViewPatient = () => {
  //TODO:Fix Pagination Issue

  const [SearchQuery, setSearchQuery] = useState("");
  const [PageNo, setPageNo] = useState(0);
  const [PageSize, setPageSize] = useState(5);
  const [TotalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([]);
  console.log(users);

  const fetchUsers = async () => {
    try {
      const response = await getRequest(
        "user/" + `?search=${SearchQuery}&page=${PageNo}&size=${PageSize}`
      );
      console.log(response);
      if (response?.status == 200) {
        setUsers(
          response.data.users.filter((user) => user.userType == "Patient")
        );
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    fetchUsers();
  }, [SearchQuery, PageNo]);
  console.log(PageNo);

  const rows = users.map((element) => (
    <tr key={element.id}>
      <td>
        {" "}
        <Avatar
          src={`/usersImage/${element.image}`}
          alt={`${element.firstname} ${element.lastName}`}
          size="md"
          style={{ marginRight: "16px" }}
        />
      </td>
      <td>{element.firstname}</td>
      <td>{element.lastname}</td>
      <td>{element.email}</td>
      <td>{element.phone_number}</td>
      <td>
        <Button key={element.id}>View</Button>
      </td>
    </tr>
  ));

  const handleChange = (event) => {
    // Implement Debounching for Search Somthing after certain time
    const timeId = setTimeout(() => {
      setSearchQuery(event.target.value);
    }, 2000);

    return () => clearTimeout(timeId);
  };

  return (
    <>
      <Input
        icon={<IconSearch />}
        type="text"
        placeholder="Search By Name and email"
        mb={30}
        name="search"
        onChange={handleChange}
      />
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Avtar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        total={TotalPages}
        mt={20}
        position="center"
        value={PageNo}
        onChange={(num) => setPageNo(num - 1)}
      />
    </>
  );
};

export default ViewPatient;
