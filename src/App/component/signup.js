import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextInput } from "@mantine/core";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const AuthanticationPage = () => {
  const [showSignup, setShowSignup] = useState(true);

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-96 p-8">
        <TransitionGroup>
          {showSignup ? (
            <CSSTransition
              key={showSignup ? "signup" : "login"}
              timeout={500}
              classNames="slide"
              onExited={() => setShowSignup(!showSignup)}
            >
              <div>
                <h2 className="text-xl font-bold mb-4">Sign up</h2>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={SignupSchema}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb-4">
                        <Field name="email">
                          {({ field }) => (
                            <TextInput
                              {...field}
                              label="Email"
                              placeholder="Email address"
                              error={touched.email && errors.email}
                              variant={
                                touched.email && errors.email
                                  ? "invalid"
                                  : "default"
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <div className="mb-4">
                        <Field name="password">
                          {({ field }) => (
                            <TextInput
                              {...field}
                              label="Password"
                              type="password"
                              placeholder="Password"
                              error={touched.password && errors.password}
                              variant={
                                touched.password && errors.password
                                  ? "invalid"
                                  : "default"
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-full w-full"
                      >
                        Sign up
                      </button>
                    </Form>
                  )}
                </Formik>
                <p className="text-sm mt-4">
                  Already have an account?{" "}
                  <button
                    className="text-blue-500"
                    onClick={() => setShowSignup(false)}
                  >
                    Log in
                  </button>
                </p>
              </div>
            </CSSTransition>
          ) : (
            <CSSTransition key="login" timeout={500} classNames="slide">
              <div>
                <h2 className="text-xl font-bold mb-4">Log in</h2>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb-4">
                        <Field name="email">
                          {({ field }) => (
                            <TextInput
                              {...field}
                              label="Email"
                              placeholder="Email address"
                              error={touched.email && errors.email}
                              variant={
                                touched.email && errors.email
                                  ? "invalid"
                                  : "default"
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <div className="mb-4">
                        <Field name="password">
                          {({ field }) => (
                            <TextInput
                              {...field}
                              label="Password"
                              type="password"
                              placeholder="Password"
                              error={touched.password && errors.password}
                              variant={
                                touched.password && errors.password
                                  ? "invalid"
                                  : "default"
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-full w-full"
                      >
                        Log in
                      </button>
                    </Form>
                  )}
                </Formik>
                <p className="text-sm mt-4">
                  Don't have an account?{" "}
                  <button
                    className="text-blue-500"
                    onClick={() => setShowSignup(true)}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default AuthanticationPage;
