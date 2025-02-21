import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const EditProfile = () => {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mb-4">
            <img src={preview} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="text-blue-600 cursor-pointer">Change Profile Picture</label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" {...register("name")} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" {...register("email")} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" {...register("phoneNumber")} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div className="flex justify-between">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Reset</button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
