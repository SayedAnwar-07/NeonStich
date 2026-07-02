import React, { useEffect, useRef, useState } from "react";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../context/UserProfileContext";
import { PencilLine } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { user, profileLoading, updateUserProfile } = useUserProfile();

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleNameUpdate = async () => {
    if (!name.trim()) return;

    const formData = new FormData();
    formData.append("name", name);

    await updateUserProfile(formData);
    setIsEditingName(false);
  };

  const handleImageChange = async (e) => {
    const image = e.target.files[0];

    if (!image) return;

    const formData = new FormData();
    formData.append("profileImage", image);

    await updateUserProfile(formData);
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center mt-40">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10 sm:mt-40">
      <div className="w-full">
        <div className="text-3xl text-center">
          <Title text1={"MY"} text2={"PROFILE"} />
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={user?.profileImage || "/default-profile.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border border-gray-300"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full"
              >
                <PencilLine className="h-4 w-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="border p-4 border-gray-300 flex justify-between items-center">
            <div className="w-full">
              <p className="text-xs text-gray-500">Name</p>

              {isEditingName ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-black outline-none py-1"
                />
              ) : (
                <p>{user?.name}</p>
              )}
            </div>

            {isEditingName ? (
              <button
                onClick={handleNameUpdate}
                className="bg-black text-white px-4 py-2 text-sm rounded"
              >
                Save
              </button>
            ) : (
              <button onClick={() => setIsEditingName(true)}>
                <PencilLine className="text-gray-500 h-5 w-5" />
              </button>
            )}
          </div>

          <div className="border p-4 border-gray-300 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="border p-4 border-gray-300">
            <p className="text-xs text-gray-500">Role</p>
            <p className="capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
