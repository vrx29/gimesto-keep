import { useAppSelector } from 'app/hooks';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteType = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteType): any {
  let location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  if (user?.authToken) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
