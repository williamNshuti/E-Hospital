import React, { useEffect } from "react";
import * as Components from "./Components";
import { Formik, Field, useFormikContext, Form } from "formik";
import * as Yup from "yup";
import {
  Grid,
  PasswordInput,
  TextInput,
  Button,
  Select,
  Radio,
  Group,
} from "@mantine/core";
import { SignUpUser, LoginUser } from "../redux/Actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";
import { PrivateRoute } from "./private.route";

// Handle Image Upload using UseFormikContext Hook from Formik Library
const HandleFormikStates = () => {
  const { values, submitForm, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.type === "PHYSICIST" || values.type === "PHARMACIST") {
      setFieldValue("condition", "   ");
    }
  }, [values]);
  return null;
};

const signUpSchema = Yup.object({
  firstname: Yup.string().required("Please Enter first name"),
  lastname: Yup.string().required("Please Enter last name"),
  gender: Yup.string().required("Please choose your gender"),
  address: Yup.string().required("Please Enter the address"),
  type: Yup.string().required("Please chhose account type"),
  condition: Yup.string().required("Please Enter the condition"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter a password"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Please Enter a password"),
  type: Yup.string().required("Please Choose account type"),
});

const TextInputs = ({ label, name, placeholder, icon }) => {
  return (
    <Grid>
      <Grid.Col span={3}>
        <label htmlFor={name} className="text-gray-700 font-semibold text-sm">
          {label}
        </label>
      </Grid.Col>
      <Grid.Col span={9}>
        <Field name={name}>
          {({ field, meta }) => (
            <div>
              <TextInput
                {...field}
                placeholder={placeholder}
                size="md"
                className="input2"
                rightSection={icon}
              />
              {meta.touched && meta.error && (
                <div className="errorContainer">
                  <div className="errorText">{meta.error}</div>
                </div>
              )}
            </div>
          )}
        </Field>
      </Grid.Col>
    </Grid>
  );
};
const SelectInputs = ({ label, name, placeholder, icon, data }) => {
  return (
    <Grid>
      <Grid.Col span={3}>
        <label htmlFor={name} className="text-gray-700 font-semibold text-sm">
          {label}
        </label>
      </Grid.Col>
      <Grid.Col span={9}>
        <Field name={name}>
          {({ field, meta, form }) => (
            <div>
              <Select
                {...field}
                placeholder={placeholder}
                size="md"
                className="input2"
                rightSection={icon}
                data={data}
                value={field.value}
                onChange={(value) => form.setFieldValue(name, value)}
              />

              {meta.touched && meta.error && (
                <div className="errorContainer">
                  <div className="errorText">{meta.error}</div>
                </div>
              )}
            </div>
          )}
        </Field>
      </Grid.Col>
    </Grid>
  );
};
const CheckInputs = ({ label, name, placeholder, icon, data }) => {
  return (
    <Grid>
      <Grid.Col span={3}>
        <label htmlFor={name} className="text-gray-700 font-semibold text-sm">
          {label}
        </label>
      </Grid.Col>
      <Grid.Col span={9}>
        <Field name={name}>
          {({ field, meta, form }) => (
            <div>
              <Radio.Group
                {...field}
                onChange={(value) => form.setFieldValue(name, value)}
              >
                <Group mt="xs">
                  <Radio value="PATIENT" label="Patient" />
                  <Radio value="PHARMACIST" label="Pharmacist" />
                  <Radio value="PHYSICIST" label="Physicist" />
                </Group>
              </Radio.Group>

              {meta.touched && meta.error && (
                <div className="errorContainer mt-2">
                  <div className="errorText">{meta.error}</div>
                </div>
              )}
            </div>
          )}
        </Field>
      </Grid.Col>
    </Grid>
  );
};

