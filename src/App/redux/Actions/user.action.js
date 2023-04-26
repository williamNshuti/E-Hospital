import axios from "axios";
import actionTypes from "./types";
import { useState } from "react";
import { onSignIn } from "./Auth";
import { format } from "date-fns";

const baseUrl = "http://172.105.93.73:8080";

// SAVE USER
export const saveUser = (user) => ({
  type: "SAVE_USER",
  payload: user,
});

export const ClearError = (status) => ({
  type: "CLEAR_ERROR",
  payload: status,
});

export const buyCake = () => {
  return {
    type: actionTypes.BUYCAKE,
  };
};

// SIGN UP USER

export const SignUpUser = (values) => {
  const {
    firstname,
    lastname,
    gender,
    address,
    condition,
    email,
    password,
    type,
  } = values;
  return (dispatch) => {
    dispatch({ type: actionTypes.signUpRequest });
    var data = JSON.stringify(
      type === "PATIENT"
        ? {
            firstName: firstname,
            lastName: lastname,
            address: address,
            gender: gender,
            condition: condition,
            email: email,
            password: password,
            userType: type,
          }
        : {
            firstName: firstname,
            lastName: lastname,
            address: address,
            gender: gender,
            email: email,
            password: password,
            userType: type,
          }
    );
    var config = {
      method: "post",
      url: `${baseUrl}/api/v1/user/create`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(response, "the response");
          const message = response.data;
          const res = response.data;
          const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

          if (RETURN_CODE === 1) {
            dispatch({
              type: actionTypes.signUpSuccess,
              payload: message.RETURN_MSG,
            });
            resolve(
              message.RETURN_MSG ? message.RETURN_MSG : "Operation Successful"
            );
          } else {
            dispatch({
              type: actionTypes.signUpFailure,
              payload: RETURN_MSG,
            });
            reject(RETURN_MSG);
          }
        })
        .catch(function (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.error_message) ||
            error.message ||
            error.toString();
          dispatch({ type: actionTypes.signUpFailure, payload: message });
          reject(message);
        });
    });
  };
};

// LOGIN
export const LoginUser = (values) => {
  const { email, password, type } = values;
  async function save(key, value) {
    await localStorage.setItem(key, value);
  }
  return (dispatch) => {
    dispatch({ type: actionTypes.logInRequest });
    var data = JSON.stringify({
      email: email,
      password: password,
      userType: type,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/v1/user/auth/login`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(response, "response");
          const message = response.data;
          const res = response.data;
          const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

          if (RETURN_CODE === 1) {
            dispatch({
              type: actionTypes.logInSuccess,
              payload: RETURN_DATA,
            });
            save("auth", JSON.stringify(RETURN_DATA));
            resolve(
              message.RETURN_MSG ? message.RETURN_MSG : "Operation Successful"
            );
          } else {
            dispatch({ type: actionTypes.logInFailure, payload: message });
            reject("Invalid Email or Password! please try again.");
          }
        })
        .catch(function (error) {
          console.log(error, "the error");
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.error_message) ||
            error.message ||
            error.toString();
          dispatch({ type: actionTypes.logInFailure, payload: message });
          reject(message);
        });
    });
  };
};

// Fetch Pharmacist

export const FetchPharmacists = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.getPharmacistRequest });
    axios
      .get(`${baseUrl}/api/v1/pharmacist/all`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        const res = response.data;
        dispatch({
          type: actionTypes.getPharmacistSuccess,
          payload: res,
        });
      })
      .catch(function (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error_message) ||
          error.message ||
          error.toString();
        dispatch({
          type: actionTypes.getPharmacistFailure,
          payload: message,
        });
      });
  };
};

// Fetch physicist

export const FetchPhysicists = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.getPhysicistRequest });
    axios
      .get(`${baseUrl}/api/v1/physician/all`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        const res = response.data;
        dispatch({
          type: actionTypes.getPhysicistSuccess,
          payload: res,
        });
      })
      .catch(function (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error_message) ||
          error.message ||
          error.toString();
        dispatch({
          type: actionTypes.getPhysicistFailure,
          payload: message,
        });
      });
  };
};

// Fetch physicist

export const FetchPhysicistPatient = () => {
  return (dispatch, getState) => {
    const user = getState().User.user;
    dispatch({ type: actionTypes.getPhysicistPatientRequest });
    axios
      .get(
        `${baseUrl}/api/v1/physician/myPatients?email=${user?.USER?.email}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        const res = response.data;
        const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

        if (RETURN_CODE === 1) {
          dispatch({
            type: actionTypes.getPhysicistPatientSuccess,
            payload: RETURN_DATA?.PATIENTS,
          });
        } else {
          dispatch({
            type: actionTypes.getPhysicistPatientSuccess,
            payload: [],
          });
        }
      })
      .catch(function (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error_message) ||
          error.message ||
          error.toString();
        dispatch({
          type: actionTypes.getPhysicistPatientFailure,
          payload: message,
        });
      });
  };
};

// Fetch pharmacist

