/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container, createStyles, Group, Navbar } from "@mantine/core";
import {
  IconGasStation,
  IconLayoutDashboard,
  IconLogout,
  IconReport,
  IconReportMoney,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import React from "react";
import Layout from "./Layout";

export function MainLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default MainLayout;
