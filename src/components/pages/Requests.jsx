import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addRequests, removeRequest } from "../../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/user/requests/recieved`,
          { withCredentials: true }
        );
        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
  }, [dispatch]);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  /* ===== Empty State ===== */
  if (requests.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-gray-400">
        <h2 className="text-xl font-semibold">No connection requests</h2>
        <p className="mt-2 text-sm">
          When someone shows interest, you’ll see it here
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Connection Requests
        </h1>
        <p className="mt-2 text-gray-400 text-sm">
          Developers who want to connect with you
        </p>
        <div className="mt-4 flex justify-center">
          <span className="h-1 w-16 rounded-full bg-indigo-500"></span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {requests.map(({ _id, fromUserId }) => (
          <div
            key={_id}
            className="
              bg-gradient-to-br from-[#111827] to-[#0b1220]
              rounded-xl p-6
              border border-indigo-500/30
              transition-all duration-300
              hover:border-indigo-500
              hover:shadow-[0_0_35px_-12px_rgba(99,102,241,0.6)]
            "
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={fromUserId.photoUrl}
                alt="profile"
                className="
                  w-14 h-14 rounded-full object-cover
                  ring-2 ring-indigo-500/40
                "
              />

              {/* Content */}
              <div className="flex-1">
                {/* Name + STATUS */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold capitalize">
                    {fromUserId.firstName} {fromUserId.lastName}
                  </h3>

                  {/* ✅ RIGHT SIDE REQUESTED BADGE */}
                  <span
                    className="
                      text-xs px-3 py-1 rounded-full
                      bg-amber-500/10 text-amber-400
                      border border-amber-500/30
                    "
                  >
                    Requested
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {fromUserId.about}
                </p>

                {/* Skills */}
                {fromUserId.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {fromUserId.skills.map((skill) => (
                      <span
                        key={skill}
                        className="
                          text-xs px-3 py-1 rounded-full
                          bg-indigo-500/10 text-indigo-300
                          border border-indigo-500/30
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => reviewRequest("rejected", _id)}
                    className="
                      px-4 py-1.5 text-sm rounded-lg
                      border border-white/20
                      text-gray-300 hover:bg-red-500/10
                      hover:border-red-500/40
                      transition
                    "
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => reviewRequest("accepted", _id)}
                    className="
                      px-4 py-1.5 text-sm rounded-lg
                      bg-emerald-600 hover:bg-emerald-500
                      transition text-white
                    "
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
