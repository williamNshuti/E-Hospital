import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthnaticationScreen from "./App/Auth/auth.screen";
import Home from "./pages/Home";
import Physicists from "./pages/Physicists";
import Pharmacists from "./pages/Pharmacists";
import Patients from "./pages/Patients";
import MainLayout from "./App/component/main-layout/main-layout";
import Navbar from "./App/component/Navbar";
import { saveUser } from "./App/redux/Actions/user.action";
import { useDispatch } from "react-redux";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      setIsAuthenticated(true);
      dispatch(saveUser(token));
    }
    setIsLoading(false);
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated && !isLoading ? (
      <MainLayout>{children}</MainLayout>
    ) : (
      <Navigate to="/authantication" replace />
    );
  };

  const AuthenticationRoute = ({ children }) => {
    return isAuthenticated && !isLoading ? (
      <Navigate to="/" replace />
    ) : (
      children
    );
  };

  if (isLoading) {
    // Render a loading indicator while the token is being retrieved
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-tomato">
      <Router>
        <Routes>
          <Route
            path="/authantication"
            element={
              <AuthenticationRoute>
                <AuthnaticationScreen />
              </AuthenticationRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="Physicist"
            element={
              <PrivateRoute>
                <Physicists />
              </PrivateRoute>
            }
          />
          <Route
            path="Pharmacist"
            element={
              <PrivateRoute>
                <Pharmacists />
              </PrivateRoute>
            }
          />
          <Route
            path="Patient"
            element={
              <PrivateRoute>
                <Patients />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
