import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faLayerGroup,
  faUser,
  faBell,
  faSquarePlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { faMicroblog } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className='black-800 text-white flex flex-col h-full py-4 px-2 md:px-6 transition-all duration-300 border-r border-black-700'>
      {/* Logo Container */}
      <div className="mt-2 text-md font-bold md:text-2xl">
        <Link to="/feed" className="transition flex justify-center items-center">
          <span className='font-bold text-yellow-500'>Link</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Navigation Items */}
      <div className="flex flex-col items-center md:items-start flex-grow">
        {/* Menu Items */}
        <div className="flex flex-col space-y-6">
          <Link to="/feed" className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
            <FontAwesomeIcon icon={faHouse} />
            <span className="hidden md:inline">Posts</span>
          </Link>
          <Link to="/realms" className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
            <FontAwesomeIcon icon={faLayerGroup} />
            <span className="hidden md:inline">Groups</span>
          </Link>

          {/* Dropdown Menu for Creating Content */}
          <Menu as="div" className="relative">
            <MenuButton className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
              <FontAwesomeIcon icon={faSquarePlus} />
              <span className="hidden md:inline">Create</span>
            </MenuButton>
            <MenuItems className="absolute left-0 mt-2 w-40 black-800 rounded shadow-lg py-2 border border-gray-700 z-50">
              <MenuItem>
                <Link
                  to="/submit-post"
                  className="block px-4 py-2 text-sm text-gray-300 hover:black-700 space-x-2"
                >
                  <FontAwesomeIcon icon={faMicroblog} />
                  <span>New Post</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/submit-realm"
                  className="block px-4 py-2 text-sm text-gray-300 hover:black-700 space-x-2"
                >
                  <FontAwesomeIcon icon={faLayerGroup} />
                  <span>New Group</span>
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>

          {/* Notifications */}
          <div className="relative flex items-center">
            <Link to="/notifications" className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
              <div className='relative'>
                <FontAwesomeIcon icon={faBell} />
                {unreadCount !== 0 && (
                  <span className="absolute top-[-10px] right-[-12px] w-4 h-4 rounded-full text-xs text-white bg-red-600 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Notifications</span>
            </Link>
          </div>

          {/* Profile */}
          <Link to={`/profile/${userId}`} className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
            <FontAwesomeIcon icon={faUser} />
            <span className="hidden md:inline">Profile</span>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="h-8 flex items-center justify-center md:justify-start space-x-4 hover:text-gray-400 text-stone-200 transition mb-4"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span className="hidden md:inline">Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;