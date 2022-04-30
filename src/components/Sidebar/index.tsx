import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebar } from '../../data/sidebar';

export function Sidebar() {
  return (
    <aside className="h-full fixed w-52 top-0 left-0 overflow-x-hidden px-2 py-4 bg-gray-800 text-slate-50">
      <h5 className="font-medium">Gimesto Keep</h5>
      <nav className="mt-12">
        {sidebar.map((item) => (
          <NavLink
            key={item.id}
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center mb-2 cursor-pointer text-teal-500 font-semibold'
                : 'flex items-center mb-2 cursor-pointer text-slate-400'
            }>
            <span className="text-2xl p-2 rounded mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
