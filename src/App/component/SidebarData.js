import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

const user = JSON.parse(localStorage.getItem("auth"));
console.log(user?.USER?.userType, "user");

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  // {
  //   title: "Physicists ",
  //   path: "/Physicist",
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Pharmacists",
  //   path: "/Pharmacist",
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Patients",
  //   path: "/Patient",
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: "nav-text",
  // },
];

if (user?.USER?.userType === "PATIENT") {
  SidebarData.push(
    {
      title: "Physicists ",
      path: "/Physicist",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
    },
    {
      title: "Pharmacists",
      path: "/Pharmacist",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
    }
  );
} else if (
  user?.USER?.userType === "PHARMACIST" ||
  user?.USER?.userType === "PHYSICIST"
) {
  SidebarData.push({
    title: "Patients",
    path: "/Patient",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  });
}

export function getSidebarData(userType) {
  const sidebarData = [
    {
      title: "Home",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  ];

  if (userType === "PATIENT") {
    sidebarData.push(
      {
        title: "Physicists ",
        path: "/Physicist",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text",
      },
      {
        title: "Pharmacists",
        path: "/Pharmacist",
        icon: <FaIcons.FaCartPlus />,
        cName: "nav-text",
      }
    );
  } else if (userType === "PHYSICIST") {
    sidebarData.push({
      title: "My Patients",
      path: "/Patient/physicist",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    });
  } else if (userType === "PHARMACIST") {
    sidebarData.push({
      title: "My Patients",
      path: "/Patient/pharmacist",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    });
  }

  return sidebarData;
}
