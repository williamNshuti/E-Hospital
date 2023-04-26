import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { defaultNavItems } from "./defaultNavItems";
import {
  Avatar,
  Container,
  createStyles,
  Group,
  Image,
  Navbar,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconGasStation,
  IconLayoutDashboard,
  IconLogout,
  IconReport,
  IconReportMoney,
  IconUser,
} from "@tabler/icons-react";
import { SidebarData, getSidebarData } from "../SidebarData";
import { saveUser } from "../../redux/Actions/user.action";
import { useDispatch, useSelector } from "react-redux";

const useStyles = createStyles((theme, _params) => {
  const iconRef = useRef(null);

  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.blue[0],
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 4,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.focusStyles,
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      marginBottom: 5,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[9],

        [`& .${iconRef.current}`]: {
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
        },
      },
    },

    linkIcon: {
      ref: iconRef,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[2]
            : theme.colors.blue[1],
        color: theme.colorScheme === "dark" ? theme.colors.white : "#2E8BC0",
        [`& .${iconRef.current}`]: {
          color: theme.colorScheme === "dark" ? theme.colors.white : "#2E8BC0",
        },
      },
    },
  };
});

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/gas-stations", label: "Gas Stations", icon: IconGasStation },
  { link: "/finances", label: "Finances", icon: IconReportMoney },
  { link: "/reports", label: "Reports", icon: IconReport },
  // { link: '/profile', label: 'Profile', icon: IconUser },
];

const Sidebar = ({ open, navItems = defaultNavItems, setOpen }) => {
  const { user } = useSelector(({ User }) => User);
  const { classes, cx } = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarData = getSidebarData(user?.USER?.userType);

  const logout = () => {
    localStorage.removeItem("auth");
    dispatch(saveUser(null));
    navigate("/authantication");
  };

  const linkss = data.map((item) => (
    <Link to={item.link} key={item.label}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.link === location.pathname,
        })}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));

  const links = sidebarData.map((item, index) => {
    return (
      <li key={index} className={item.cName}>
        <Link
          to={item.path}
          className={cx(classes.link, {
            [classes.linkActive]: item.path === location.pathname,
          })}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    );
  });

  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [ref, setOpen]);

  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true, // layout
        "bg-white text-zinc-50": true, // colors
        "md:w-full md:sticky  md:z-0 top-0 z-20 fixed": true, // positioning
        "h-screen w-[300px]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full ": !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <nav className="md:sticky top-0 md:top-16 py-2 flex flex-col gap-2">
        {links}
      </nav>
      {/* account  */}
      <div className="border-t border-t-indigo-800 p-4">
        <UnstyledButton onClick={logout}>
          <Group>
            <IconLogout />
            <div>
              <Text>Log Out</Text>
            </div>
          </Group>
        </UnstyledButton>
      </div>
    </div>
  );
};

export default Sidebar;
