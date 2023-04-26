import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthnaticationScreen from "./App/Auth/auth.screen";
import Home from "./pages/Home";
import Physicists from "./pages/Physicists";
import Pharmacists from "./pages/Pharmacists";
import Navbar from "./App/component/Navbar";
import MainLayout from "./App/component/main-layout/main-layout";
import { useEffect } from "react";
import { PrivateRoute } from "./App/component/private.route";
import PatientPharmacist from "./pages/patient.pharmacist";
import PatientPhysiscist from "./pages/Patients.physicist";

function App() {
  return (
    <div className="bg-tomato">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/authantication" element={<AuthnaticationScreen />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="Physicist"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Physicists />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="Pharmacist"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Pharmacists />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="Patient/pharmacist"
            element={
              <PrivateRoute>
                <MainLayout>
                  <PatientPharmacist />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="Patient/physicist"
            element={
              <PrivateRoute>
                <MainLayout>
                  <PatientPhysiscist />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
