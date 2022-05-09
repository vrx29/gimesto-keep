import React from 'react';

type RadioButtonType = {
  name: string;
  group: string;
  element: string;
  handleElementChange: (priority: string) => void;
};
export function RadioButton({ name, group, element, handleElementChange }: RadioButtonType) {
  return (
    <div className="flex items-center mb-4">
      <input
        id={name}
        type="radio"
        value={name}
        checked={element === name}
        onChange={(e) => handleElementChange(e.target.value)}
        name={group}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 accent-teal-600"
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-800">
        {name}
      </label>
    </div>
  );
}
