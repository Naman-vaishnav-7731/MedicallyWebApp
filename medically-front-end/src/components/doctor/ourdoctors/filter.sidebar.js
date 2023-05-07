import { useState } from "react";
import {
    Grid,
    TextInput,
    Button,
    Select,
    Text,
    Card,
    Avatar,
  } from "@mantine/core";

const FilterSidebar = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState("");

  const handleSpecialistChange = (value) => {
    setSelectedSpecialist(value);
  };

  return (
    <div style={{ width: 250 }}>
      <TextInput placeholder="Search" style={{ marginBottom: 10 }} />
      <Select
        placeholder="Select specialist"
        data={[
          "Cardiology",
          "Pediatrics",
          "Neurology",
          "Dermatology",
          "Ophthalmology",
          "Gynecology",
        ]}
        value={selectedSpecialist}
        onChange={handleSpecialistChange}
        style={{ marginBottom: 10 }}
      />
      <Button variant="outline">Filter</Button>
    </div>
  );
};

export default FilterSidebar;