const PasswordInputs = ({ label, name, placeholder, icon }) => {
  return (
    <Grid>
      <Grid.Col span="auto">
        <label htmlFor={name} className="text-gray-700 font-semibold text-sm">
          {label}
        </label>
      </Grid.Col>
      <Grid.Col span={9}>
        <Field name={name}>
          {({ field, meta }) => (
            <div>
              <PasswordInput
                {...field}
                placeholder={placeholder}
                size="md"
                className="input2"
                rightSection={icon}
              />
              {meta.touched && meta.error && (
                <div className="errorContainer">
                  <div className="errorText">{meta.error}</div>
                </div>
              )}
            </div>
          )}
        </Field>
      </Grid.Col>
    </Grid>
  );
};

function Login() {
  const { signUpisLoading, signUpError, user, loginLoading, logInError } =
    useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              gender: "",
              address: "",
              condition: "",
              email: "",
              password: "",
              type: "",
            }}
            enableReinitialize
            validationSchema={signUpSchema}
            onSubmit={(values, actions) => {
              dispatch(SignUpUser(values))
                .then((response) => {
                  toast.success("Account has been created successfully!", {
                    duration: 4000,
                    position: "bottom-right",
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
                  // toggle(true);
                })
                .catch((error) => {
                  toast.error(`Creation of an account has failed : ${error}`, {
                    duration: 4000,
                    position: "bottom-right",
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
            {(props) => {
              return (
                <div className="p-4">
                  <TextInputs
                    placeholder="Enter first name"
                    label="First Name"
                    name="firstname"
                  />
                  <TextInputs
                    placeholder="Enter last name"
                    label="Last Name"
                    name="lastname"
                  />
                  <SelectInputs
                    label="Gender"
                    placeholder="Enter the Gender"
                    name="gender"
                    data={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                    ]}
                  />
                  <SelectInputs
                    label="User Type"
                    placeholder="Enter the User Type"
                    name="type"
                    data={[
                      { value: "PATIENT", label: "Patient" },
                      { value: "PHYSICIST", label: "Physicist" },
                      { value: "PHARMACIST", label: "Pharmacist" },
                    ]}
                  />
                  <TextInputs
                    label="Address"
                    placeholder="Enter your Address"
                    name="address"
                  />
                  {props.values.type === "PATIENT" && (
                    <TextInputs
                      label="Condition"
                      placeholder="Enter your Condition"
                      name="condition"
                    />
                  )}
                  <TextInputs
                    label="Email"
                    placeholder="Enter your Email Address"
                    name="email"
                  />
                  <PasswordInputs
                    label="Password"
                    placeholder="Enter the password"
                    name="password"
                  />

                  <Button
                    mt="lg"
                    className="text-white font-normal	 text-sm "
                    style={{ background: "#2E8BC0" }}
                    onClick={props.handleSubmit}
                    loading={signUpisLoading}
                  >
                    Create Account
                  </Button>
                  <Toaster />
                  <HandleFormikStates />
                </div>
              );
            }}
          </Formik>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form style={{ padding: "10rem 4rem" }}>
          <Components.Title>Sign in</Components.Title>
          <Formik
            initialValues={{
              email: "",
              password: "",
              type: "",
            }}
            enableReinitialize
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              dispatch(LoginUser(values))
                .then((response) => {
                  navigate("/");

                  // actions.resetForm();
                })
                .catch((error) => {
                  toast.error(`Failed to Log in : ${error}`, {
                    duration: 4000,
                    position: "bottom-left", // set the position to top-left
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
            {(props) => {
              return (
                <div className="p-4">
                  <TextInputs
                    placeholder="Enter your email"
                    label="Email"
                    name="email"
                  />

                  <PasswordInputs
                    label="Password"
                    placeholder="Enter the password"
                    name="password"
                  />
                  <CheckInputs
                    label="Account Type"
                    placeholder="Choose Account Type"
                    name="type"
                  />

                  <Button
                    mt="lg"
                    className="text-white font-normal	 text-sm "
                    style={{ background: "#2E8BC0" }}
                    onClick={props.handleSubmit}
                    loading={loginLoading}
                  >
                    Log In
                  </Button>
                  <Toaster />
                </div>
              );
            }}
          </Formik>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Login;
