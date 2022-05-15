import { Link, useNavigate } from 'react-router-dom';
import hero from 'assets/images/hero.png';
import { Header } from 'components';
import { useAppSelector } from 'app/hooks';
import { useEffect } from 'react';

export function Landing() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    user?.authToken && navigate('/notes');
  }, [user]);

  return (
    <main className="py-2 px-4">
      <Header />
      <section className="flex h-[90vh]">
        <div className="flex flex-col justify-center items-start grow shrink basis-0">
          <h1 className="text-6xl font-extrabold pr-8 leading-[5rem]">
            <span className="text-teal-600">Create,</span>{' '}
            <span className="text-orange-400">Organize</span> and Edit{' '}
            <span className="text-yellow-400">Notes</span>
          </h1>
          <p className="py-6 text-gray-500">
            Gimesto notes is the best place to jot down quick thoughts or to save longer notes with
            labels, priority and Text formatting.
          </p>
          <Link
            to="/notes"
            role="button"
            className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
            Get Started Now
          </Link>
        </div>
        <div className="flex items-center grow shrink basis-0">
          <img src={hero} alt="Note Banner" className="h-4/6" />
        </div>
      </section>
    </main>
  );
}
