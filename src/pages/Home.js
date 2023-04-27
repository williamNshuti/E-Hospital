import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector(({ User }) => User);
  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];
  return (
    <div className="h-screen flex flex-wrap justify-center items-center">
      <div className="max-w-md w-full mx-4 my-6">
        <h3 className="text-3xl font-bold text-center mb-8">
          Welcome To Our Portal
        </h3>
        <p className="text-xl text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          turpis ipsum.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Fusce vehicula, enim at vestibulum gravida, magna nisl elementum quam,
          ac viverra sapien ante sit amet dolor.
        </p>

        {user && user.USER.userType === "PATIENT" && (
          <CSVLink
            data={data}
            filename={"data.csv"}
            className="flex items-center justify-center py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
          >
            <IconDownload className="w-5 h-5 mr-2" />
            Get Prescriptions
          </CSVLink>
        )}
      </div>
    </div>
  );
}

export default Home;
