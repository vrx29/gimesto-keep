import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'features/User/userSlice';
import { useNavigate } from 'react-router-dom';
import avatar from 'assets/images/avatar.svg';

export function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <main className="p-4">
      <div className="w-96 flex flex-col items-center m-auto mt-8">
        <img src={avatar} className="rounded-full h-24 w-24 mb-12" />
        <div className="w-full flex justify-between">
          <span className="text-gray-400">First Name</span>
          <span>{user.firstName}</span>
        </div>
        <div className="w-full flex justify-between">
          <span className="text-gray-400">Last Name</span>
          <span>{user.lastName}</span>
        </div>
        <div className="w-full flex justify-between">
          <span className="text-gray-400">Email</span>
          <span>{user.email}</span>
        </div>
        <button
          onClick={logoutHandler}
          className="text-white bg-red-500 focus:outline-none hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mt-16">
          Logout
        </button>
      </div>
    </main>
  );
}
