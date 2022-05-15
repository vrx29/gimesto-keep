import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header } from 'components';
import { clearError, loginUser, setFormError } from 'features/User/userSlice';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validateEmail } from 'utils';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from.pathname || '/';

  useEffect(() => {
    user?.authToken && navigate(from, { replace: true });
  }, [user]);

  useEffect(() => {
    let timer: any;
    if (error.length > 0) {
      timer = setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      dispatch(setFormError('Please fill all the fields'));
    } else if (!validateEmail(email)) {
      dispatch(setFormError('Please enter proper email address'));
    } else {
      dispatch(loginUser({ email, password }));
    }
  };
  return (
    <main className="p-4">
      <Header />
      <section className="h-[90vh] flex item-center">
        <div className="w-96 m-auto bg-gray-50 py-8 px-4 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-8">Login</h1>
          <form>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 outline-none focus:border-teal-500 block w-full p-2.5"
                placeholder="name@domain.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Your password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 outline-none focus:border-teal-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="mb-4">{error && <p className="text-red-500">{error}</p>}</div>
            <button
              type="submit"
              onClick={handleLogin}
              className="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Submit
            </button>
          </form>
          <p className="mt-6 text-gray-500">
            Don't have an account? &nbsp;
            <Link to="/signup" className="text-teal-600 font-semibold cursor-pointer">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
