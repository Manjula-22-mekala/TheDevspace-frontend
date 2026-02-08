import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";

const Profile = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: "",
    emailId: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      setForm({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        age: res.data.age || "",
        gender: res.data.gender || "",
        photoUrl: res.data.photoUrl || "",
        about: res.data.about || "",
        skills: res.data.skills?.join(", ") || "",
        emailId: res.data.emailId || "",
      });
    } catch {
      toast.error("Failed to load profile ❌");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const toastId = toast.loading("Saving changes...");

    try {
      await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          age: form.age ? Number(form.age) : undefined,
          gender: form.gender,
          photoUrl: form.photoUrl,
          about: form.about,
          skills: form.skills
            ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
        },
        { withCredentials: true }
      );

      toast.success("Profile updated successfully ✅", { id: toastId });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to save profile ❌", { id: toastId });
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="flex justify-center py-10 px-4">
        <div
          className="
            w-full max-w-3xl
            bg-gradient-to-br from-[#0b1220] to-[#020617]
            rounded-2xl p-8
            shadow-xl border border-white/10
          "
        >
          {/* ===== Heading ===== */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Your Profile
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage how others see you
            </p>
          </div>

          {/* ===== Avatar Section ===== */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <img
                src={form.photoUrl}
                alt="profile"
                className="
                  w-20 h-20 rounded-full object-cover
                  ring-2 ring-indigo-500
                "
              />
              <span
                className="
                  absolute bottom-1 right-1
                  w-4 h-4 bg-green-500
                  rounded-full
                  border-2 border-[#0b1220]
                "
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                {form.firstName} {form.lastName}
              </h2>
              <p className="text-sm text-gray-400">
                {form.emailId}
              </p>
            </div>
          </div>

          {/* ===== Form ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />

            <Input label="Age" name="age" value={form.age} onChange={handleChange} />
            <Input label="Gender" name="gender" value={form.gender} onChange={handleChange} />

            <Input
              label="Profile Photo URL"
              name="photoUrl"
              value={form.photoUrl}
              onChange={handleChange}
              full
            />

            <Textarea
              label="About You"
              name="about"
              value={form.about}
              onChange={handleChange}
            />

            <Input
              label="Skills (comma separated)"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              full
            />
          </div>

          {/* ===== Save Button ===== */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSave}
              className="
                px-8 py-2.5 rounded-lg
                bg-indigo-600 hover:bg-indigo-500
                transition font-medium text-white
                shadow-lg
              "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ===== Reusable Inputs ===== */

const Input = ({ label, name, value, onChange, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="text-xs text-white/90">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="
        mt-1 w-full
        bg-[#020617]
        border border-white/10
        rounded-lg px-3 py-2 text-sm
        text-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div className="md:col-span-2">
    <label className="text-xs text-white/90">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="
        mt-1 w-full
        bg-[#020617]
        border border-white/10
        rounded-lg px-3 py-2 text-sm
        text-white resize-none
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
    />
  </div>
);

export default Profile;
