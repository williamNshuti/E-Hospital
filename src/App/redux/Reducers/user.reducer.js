import actionTypes from "../Actions/types";

const initialState = {
  loginLoading: false,
  logInError: null,
  signUpisLoading: false,
  signUpResponse: null,
  signUpError: null,
  error: null,
  user: null,
  numOfCakes: 10,
  patients: [],
  patientIsLoading: false,
  patientIsError: null,
  pharmacists: [],
  pharmacistIsLoading: false,
  pharmacistIsError: null,
  physicists: [],
  physicistIsLoading: false,
  physicistIsError: null,
  prescriptionIsLoading: false,
  prescriptionIsError: null,
  consultationIsLoading: false,
  consultationIsError: null,
  grantphysicistLoading: false,
  grantphysicistError: null,
  grantpharmacistLoading: false,
  grantpharmacistError: null,
  physicistPatient: [],
  physicistPatientIsLoading: false,
  physicistPatientIsError: null,
  pharmacistPatient: [],
  pharmacistPatientIsLoading: false,
  pharmacistPatientIsError: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUYCAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case actionTypes.signUpRequest:
      return {
        ...state,
        signUpisLoading: true,
        signUpError: null,
      };
    case actionTypes.signUpSuccess:
      return {
        ...state,
        signUpisLoading: false,
        signUpResponse: action.payload,
      };
    case actionTypes.signUpFailure:
      return {
        ...state,
        signUpisLoading: false,
        signUpError: action.payload,
      };
    case actionTypes.logInRequest: {
      return {
        ...state,
        loginLoading: true,
        logInError: null,
      };
    }
    case actionTypes.logInSuccess: {
      return {
        ...state,
        loginLoading: false,
        user: action.payload,
        logInError: null,
      };
    }
    case actionTypes.logInFailure: {
      return {
        ...state,
        loginLoading: false,
        logInError: action.payload,
      };
    }

    case actionTypes.getPharmacistRequest: {
      return {
        ...state,
        pharmacistIsLoading: true,
        pharmacistIsError: null,
      };
    }
    case actionTypes.getPharmacistSuccess: {
      return {
        ...state,
        pharmacistIsLoading: false,
        pharmacists: action.payload,
        pharmacistIsError: null,
      };
    }
    case actionTypes.getPharmacistFailure: {
      return {
        ...state,
        pharmacistIsLoading: false,
        pharmacistIsError: action.payload,
      };
    }

    case actionTypes.getPhysicistRequest: {
      return {
        ...state,
        physicistIsLoading: true,
        physicistIsError: null,
      };
    }
    case actionTypes.getPhysicistSuccess: {
      return {
        ...state,
        physicistIsLoading: false,
        physicists: action.payload,
        physicistIsError: null,
      };
    }
    case actionTypes.getPhysicistFailure: {
      return {
        ...state,
        physicistIsLoading: false,
        physicistIsError: action.payload,
      };
    }

    case actionTypes.getPatientRequest: {
      return {
        ...state,
        patientIsLoading: true,
        patientIsError: null,
      };
    }
    case actionTypes.getPatientSuccess: {
      return {
        ...state,
        patientIsLoading: false,
        patients: action.payload,
        patientIsError: null,
      };
    }
    case actionTypes.getPatientFailure: {
      return {
        ...state,
        patientIsLoading: false,
        patientIsError: action.payload,
      };
    }
    case actionTypes.ProvideConsultanceRequest: {
      return {
        ...state,
        consultationIsLoading: true,
        consultationIsError: null,
      };
    }
    case actionTypes.ProvideConsultanceSuccess: {
      return {
        ...state,
        consultationIsLoading: false,
        consultationIsError: null,
      };
    }
    case actionTypes.ProvideConsultanceFailure: {
      return {
        ...state,
        consultationIsLoading: false,
        consultationIsError: action.payload,
      };
    }

    case actionTypes.ProvidePrescriptionRequest: {
      return {
        ...state,
        prescriptionIsLoading: true,
        prescriptionIsError: null,
      };
    }
    case actionTypes.ProvidePrescriptionSuccess: {
      return {
        ...state,
        prescriptionIsLoading: false,
        prescriptionIsError: null,
      };
    }
    case actionTypes.ProvidePrescriptionFailure: {
      return {
        ...state,
        prescriptionIsLoading: false,
        prescriptionIsError: action.payload,
      };
    }

    case actionTypes.grantPharmacistAccessRequest: {
      return {
        ...state,
        grantpharmacistLoading: true,
        grantpharmacistError: null,
      };
    }
    case actionTypes.grantPharmacistAccessSuccess: {
      return {
        ...state,
        grantpharmacistLoading: false,
        grantpharmacistError: null,
      };
    }
    case actionTypes.grantPharmacistAccessFailure: {
      return {
        ...state,
        grantpharmacistLoading: false,
        grantpharmacistError: action.payload,
      };
    }
    case actionTypes.grantPhysicistAccessRequest: {
      return {
        ...state,
        grantphysicistLoading: true,
        grantphysicistError: null,
      };
    }
    case actionTypes.grantPhysicistAccessSuccess: {
      return {
        ...state,
        grantphysicistLoading: false,
        grantphysicistError: null,
      };
    }
    case actionTypes.grantPhysicistAccessFailure: {
      return {
        ...state,
        grantphysicistLoading: false,
        grantphysicistError: action.payload,
      };
    }

    case actionTypes.getPhysicistPatientRequest: {
      return {
        ...state,
        physicistPatientIsLoading: true,
        physicistPatientIsError: null,
      };
    }
    case actionTypes.getPhysicistPatientSuccess: {
      return {
        ...state,
        physicistPatientIsLoading: false,
        physicistPatient: action.payload,
        physicistPatientIsError: null,
      };
    }
    case actionTypes.getPhysicistPatientFailure: {
      return {
        ...state,
        physicistPatientIsLoading: false,
        physicistPatientIsError: action.payload,
      };
    }
    case actionTypes.getPharmacistPatientRequest: {
      return {
        ...state,
        pharmacistPatientIsLoading: true,
        pharmacistPatientIsError: null,
      };
    }
    case actionTypes.getPharmacistPatientSuccess: {
      return {
        ...state,
        pharmacistPatientIsLoading: false,
        pharmacistPatient: action.payload,
        pharmacistPatientIsError: null,
      };
    }
    case actionTypes.getPharmacistPatientFailure: {
      return {
        ...state,
        pharmacistPatientIsLoading: false,
        pharmacistPatientIsError: action.payload,
      };
    }
    case "SAVE_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
