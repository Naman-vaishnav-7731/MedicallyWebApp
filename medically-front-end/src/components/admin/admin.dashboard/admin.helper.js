import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconHomeMove
} from "@tabler/icons-react";

export const mockdata = [
  { label: "Home", icon: IconHomeMove , link:'/'},
  { label: "My Dashboard", icon: IconGauge },
  {
    label: "Doctor",  
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Add Doctor", link: "/" },
      { label: "View Doctor", link: "/" },
    ],
  },
  {
    label: "Patient",
    icon: IconCalendarStats,
    links: [
      { label: "Add Patient", link: "/" },
      { label: "View Patient", link: "/" },
    ],
  },
];
