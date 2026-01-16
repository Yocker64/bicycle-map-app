import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationsContext';
import NotificationsImage from '../assets/svgs/notification.svg';
import HomeImage from '../assets/svgs/home.svg';
import GroupImage from '../assets/svgs/group.svg';
import MapImage from '../assets/svgs/map.svg';
import NewPostImage from '../assets/svgs/plus.svg';
import UserImage from '../assets/svgs/user.svg';
import DoorImage from '../assets/svgs/door.svg';
import MarketImage from '../assets/svgs/market.svg';


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
    <nav className='black-800 text-white flex flex-row h-full py-4 px-2 md:px-6 transition-all duration-300 border-r border-black-700 flex flex-row items-center md:items-start flex-grow justify-around'>
       
          <Link to="/groups" className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
          <img src={GroupImage} alt="ホーム" className="w-5 h-5" />
            <span className="hidden md:inline">グループ</span>
          </Link>

          

          {/* Notifications */}
          <div className="relative flex items-center">
            <Link to="/notifications" className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
              <div className='relative'>
              <img src={NotificationsImage} alt="通知" className="w-5 h-5" />
                {unreadCount !== 0 && (
                  <span className="absolute top-[-10px] right-[-12px] w-4 h-4 rounded-full text-xs text-white bg-red-600 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">通知</span>
            </Link>
          </div>
          {/* New Post */}
          <Link to="/submit-post"
                  className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition"
                >
                   <img src={NewPostImage} alt="新規投稿" className="w-5 h-5" />
                  <span className="hidden md:inline">新規投稿</span>
                </Link>
            {/* Map */}

            <Link to={`http://10.40.211.54:map.html`} className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
          <img src={MapImage} alt="プロフィール" className="w-5 h-5" />
            <span className="hidden md:inline">マップ</span>
          </Link>
                {/* Free market */}
          <Link to={`/market`} className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
          <img src={MarketImage} alt="フリーマーケット" className="w-5 h-5" />
            <span className="hidden md:inline">ブラックマーケット</span>
          </Link>

          {/* Profile */}
          <Link to={`/profile/${userId}`} className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition">
          <img src={UserImage} alt="プロフィール" className="w-5 h-5" />
            <span className="hidden md:inline">プロフィール</span>
          </Link>


          
          {/* Logout Button */}
      <button
  onClick={handleLogout}
  className="h-8 flex items-center space-x-4 hover:text-gray-400 text-stone-200 transition"
>
  <img src={DoorImage} alt="ログアウト" className="w-5 h-5 " />
  <span className="hidden md:inline ">ログアウト</span>
</button>


      
    </nav>
  );
};

export default Navbar;