export const FetchPharmacistPatient = () => {
  return (dispatch, getState) => {
    const user = getState().User.user;
    dispatch({ type: actionTypes.getPharmacistPatientRequest });
    axios
      .get(
        `${baseUrl}/api/v1/pharmacist/myPatients?email=${user?.USER?.email}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )

      .then(function (response) {
        const res = response.data;
        const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

        if (RETURN_CODE === 1) {
          dispatch({
            type: actionTypes.getPharmacistPatientSuccess,
            payload: RETURN_DATA?.PATIENTS,
          });
        } else {
          dispatch({
            type: actionTypes.getPharmacistPatientSuccess,
            payload: [],
          });
        }
      })
      .catch(function (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error_message) ||
          error.message ||
          error.toString();
        dispatch({
          type: actionTypes.getPharmacistPatientFailure,
          payload: message,
        });
      });
  };
};

// Fetch Pharmacist

export const FetchPatients = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.getPatientRequest });
    axios
      .get(`${baseUrl}/asset/vehicle/finance/expense/all`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        const res = response.data;
        dispatch({
          type: actionTypes.getPatientSuccess,
          payload: res,
        });
      })
      .catch(function (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error_message) ||
          error.message ||
          error.toString();
        dispatch({
          type: actionTypes.getPatientFailure,
          payload: message,
        });
      });
  };
};

// PROVIDE CONSULTANCE
export const ProvidePatientConsultance = (values) => {
  const { summary, patientEmail } = values;
  return (dispatch, getState) => {
    const user = getState().User.user;

    dispatch({ type: actionTypes.ProvideConsultanceRequest });
    var data = JSON.stringify({
      patientEmail: patientEmail,
      physicistEmail: user?.USER?.email,
      consultationSummary: summary,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/v1/physician/provide-consultation`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(response, "response");
          const message = response.data;
          const res = response.data;
          const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

          if (RETURN_CODE === 1) {
            dispatch({
              type: actionTypes.ProvideConsultanceSuccess,
              payload: RETURN_DATA,
            });
            resolve(
              message.RETURN_MSG ? message.RETURN_MSG : "Operation Successful"
            );
          } else {
            dispatch({
              type: actionTypes.ProvideConsultanceFailure,
              payload: message,
            });
            reject(RETURN_MSG);
          }
        })
        .catch(function (error) {
          console.log(error, "the error");
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.error_message) ||
            error.message ||
            error.toString();
          dispatch({
            type: actionTypes.ProvideConsultanceFailure,
            payload: message,
          });
          reject(message);
        });
    });
  };
};

// PROVIDE Prescription

export const ProvidePatientPrescription = (values) => {
  const { name, price, date, patientEmail } = values;
  const datee = new Date(date);
  const formattedDate = format(datee, "yyyy-MM-dd");

  return (dispatch, getState) => {
    const user = getState().User.user;
    dispatch({ type: actionTypes.ProvidePrescriptionRequest });
    var data = JSON.stringify({
      medName: name,
      pharmacistEmail: user?.USER?.email,
      patientEmail: patientEmail,
      price: +price,
      expDate: formattedDate,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/v1/pharmacist/provide-prescription`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(response, "response");
          const message = response.data;
          const res = response.data;
          const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

          if (RETURN_CODE === 1) {
            dispatch({
              type: actionTypes.ProvidePrescriptionSuccess,
              payload: RETURN_DATA,
            });
            resolve(
              message.RETURN_MSG ? message.RETURN_MSG : "Operation Successful"
            );
          } else {
            dispatch({
              type: actionTypes.ProvidePrescriptionFailure,
              payload: message,
            });
            reject(RETURN_MSG);
          }
        })
        .catch(function (error) {
          console.log(error, "the error");
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.error_message) ||
            error.message ||
            error.toString();
          dispatch({
            type: actionTypes.ProvidePrescriptionFailure,
            payload: message,
          });
          reject(message);
        });
    });
  };
};

// Grant Access to Pharmacist

export const GrantAccessPharmacist = (email) => {
  return (dispatch, getState) => {
    const user = getState().User.user;
    dispatch({ type: actionTypes.grantPharmacistAccessRequest });
    var data = JSON.stringify({
      pharmacistEmail: email,
      patientEmail: user?.USER?.email,
    });
    var config = {
      method: "put",
      url: `${baseUrl}/api/v1/patient/pharmacist/grant-access`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(response, "response");
          const message = response.data;
          const res = response.data;
          const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

          if (RETURN_CODE === 1) {
            dispatch({
              type: actionTypes.grantPharmacistAccessSuccess,
              payload: RETURN_MSG,
            });
            resolve(RETURN_MSG);
          } else {
            dispatch({
              type: actionTypes.grantPharmacistAccessFailure,
              payload: message,
            });
            reject(RETURN_MSG);
          }
        })
        .catch(function (error) {
          console.log(error, "the error");
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.error_message) ||
            error.message ||
            error.toString();
          dispatch({
            type: actionTypes.grantPharmacistAccessFailure,
            payload: message,
          });
          reject(message);
        });
    });
  };
};

// Grant Access to physicist
export const GrantAccessphysicist = (email) => {
  return (dispatch, getState) => {
    const user = getState().User.user;

    dispatch({ type: actionTypes.grantPhysicistAccessRequest });
    var data = JSON.stringify({
      physicistEmail: email,
      patientEmail: user?.USER?.email,
    });
    var config = {
      method: "put",
      url: `${baseUrl}/api/v1/patient/physicist/grant-access`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(response, "response");
          const message = response.data;
          const res = response.data;
          const { RETURN_DATA, RETURN_MSG, RETURN_CODE } = res;

          if (RETURN_CODE === 1) {
            dispatch({
              type: actionTypes.grantPhysicistAccessSuccess,
              payload: RETURN_MSG,
            });
            resolve(
              message.RETURN_MSG ? message.RETURN_MSG : "Operation Successful"
            );
          } else {
            dispatch({
              type: actionTypes.grantPhysicistAccessFailure,
              payload: message,
            });
            reject(RETURN_MSG);
          }
        })
        .catch(function (error) {
          console.log(error, "the error");
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.error_message) ||
            error.message ||
            error.toString();
          dispatch({
            type: actionTypes.grantPhysicistAccessFailure,
            payload: message,
          });
          reject(message);
        });
    });
  };
};
