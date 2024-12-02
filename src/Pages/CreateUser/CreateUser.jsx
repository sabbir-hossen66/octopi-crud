import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, fetchUsers } from '../../apps/features/users/userSlice';

const CreateUser = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    nationality: '',
    skills: '',
    nid: '',
    address: '',
    phone: '',
    website: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation alert before submission

    await dispatch(createUser(formData));
    dispatch(fetchUsers());
    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      nationality: '',
      skills: '',
      nid: '',
      address: '',
      phone: '',
      website: '',
    }); // Clear form after submission

    // Show a success alert
    window.alert("User data submitted successfully!");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Additional Fields */}
          {[
            { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' },
            { label: 'Gender', name: 'gender', type: 'text', placeholder: 'Enter your gender' },
            { label: 'Nationality', name: 'nationality', type: 'text', placeholder: 'Enter your nationality' },
            { label: 'Skills', name: 'skills', type: 'text', placeholder: 'Enter your skills' },
            { label: 'NID', name: 'nid', type: 'text', placeholder: 'Enter your NID number' },
            { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your address' },
            { label: 'Phone', name: 'phone', type: 'text', placeholder: 'Enter your phone number' },
            { label: 'Website', name: 'website', type: 'url', placeholder: 'Enter your website URL' },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
