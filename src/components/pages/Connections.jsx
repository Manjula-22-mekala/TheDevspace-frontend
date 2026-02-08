import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/user/connections`,
          { withCredentials: true }
        );
        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400">
        No connections yet
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* ===== Header ===== */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Your Connections
        </h1>
        <p className="mt-2 text-gray-400 text-sm">
          Developers you’ve successfully connected with
        </p>
        <div className="mt-4 flex justify-center">
          <span className="h-1 w-16 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      {/* ===== Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {connections.map((user) => (
          <div
            key={user._id}
            className="
              bg-gradient-to-br from-[#111827] to-[#0b1220]
              rounded-xl p-6
              border border-emerald-500/30
              transition-all duration-300
              hover:border-emerald-500
              hover:shadow-[0_0_35px_-12px_rgba(16,185,129,0.6)]
            "
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={user.photoUrl}
                alt="profile"
                className="
                  w-14 h-14 rounded-full object-cover
                  ring-2 ring-emerald-500/50
                "
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold capitalize">
                    {user.firstName} {user.lastName}
                  </h3>

                  {/* ✅ GREEN ACCEPTED STATUS */}
                  <span
                    className="
                      text-xs px-3 py-1 rounded-full
                      bg-emerald-500/15 text-emerald-400
                      border border-emerald-500/40
                      shadow-[0_0_10px_rgba(16,185,129,0.4)]
                    "
                  >
                    Connected
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {user.about}
                </p>

                {/* Skills */}
                {user.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="
                          text-xs px-3 py-1 rounded-full
                          bg-emerald-500/10 text-emerald-300
                          border border-emerald-500/30
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
