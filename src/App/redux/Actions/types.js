const actionTypes = {
  BUYCAKE: "BUYCAKE",

  // USER
  // /-----------------------------------------------------------------------
  // LOGIN USER
  logInRequest: "LOG_IN_REQUEST",
  logInSuccess: "LOG_IN_SUCCESS",
  logInFailure: "LOG_IN_FAILURE",

  // SIGN UP
  signUpRequest: "SIGN_UP_REQUEST",
  signUpSuccess: "SIGN_UP_SUCCESS",
  signUpFailure: "SIGN_UP_FAILURE",

  // LOGIN USER
  userProfileRequest: "USER_PROFILE_REQUEST",
  userProfileSuccess: "USER_PROFILE_SUCCESS",
  userProfileFailure: "USER_PROFILE_FAILURE",

  // Pharmacist

  getPharmacistRequest: "GET_PHARMACIST_REQUEST",
  getPharmacistSuccess: "GET_PHARMACIST_SUCCESS",
  getPharmacistFailure: "GET_PHARMACIST_FAILURE",

  ProvidePrescriptionRequest: "PROVIDE_PRESCRIPTION_REQUEST",
  ProvidePrescriptionSuccess: "PROVIDE_PRESCRIPTION_SUCCESS",
  ProvidePrescriptionFailure: "PROVIDE_PRESCRIPTION_FAILURE",

  // Physicists
  getPhysicistRequest: "GET_PHYSICIST_REQUEST",
  getPhysicistSuccess: "GET_PHYSICIST_SUCCESS",
  getPhysicistFailure: "GET_PHYSICIST_FAILURE",

  ProvideConsultanceRequest: "PROVIDE_CONSULTANCE_REQUEST",
  ProvideConsultanceSuccess: "PROVIDE_CONSULTANCE_SUCCESS",
  ProvideConsultanceFailure: "PROVIDE_CONSULTANCE_FAILURE",

  // Patients
  getPatientRequest: "GET_PATIENT_REQUEST",
  getPatientSuccess: "GET_PATIENT_SUCCESS",
  getPatientFailure: "GET_PATIENT_FAILURE",

  // Fetch Prescription
  getPatientPrescriptionRequest: "GET_PATIENT_PRESCRIPTION_REQUEST",
  getPatientPrescriptionSuccess: "GET_PATIENT_PRESCRIPTION_SUCCESS",
  getPatientPrescriptionFailure: "GET_PATIENT_PRESCRIPTION_FAILURE",

  // Patient Grant Access
  grantPharmacistAccessRequest: "PHARMACIST_GRANT_ACCESS_REQUEST",
  grantPharmacistAccessSuccess: "PHARMACIST_GRANT_ACCESS_SUCCESS",
  grantPharmacistAccessFailure: "PHARMACIST_GRANT_ACCESS_FAILURE",

  grantPhysicistAccessRequest: "PHARMACIST_GRANT_ACCESS_REQUEST",
  grantPhysicistAccessSuccess: "PHARMACIST_GRANT_ACCESS_SUCCESS",
  grantPhysicistAccessFailure: "PHARMACIST_GRANT_ACCESS_FAILURE",

  // Physist Patients
  getPhysicistPatientRequest: "GET_PHYSICIST_PATIENT_REQUEST",
  getPhysicistPatientSuccess: "GET_PHYSICIST_PATIENT_SUCCESS",
  getPhysicistPatientFailure: "GET_PHYSICIST_PATIENT_FAILURE",

  // Pharmacist Patients
  getPharmacistPatientRequest: "GET_PHARMACIST_PATIENT_REQUEST",
  getPharmacistPatientSuccess: "GET_PHARMACIST_PATIENT_SUCCESS",
  getPharmacistPatientFailure: "GET_PHARMACIST_PATIENT_FAILURE",
};

export default actionTypes;
