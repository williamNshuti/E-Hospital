import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    // <div className="grid min-h-screen grid-rows-header bg-zinc-100 ">
    <div style={{ background: "#F1F5FF" }}>
      <div className="navbar-visibility " style={{ paddingBottom: "3.5rem" }}>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="grid md:grid-cols-sidebar">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        {React.Children.map(children, (child) => React.cloneElement(child))}
      </div>
    </div>
  );
};

export default Layout;
