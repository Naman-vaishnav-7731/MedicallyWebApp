import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from "@tabler/icons-react";

export const mockdata = [
  { label: "Dashboard", icon: IconGauge },
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
  { label: "Analytics", icon: IconPresentationAnalytics },
];
