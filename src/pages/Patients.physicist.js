import {
  Alert,
  Button,
  Loader,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FetchPhysicistPatient,
  ProvidePatientConsultance,
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
const TextareaInput = ({ label, name, placeholder, icon, readOnly }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="mb-3">
          <Textarea
            {...field}
            placeholder={placeholder}
            label={label}
            rightSection={icon}
            readOnly={readOnly}
            withAsterisk
            autosize
            minRows={4}
          />

          {meta.touched && meta.error && (
            <div className="errorContainer mt-3">
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
        <div className="mb-3">
          <DateInput
            {...field}
            placeholder={placeholder}
            label={label}
            withAsterisk
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
});
const ConsultanceSchema = Yup.object().shape({
  summary: Yup.string().required("Please Enter consultance summary"),
  patientEmail: Yup.string(),
});

const patients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    address: "123 Main St, Anytown USA",
    email: "johndoe@example.com",
    condition: "Stable",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    gender: "Female",
    address: "456 Main St, Anytown USA",
    email: "janedoe@example.com",
    condition: "Critical",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Smith",
    gender: "Male",
    address: "789 Main St, Anytown USA",
    email: "bobsmith@example.com",
    condition: "Serious",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Smith",
    gender: "Female",
    address: "321 Main St, Anytown USA",
    email: "alicesmith@example.com",
    condition: "Stable",
  },
  {
    id: 5,
    firstName: "Tom",
    lastName: "Jones",
    gender: "Male",
    address: "654 Main St, Anytown USA",
    email: "tomjones@example.com",
    condition: "Critical",
  },
  {
    id: 6,
    firstName: "Mary",
    lastName: "Jones",
    gender: "Female",
    address: "987 Main St, Anytown USA",
    email: "maryjones@example.com",
    condition: "Serious",
  },
  {
    id: 7,
    firstName: "Mike",
    lastName: "Brown",
    gender: "Male",
    address: "246 Main St, Anytown USA",
    email: "mikebrown@example.com",
    condition: "Stable",
  },
  {
    id: 8,
    firstName: "Sara",
    lastName: "Brown",
    gender: "Female",
    address: "135 Main St, Anytown USA",
    email: "sarabrown@example.com",
    condition: "Critical",
  },
  {
    id: 9,
    firstName: "David",
    lastName: "Lee",
    gender: "Male",
    address: "864 Main St, Anytown USA",
    email: "davidlee@example.com",
    condition: "Serious",
  },
  {
    id: 10,
    firstName: "Emily",
    lastName: "Lee",
    gender: "Female",
    address: "975 Main St, Anytown USA",
    email: "emilylee@example.com",
    condition: "Stable",
  },
];

function PatientPhysiscist() {
  const {
    physicistPatient,
    physicistPatientIsLoading,
    physicistPatientIsError,
    consultationIsLoading,
  } = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const [modalOpen2, setModalOpen2] = useState(false);
  const [activePatient, setActiveEmail] = useState("");

  useEffect(() => {
    dispatch(FetchPhysicistPatient());
  }, []);

  if (physicistPatientIsLoading) {
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

  if (physicistPatientIsError) {
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
        opened={modalOpen2}
        onClose={() => {
          setModalOpen2(false);
          setActiveEmail("");
        }}
        centered
        size="sm"
      >
        <Formik
          initialValues={{
            summary: "",
            patientEmail: activePatient,
          }}
          enableReinitialize
          validationSchema={ConsultanceSchema}
          onSubmit={(values, actions) => {
            dispatch(ProvidePatientConsultance(values))
              .then((response) => {
                toast.success("Consultation Sent Successfully!", {
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
                actions.resetForm();
                setModalOpen2(false);
              })
              .catch((error) => {
                toast.error(`Sending Consultation Failed : ${error}`, {
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
              <TextareaInput
                label="Consultance Summary"
                name="summary"
                placeholder="Provide consultance summary"
              />

              <Button
                mt="lg"
                fullWidth
                color="dark"
                loading={consultationIsLoading}
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

      {physicistPatient.length === 0 ? (
        <div className="flex h-screen justify-center items-center">
          <div className="text-center bg-gray-100 rounded-lg px-4 py-2">
            No Booked Patient found.
          </div>
        </div>
      ) : (
        <div className="p-8">
          <h3 className="text-3xl font-bold text-center mb-8">
            Meet Your Patients/ Physicists
          </h3>
          <div class="flex flex-wrap justify-start">
            {physicistPatient.map((patient) => (
              <div class="max-w-md w-full mx-4 my-6 bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out">
                <div class="flex justify-between px-4 pt-4">
                  <div class="font-semibold text-2xl text-gray-700">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div class="text-gray-500">{patient.gender}</div>
                </div>
                <div class="px-4 py-2">
                  <div class="text-sm text-gray-500 mb-1">
                    {patient.address}
                  </div>
                  <div class="text-sm text-gray-500">{patient.email}</div>
                </div>
                <div class="px-4 py-3">
                  <div class="text-sm text-bold font-medium">
                    Medical Condition: {patient.conditionDescription}
                  </div>
                </div>
                <div class="px-4 pb-4">
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={() => {
                      setModalOpen2(true);
                      setActiveEmail(patient.email);
                    }}
                  >
                    Provide Consultation
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

export default PatientPhysiscist;
