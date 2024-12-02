import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../apps/features/users/userSlice";
import { useEffect, useState } from "react";
import UserModal from "./UserModal/UserModal";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  // Fetch users when the component mounts or status changes to 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  // Delete user and refetch the updated list
  const handleDelete = async (userId) => {
    await dispatch(deleteUser(userId));
    dispatch(fetchUsers());
  };

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle edit button click
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Render loading or error states
  if (status === 'loading') return <p className="text-center text-lg">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
      <ul className="space-y-4">
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md">
              <span className="text-white">{user.name}</span>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-300">No users found.</p>
        )}
      </ul>

      {/* User Modal */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserList;
