import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header } from 'components';
import { clearError, setFormError, signUpUser } from 'features/User/userSlice';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validateEmail } from 'utils';

export function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from.pathname || '/';

  useEffect(() => {
    user?.authToken && navigate(from, { replace: true });
  }, []);

  useEffect(() => {
    let timer: any;
    if (error.length > 0) {
      timer = setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleSignUp = (e: any) => {
    e.preventDefault();
    if ([firstName, lastName, email, password].includes('')) {
      dispatch(setFormError('Please fill all the fields'));
    } else if (!validateEmail(email)) {
      dispatch(setFormError('Please enter proper email address'));
    } else {
      dispatch(signUpUser({ firstName, lastName, email, password }));
    }
  };

  return (
    <main className="p-4">
      <Header />
      <section className="h-[90vh] flex item-center">
        <div className="w-96 m-auto bg-gray-50 py-8 px-4 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-8">Sign Up</h1>
          <form>
            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="mb-4">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 outline-none focus:border-teal-500 block w-full p-2.5"
                  placeholder="John"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 outline-none focus:border-teal-500 block w-full p-2.5"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email address
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
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
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
              onClick={handleSignUp}
              className="w-full text-white bg-teal-600 hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 font-semibold cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
