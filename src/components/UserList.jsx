import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '../apps/features/users/userSlice';
import UserModal from './UserModal/UserModal';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render loading or error states
  if (status === 'loading') return <p className="text-center text-lg">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">User List</h2>
      <ul className="space-y-4">
        {currentUsers && currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <li key={user._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <span className="text-gray-800 text-lg">{user.name}</span>
              <div className="flex space-x-3">
                <Link
                  to={`/users/${user._id}`}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View
                </Link>
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <ul className="flex space-x-2">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
            <li key={i + 1}>
              <button
                onClick={() => paginate(i + 1)}
                className={`px-3 py-2 rounded-full ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  } hover:bg-indigo-500 transition duration-300`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

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
