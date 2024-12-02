import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='container mx-auto'>
      {/* <Link className='/'><p>Home</p></Link> */}
      <ul className=' flex gap-2'>
        <Link to='/createUser'><li className='font-bold underline'>CreateUser</li></Link>
        <Link to='/userList'><li className='font-bold underline'>UserList</li></Link>
      </ul>
    </div>
  );
};

export default Navbar;