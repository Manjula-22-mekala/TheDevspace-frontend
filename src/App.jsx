

// App.jsx
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";           // make sure file name & path casing match
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"; 
import Feed from "./components/Feed";  // match exact file name
import Connections from "./components/Connections";
import Requests from "./components/requests";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections/>} />
            <Route path="requests" element={<Requests/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

