import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/User/userSlice';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
