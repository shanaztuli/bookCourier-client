import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user.email}`);
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const image = form.image.value;

    // 1️ Update MongoDB
    await axiosSecure.patch(`/users/profile/${user.email}`, {
      name,
      image,
    });

    // 2️ Update Firebase Auth 
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });

    Swal.fire("Updated!", "Profile updated successfully", "success");
    refetch();
  };

  return (
    <div className="max-w-xl mx-auto border p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={profile.image || user?.photoURL || "/avatar.png"}
          className="w-20 h-20 rounded-full object-cover"
          alt="profile"
        />
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={profile.name}
          className="input input-bordered w-full"
          placeholder="Name"
        />

        <input
          type="text"
          name="image"
          defaultValue={profile.image}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />

        <button className="btn btn-btn w-full">Update Profile</button>
      </form>
    </div>
  );
};   

export default AdminProfile;
