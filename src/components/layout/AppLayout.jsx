import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import NavBar from "../NavBar";
import Sidebar from "./Sidebar";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const AppLayout = () => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch {
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
