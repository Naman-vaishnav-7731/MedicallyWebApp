import { Container, Pagination, Input , Divider } from "@mantine/core";
import FilterSidebar from "./ourdoctors/filter.sidebar";
import Doctors from "./ourdoctors/doctors";
import { IconSearch } from "@tabler/icons-react";
import { getRequest } from "../../utils/helpers/helper";
import { useMemo, useState } from "react";

const OurDoctors = () => {
  const [doctorData, setdoctorData] = useState([]);
  const [SearchQuery, setSearchQuery] = useState("");
  const [PageNo, setPageNo] = useState(0);
  const [PageSize, setPageSize] = useState(9);
  const [TotalPages, setTotalPages] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await getRequest(
        "user/" + `?search=${SearchQuery}&page=${PageNo}&size=${PageSize}`
      );
      console.log(response);
      if (response?.status == 200) {
        setdoctorData(
          response.data.users.filter((user) => user.userType == "Doctor")
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

  const handleChange = (event) => {
    // Implement Debounching for Search Somthing after certain time
    const timeId = setTimeout(() => {
      setSearchQuery(event.target.value);
    }, 2000);

    return () => clearTimeout(timeId);
  };

  return (
    <Container fluid mt={50} mb={30}>
      <div style={{ display: "flex" }}>
        {/* <div style={{ marginRight: 20 }}>
          <FilterSidebar />
        </div> */}

        <Container size={1000}>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {" "}
            <Input
              icon={<IconSearch />}
              type="text"
              placeholder="Search Our Doctors"
              mb={30}
              name="search"
              onChange={handleChange}
            />
          </div>{" "}
          <Doctors doctorData={doctorData} />
          <Pagination
            total={TotalPages}
            mt={20}
            position="center"
            value={PageNo}
            onChange={(num) => setPageNo(num - 1)}
          />
        </Container>
      </div>
    </Container>
  );
};

export default OurDoctors;
