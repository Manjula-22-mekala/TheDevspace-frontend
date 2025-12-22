
import "./app.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Body from "./body";
import Profile from "./Profile";
import Login from "./Login";
function App() {

  return (
    <>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/Profile" element={<Profile/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>

    </>
  );
}

export default App;
