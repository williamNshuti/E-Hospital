import React from "react";
import {
  IconGasStation,
  IconLayoutDashboard,
  IconLogout,
  IconReport,
  IconReportMoney,
  IconUser,
} from "@tabler/icons-react";

export const defaultNavItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: <IconLayoutDashboard className="w-6 h-6" />,
  },
  {
    label: "Physicists ",
    href: "/team",
    icon: <IconReportMoney className="w-6 h-6" />,
  },
  {
    label: "Pharmacists",
    href: "/projects",
    icon: <IconUser className="w-6 h-6" />,
  },
  {
    label: "Patients ",
    href: "/calendar",
    icon: <IconUser className="w-6 h-6" />,
  },
];
