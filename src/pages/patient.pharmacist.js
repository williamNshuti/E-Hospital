import { Alert, Button, Loader, Modal, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FetchPharmacistPatient,
  ProvidePatientPrescription,
} from "../App/redux/Actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const TextInputs = ({ label, name, placeholder, icon, readOnly }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="mb-3">
          <TextInput
            {...field}
            placeholder={placeholder}
            label={label}
            rightSection={icon}
            readOnly={readOnly}
            withAsterisk
          />

          {meta.touched && meta.error && (
            <div className="errorContainer">
              <div className="errorText">{meta.error}</div>
            </div>
          )}
        </div>
      )}
    </Field>
  );
};
const DateInputs = ({ label, name, placeholder }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="mb-3" style={{ zIndex: 999 }}>
          <DateInput
            {...field}
            placeholder={placeholder}
            label={label}
            maw={400}
            mx="auto"
            onChange={(value) => {
              const event = {
                target: {
                  name: field.name,
                  value: value,
                },
              };

              field.onChange(event);
            }}
          />

          {meta.touched && meta.error && (
            <div className="errorContainer">
              <div className="errorText">{meta.error}</div>
            </div>
          )}
        </div>
      )}
    </Field>
  );
};
const MedicineSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter medecine name"),
  price: Yup.number().required("Please Enter medecine price"),
  date: Yup.string().required("Please Enter medecine expiry date"),
  patientEmail: Yup.string().required(),
});

function PatientPharmacist() {
  const {
    pharmacistPatient,
    pharmacistPatientIsLoading,
    pharmacistPatientIsError,
    prescriptionIsLoading,
  } = useSelector(({ User }) => User);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [activePatient, setActiveEmail] = useState("");

  useEffect(() => {
    dispatch(FetchPharmacistPatient());
  }, []);

  if (pharmacistPatientIsLoading) {
    return (
      <div
        style={{
          marginTop: "100px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        <Loader style={{ marginTop: "100px" }} />{" "}
      </div>
    );
  }

  if (pharmacistPatientIsError) {
    return (
      <Alert
        color="red"
        title="Error"
        style={{ marginTop: "100px", textAlign: "center" }}
      >
        Failed to fetch data. Please try again later.
      </Alert>
    );
  }

  return (
    <div>
      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setActiveEmail("");
        }}
        centered
        size="sm"
      >
        <Formik
          initialValues={{
            name: "",
            price: "",
            date: "",
            patientEmail: activePatient,
          }}
          enableReinitialize
          validationSchema={MedicineSchema}
          onSubmit={(values, actions) => {
            dispatch(ProvidePatientPrescription(values))
              .then((response) => {
                toast.success("Medecine sent successfully!", {
                  duration: 4000,
                  position: "top-center",
                  style: {
                    borderRadius: "10px",
                    background: "#4CAF50",
                    color: "#fff",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    filter: "brightness(90%)",
                  },
                  iconTheme: {
                    primary: "#fff",
                    secondary: "#333",
                  },
                });
                // actions.resetForm();
                // setModalOpen1(false);
              })
              .catch((error) => {
                toast.error(`Sending Medecine Failed! Try again : ${error}`, {
                  duration: 4000,
                  position: "top-center",
                  style: {
                    borderRadius: "10px",
                    background: "red",
                    color: "#fff",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    filter: "brightness(90%)",
                  },
                  iconTheme: {
                    primary: "#fff",
                    secondary: "#333",
                  },
                });
              });
          }}
        >
          {(props) => (
            <div className="p-4">
              <TextInputs
                label="Medecine Name"
                name="name"
                placeholder="Provide med name"
              />
              <TextInputs
                label="Medecine Price"
                name="price"
                placeholder="Provide med price"
              />
              <DateInputs
                label="Expiry Date"
                name="date"
                placeholder="Provide med Exp price "
              />

              <Button
                mt="lg"
                fullWidth
                color="dark"
                loading={prescriptionIsLoading}
                style={{
                  background: "#1E355C",
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
                onClick={props.handleSubmit}
                loaderPosition="center"
              >
                Send
              </Button>
            </div>
          )}
        </Formik>
      </Modal>

      {pharmacistPatient.length === 0 ? (
        <div className="flex h-screen justify-center items-center">
          <div className="text-center bg-gray-100 rounded-lg px-4 py-2">
            No Booked Patient found.
          </div>
        </div>
      ) : (
        <div className="p-8">
          <h3 className="text-3xl font-bold text-center mb-8">
            Meet Your Patients/Pharmacist
          </h3>
          <div className="flex flex-wrap justify-start">
            {pharmacistPatient.map((patient, index) => (
              <div
                key={index}
                className="max-w-md w-full mx-4 my-6 bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="flex justify-between px-4 pt-4">
                  <div className="font-semibold text-2xl text-gray-700">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div className="text-gray-500">{patient.gender}</div>
                </div>
                <div className="px-4 py-2">
                  <div className="text-sm text-gray-500 mb-1">
                    {patient.address}
                  </div>
                  <div className="text-sm text-gray-500">{patient.email}</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-sm text-bold font-medium">
                    Consultation:{" "}
                    {patient?.consultations.length > 0 &&
                      patient.consultations.slice(-1)[0].consultationSummary}
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={() => {
                      setModalOpen(true);
                      setActiveEmail(patient.email);
                    }}
                  >
                    Provide Medecine
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Toaster />
        </div>
      )}
    </div>
  );
}

export default PatientPharmacist;
