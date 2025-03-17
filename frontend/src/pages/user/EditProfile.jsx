import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

export const EditProfile = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [preview, setPreview] = useState(user?.profilepic || "");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phoneNumber", user.phoneNumber);
      setPreview(user.profilepic);
    }
  }, [user, setValue]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveProfilePic = async () => {
    try {
      await axiosInstance.delete("/user/remove-profile-picture");

      // Update Redux and local state
      dispatch(saveUser({ ...user, profilepic: "" }));
      setPreview("");
      setFile(null);

      toast.success("Profile picture removed");
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to remove profile picture");
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);

      if (file) {
        formData.append("profilepic", file);
      }

      const response = await axiosInstance.post("/user/profile-update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(saveUser(response.data.data));
      toast.success("Profile updated successfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div
      className={`mt-20 flex justify-center items-center min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`shadow-lg rounded-lg p-8 w-full max-w-md transition-all duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mb-4">
            {preview ? (
              <img src={preview} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2 border" />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-full text-gray-700 text-lg font-bold">
                No Image
              </div>
            )}

            <div className="flex gap-2 mt-2">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label
                htmlFor="file-upload"
                className="cursor-pointer font-medium transition-all text-blue-500 hover:text-blue-600"
              >
                Change Profile Picture
              </label>

              {preview && (
                <button
                  type="button"
                  onClick={handleRemoveProfilePic}
                  className="text-red-500 font-medium hover:text-red-600 transition-all"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className={`block ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Name</label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-white text-black border-gray-300 focus:ring-green-500"
              }`}
              required
            />
          </div>

          <div className="mb-4">
            <label className={`block ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Email</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-white text-black border-gray-300 focus:ring-green-500"
              }`}
              required
            />
          </div>

          <div className="mb-4">
            <label className={`block ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-white text-black border-gray-300 focus:ring-green-500"
              }`}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition-all ${
                isDarkMode
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`px-4 py-2 font-semibold rounded-lg transition-all ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
