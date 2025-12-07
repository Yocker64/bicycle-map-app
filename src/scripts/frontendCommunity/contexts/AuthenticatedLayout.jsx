// AuthenticatedLayout.js
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


const AuthenticatedLayout = () => {
  const scrollableRef = useRef(null);

  return (
    <div className="flex h-screen">

      {/* Main content area */}
      <div className="flex-1 flex flex-col black-800 text-white transition-all duration-300">
        {/* Logo Container */}
        
      <div className='pt-4 flex flex-row justify-between items-center'>
      <div className="mt-2 text-md font-bold md:text-2xl pl-6">
        <Link to="/feed" className="transition flex justify-center items-center">
          <span className='font-bold text-2xl text-yellow-500'>Link</span>
        </Link>
        </div>
        {/* Search Bar */}
        <div className=' text-white'>
         <SearchBar />
        </div>
      </div>
       
        

        {/* Scrollable Content */}
        <div 
          ref={scrollableRef}
          className='black-800 flex-1 rounded-lg overflow-y-auto'>
          <Outlet context={{scrollableRef}}/>
        </div>
        <div>
        {/* <Sidebar/> */}
      <Navbar className="black-800 text-white" />
        </div>
       
      </div>

     
    </div>
  );
};

export default AuthenticatedLayout;
