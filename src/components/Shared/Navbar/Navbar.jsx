import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-indigo-600 shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        {/* Logo or Brand Name */}
        <Link to='/' className='text-white text-2xl font-bold'>
          Octopi
        </Link>

        {/* Navigation Links */}
        <ul className='hidden md:flex gap-6'>
          <li>
            <Link
              to='/createUser'
              className='text-white text-lg hover:text-gray-200 transition duration-300'
            >
              Create User
            </Link>
          </li>
          <li>
            <Link
              to='/userList'
              className='text-white text-lg hover:text-gray-200 transition duration-300'
            >
              User List
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button className='text-white text-2xl'>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default, can be toggled later) */}
      <div className='md:hidden px-4 pb-4'>
        <ul className='flex flex-col gap-4'>
          <li>
            <Link to='/createUser' className='text-white text-lg hover:text-gray-200 transition duration-300'>
              Create User
            </Link>
          </li>
          <li>
            <Link to='/userList' className='text-white text-lg hover:text-gray-200 transition duration-300'>
              User List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
