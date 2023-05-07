import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconHomeMove,
} from "@tabler/icons-react";

export const mockdata = [
  { label: "Home", icon: IconHomeMove, link: "/" },
  { label: "My Dashboard", icon: IconGauge , link:'/dashboard'},
  {
    label: "Doctor",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Add Doctor", link: "adddoctors" },
      { label: "View Doctor", link: "viewdoctors" },
      { label: "Approve Request", link: "approverequest" },
    ],
  },
  {
    label: "Patient",
    icon: IconCalendarStats,
    links: [
      { label: "Add Patient", link: "addpatient" },
      { label: "View Patient", link: "viewpatient" },
    ],
  },
];
