import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "../cards/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading feed...
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        No new developers to show
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {feed.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Feed;
