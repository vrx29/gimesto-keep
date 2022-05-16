import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'features/User/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="flex justify-between">
      <Link to="/" className="text-xl font-bold text-teal-600">
        Gimesto<span className="text-yellow-400">keep</span>
      </Link>
      {user?.authToken ? (
        <button
          onClick={logoutHandler}
          className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
          Log out
        </button>
      ) : (
        <Link
          to="/login"
          role="button"
          className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
          Log in
        </Link>
      )}
    </header>
  );
}
