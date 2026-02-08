import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { removeUserFromFeed } from "../../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [direction, setDirection] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (status) => {
    if (loading) return;
    setLoading(true);
    setDirection(status === "ignored" ? "left" : "right");

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );

      setTimeout(() => {
        dispatch(removeUserFromFeed(user._id));
      }, 400);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        relative bg-white/5 backdrop-blur-xl
        border border-white/10 rounded-2xl p-4
        shadow-xl transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-indigo-500/20
        ${direction === "left" ? "-translate-x-full opacity-0" : ""}
        ${direction === "right" ? "translate-x-full opacity-0" : ""}
      `}
    >
      {/* Profile Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={user.photoUrl}
          alt="profile"
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* User Info */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-white">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {user.about}
        </p>

        {/* Skills */}
        {user.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {user.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-3 mt-5">
        <button
          disabled={loading}
          onClick={() => handleAction("ignored")}
          className="
            flex-1 py-2 rounded-lg border border-gray-500/40
            text-gray-300 hover:bg-red-500/10 hover:border-red-500/40
            transition disabled:opacity-50
          "
        >
          Ignore
        </button>

        <button
          disabled={loading}
          onClick={() => handleAction("interested")}
          className="
            flex-1 py-2 rounded-lg bg-indigo-600
            hover:bg-indigo-500 transition disabled:opacity-50
          "
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
