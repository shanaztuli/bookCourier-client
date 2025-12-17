import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserRow from "./UserRow";
import { auth } from "../../firebase/firebase.config";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/admin/users`)
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data))
  //     .catch((err) => console.error(err));
  // }, []);
//
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

     
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
        console.error("Not array:", data);
      }
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  fetchUsers();
}, []);

  // Update role handler
  const handleRoleChange = (userId, newRole) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => res.json())
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        toast.success(`Role updated to ${newRole}`);
      })
      .catch((err) => toast.error("Failed to update role"));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">All Users</h2>

      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              handleRoleChange={handleRoleChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
