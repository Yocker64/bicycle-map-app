import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { PuffLoader } from 'react-spinners';

const EditProfileModal = ({ open, handleModalClose, user, userId, setProfileMeta }) => {
  const [formData, setFormData] = useState({ username: '', bio: '' });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [fileError, setFileError] = useState('');
  const { updateSidebarUser } = useUser();


  const modalRef = useRef(null); // モーダルコンテナ用のRef
  const isDemoUser = user?.username === 'demo'; // ログインユーザーが「demo」かどうかを確認

  useEffect(() => {
    if (open && user) {
      setFormData({
        username: user.username || '',
        bio: user.bio || '',
      });
      setUsernameError('');
      setFileError('');
      setImagePreview(user.profilePictureUrl);
    }
  }, [open, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModalClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, handleModalClose]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // 有効なファイル形式を確認（PNG、JPEG、GIFのみ）
    if (file && !['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
      setFileError("無効なファイル形式です。PNG、JPEG、GIFのみ許可されています。");
      setProfilePictureFile(user.profilePictureUrl);
      setImagePreview(null);
      return;
    }
    setFileError("");

    setProfilePictureFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (profilePictureFile) {
        const pictureData = new FormData();
        pictureData.append('profilePicture', profilePictureFile);
        await api.put('/images/profile-picture', pictureData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      const response = await api.put(`/users/${userId}`, formData);
      updateSidebarUser(response.data.user); // 新しいデータでユーザーコンテキストを更新
      setProfileMeta(response.data.user);
      handleModalClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response?.data?.errors) {
        setUsernameError(error.response.data.errors[0].msg);
      }
      if (error.response?.data?.error) {
        setUsernameError(error.response.data.error);
      }
      if (error.response?.data?.message === 'Invalid file type') {
        setFileError("無効なファイル形式です。PNG、JPEG、GIFのみ許可されています。");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null; // 開いていない場合はモーダルをレンダリングしない

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div
        ref={modalRef}
        className="black-800 text-white rounded-lg shadow-lg max-w-lg w-full p-6"
      >
        <h2 className="text-2xl mb-4">プロフィールの更新</h2>
        <div className='border-t border-gray-700 my-6'></div>
        <form onSubmit={handleFormSubmit}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <PuffLoader color="#5C6BC0" size={60} />
            </div>
          ) : (
            <>
              <div className="relative mt-4 flex flex-col items-center justify-center">
                <div className='mb-1'>プロフィール写真の変更</div>
                <input
                  type="file"
                  accept="image/*"
                  id="profilePicture"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="profilePicture" className="relative cursor-pointer w-32 h-32">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-700"
                    />
                  )}
                  <div className="w-32 h-32 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl rounded-full opacity-0 hover:opacity-100 transition-opacity">
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                </label>
                {fileError && <p className="text-center text-red-500 mt-2">{fileError}</p>}
              </div>
              <div className="mt-4">
                <label htmlFor='username'>ユーザー名</label>
                <input
                  id="username"
                  type="text"
                  placeholder={isDemoUser ? "デモアカウントのため機能はロックされています" : "ユーザー名"}
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isDemoUser} // ユーザーが「demo」の場合、入力を無効化
                  className={`w-full p-2 rounded black-800 border-2 ${
                    usernameError ? 'border-red-500' : 'border-gray-700'
                  } text-white ${isDemoUser ? 'cursor-not-allowed opacity-50' : ''}`} // 無効化時のスタイルを調整
                />
                {usernameError && <p className="text-red-500">{usernameError}</p>}
              </div>
              <div className="mt-4">
                <label htmlFor='bio'>自己紹介&nbsp;<span className='text-sm'>（任意）</span></label>
                <textarea
                  id="bio"
                  placeholder="自己紹介（任意）"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-2 rounded black-800 border-2 border-gray-700 text-white"
                ></textarea>
              </div>
            </>
          )}
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleModalClose}
            className="mr-2 px-4 py-2 rounded black-700 hover:black-600 text-white"
          >
            キャンセル
          </button>
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="px-4 py-2 rounded bg-black-600 hover:bg-black-500 text-white"
          >
            変更を保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;