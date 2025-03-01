import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveManager } from "../../redux/features/managerSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

export const EditManagerProfile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const manager = useSelector((state) => state.manager.manager);
  const [preview, setPreview] = useState(manager?.profilepic || "");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const response = await axiosInstance.get("/manager/find-manager");
        const managerData = response.data.data;
        
        setValue("name", managerData.name);
        setValue("email", managerData.email);
        setValue("phoneNumber", managerData.phoneNumber);
        setPreview(managerData.profilepic);
        
        dispatch(saveManager(managerData));
      } catch (error) {
        console.error("Failed to fetch manager details:", error);
      }
    };

    if (!manager) {
      fetchManagerDetails();
    } else {
      setValue("name", manager.name);
      setValue("email", manager.email);
      setValue("phoneNumber", manager.phoneNumber);
      setPreview(manager.profilepic);
    }
  }, [manager, setValue, dispatch]);

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
  
      const response = await axiosInstance.post("/manager/profile-update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(saveManager(response.data.data));
      toast.success("Profile updated successfully");
      navigate("/manager/dashboard");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className={`hero min-h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-base-200'}`}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center">
              <img src={preview} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover mb-3 border-2 border-gray-00" />
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className={`input input-bordered ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`input input-bordered ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                required
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                className={`input input-bordered ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
