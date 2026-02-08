import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Feed from "./components/pages/Feed";
import Connections from "./components/pages/Connections";
import Requests from "./components/pages/Requests";
import Profile from "./components/pages/Profile";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>

          {/* Welcome Page */}
          <Route path="/" element={<Welcome />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected App */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Feed />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="profile" element={<Profile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
