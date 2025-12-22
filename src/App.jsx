

// App.jsx
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";           // make sure file name & path casing match
import Profile from "./Profile";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";   // match exact file name

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

