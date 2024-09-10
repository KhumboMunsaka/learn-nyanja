import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./firebase/auth";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import MemeOfTheDay from "./pages/MemeOfTheDay";
import Settings from "./pages/Settings";
import Dictionary from "./pages/Dictionary";
import UpdateProfile from "./pages/UpdateProfile";
import ProtectedRoute from "./pages/ProtectedRoute";
import { DictionaryProvider } from "./contexts/DictionaryContext"; // Imp
import { ModProvider } from "./contexts/MODContext";
function App() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DictionaryProvider>
                  <ModProvider>
                    <Dashboard />
                  </ModProvider>
                </DictionaryProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="learn" />} />

            <Route path="learn" element={<Learn />} />
            <Route path="mod" element={<MemeOfTheDay />} />
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
