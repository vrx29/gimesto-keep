import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components';

export function Home() {
  return (
    <>
      <Sidebar />
      <main className="ml-52 bg-slate-100 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
