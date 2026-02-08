import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

 const linkClass = ({ isActive }) =>
  `
    flex items-center px-4 py-3 rounded-lg font-medium transition-all
    ${
      isActive
        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
        : "text-gray-300 hover:bg-white/5 hover:text-white"
    }
  `;



  return (
    <aside className="w-64 min-h-screen bg-[#020617] border-r border-gray-800 px-4 py-6">
      {/* BRAND */}
      <div className="mb-10 w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-extrabold tracking-wide
          bg-gradient-to-r from-indigo-400 to-purple-400
          bg-clip-text text-transparent">
          TheDevSpace
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Connect with developers
        </p>
      </div>

      {/* NAV LINKS */}
      <nav className="space-y-2">
        <NavLink to="/app" end className={linkClass}>
          Feed
        </NavLink>

        <NavLink to="/app/connections" className={linkClass}>
          Connections
        </NavLink>

        <NavLink to="/app/requests" className={linkClass}>
          Requests
        </NavLink>

        <NavLink to="/app/profile" className={linkClass}>
          Profile
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="mt-8 pt-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg font-semibold
          text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
