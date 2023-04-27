import { IconDownload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import { FetchPatientPrescription } from "../App/redux/Actions/user.action";
import { format } from "date-fns";

function Home() {
  const { user, patientPrescription } = useSelector(({ User }) => User);
  const [formattedPrescriptions, setFormattedPrescriptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchPatientPrescription());
  }, []);
  useEffect(() => {
    const updatedPrescriptions = patientPrescription.map((prescription) => {
      const formattedDate = format(
        new Date(prescription.expirationDate),
        "dd/MM/yyyy"
      );
      return { ...prescription, expirationDate: formattedDate };
    });

    setFormattedPrescriptions(updatedPrescriptions);
  }, [patientPrescription]);
  return (
    <div className="h-screen flex flex-wrap justify-center items-center">
      <div className="max-w-xl w-full mx-4 my-6">
        <h3 className="text-3xl font-bold text-center mb-8">
          Welcome to E-Hospital portal
        </h3>
        <p className="text-xl text-gray-700 mb-4">
          E-hospital is an online platform that facilitates the daily
          interactions of patients, physicians and pharmacists in one place!
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Through our platform, patients can choose a physician and pharmacist
          of their liking to view their personal information in order to provide
          personalized consultation and medical prescriptions.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Patients can then be able to download a csv file that includes the
          medical prescriptions from their chosen pharmacist.
        </p>

        {user && user.USER.userType === "PATIENT" && (
          <CSVLink
            data={formattedPrescriptions}
            filename={"medecine.csv"}
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
