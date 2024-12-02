import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added missing imports
import { useDispatch, useSelector } from 'react-redux';   // Added missing imports
import { fetchUser } from '../../apps/features/users/userSlice';      // Import your action or adjust path accordingly

const UserDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle' || user?.id !== id) {
      dispatch(fetchUser(id)); // Fetch the user by ID
    }
  }, [dispatch, id, user, status]);

  if (status === 'loading') return <p>Loading user details...</p>;
  if (status === 'failed') return <p>Failed to load user details.</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-2">
        {user._id && <p><strong>ID:</strong> {user._id}</p>}
        {user.name && <p><strong>Name:</strong> {user.name}</p>}
        {user.age && <p><strong>Age:</strong> {user.age}</p>}
        {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
        {user.nationality && <p><strong>Nationality:</strong> {user.nationality}</p>}
        {user.skills && <p><strong>Skills:</strong> {user.skills}</p>}
        {user.nid && <p><strong>NID:</strong> {user.nid}</p>}
        {user.address && <p><strong>Address:</strong> {user.address}</p>}
        {user.email && <p><strong>Email:</strong> {user.email}</p>}
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        {user.website && (
          <p>
            <strong>Website:</strong>{' '}
            <a href={user.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
          </p>
        )}
        {/* Educational Qualifications */}
        {user.educationalQualifications && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Educational Qualifications</h2>
            {user.educationalQualifications.degree && <p><strong>Degree:</strong> {user.educationalQualifications.degree}</p>}
            {user.educationalQualifications.university && <p><strong>University:</strong> {user.educationalQualifications.university}</p>}
            {user.educationalQualifications.session && <p><strong>Session:</strong> {user.educationalQualifications.session}</p>}
            {user.educationalQualifications.cgpa && <p><strong>CGPA:</strong> {user.educationalQualifications.cgpa}</p>}
          </div>
        )}
      </div>
      <button
        onClick={() => navigate('/users')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Back to Users
      </button>
    </div>
  );
};

export default UserDetails;
