import { Grid, Button, Text, Card, Avatar } from "@mantine/core";

const Doctors = ({ doctorData }) => {
  return (
    <Grid columns={3} spacing={50} sx={{ gap: "20px" }}>
      {doctorData.map((doctor) => (
        <Card key={doctor.id} shadow="sm" radius="md" style={{ maxWidth: 300 }}>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <Avatar
              src={`/usersImage/${doctor.image}`}
              alt={doctor.name}
              style={{ marginRight: 10 }}
            />
            <div>
              <Text weight={500}>
                {doctor?.firstname} {doctor?.lastname}
              </Text>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Text>{doctor?.address}</Text>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <Text size="sm" style={{ marginRight: 5 }}>
              {doctor.rating}
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="16"
              height="16"
            >
              <path
                fillRule="evenodd"
                d="M19.896 7.784l-6.207-.905L10 1.306 6.311 6.88l-6.207.904 4.497 4.11L3.532 18.06l6.468-3.954 6.468 3.954-1.069-5.166 4.497-4.11zM10 15.167l-3.703 2.263.762-3.693-2.942-2.548 3.858-.56L10 6.333l1.025 3.896 3.858.56-2.942 2.548.762 3.693L10 15.167z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginRight: 10 }}>
              <Text size="sm">{doctor?.specialization}</Text>
            </div>
            <Button variant="outline">View</Button>
          </div>
        </Card>
      ))}
    </Grid>
  );
};

export default Doctors;
