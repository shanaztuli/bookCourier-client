const UserRow = ({ user, handleRoleChange }) => {
  return (
    <tr className="text-center border-b">
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2 capitalize">{user.role}</td>
      <td className="px-4 py-2 flex gap-2 justify-center">
        <button
          onClick={() => handleRoleChange(user._id, "librarian")}
          disabled={user.role === "librarian" || user.role === "admin"}
          className="btn btn-sm btn-outline"
        >
          Make Librarian
        </button>
        <button
          onClick={() => handleRoleChange(user._id, "admin")}
          disabled={user.role === "admin"}
          className="btn btn-sm btn-btn"
        >
          Make Admin
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
