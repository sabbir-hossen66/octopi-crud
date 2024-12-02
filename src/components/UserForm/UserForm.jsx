// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createUser, fetchUsers, updateUser } from '../../apps/features/users/userSlice';

// const UserForm = ({ user, isEdit = false }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState(user || { name: '', email: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isEdit) {
//       dispatch(updateUser({ userId: user._id, updatedData: formData }));
//     } else {
//       await dispatch(createUser(formData));
//       dispatch(fetchUsers())
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         placeholder="Name"
//       />
//       <input
//         type="email"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         placeholder="Email"
//       />
//       <button type="submit">{isEdit ? 'Update' : 'Create'} User</button>
//     </form>
//   );
// };

// export default UserForm;