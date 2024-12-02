import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../apps/features/users/userSlice";
import { useEffect } from "react";


const userList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers());
  }, [dispatch, status]);

  const handleDelete = async (userId) => {
    await dispatch(deleteUser(userId));
    dispatch(fetchUsers())
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default userList;