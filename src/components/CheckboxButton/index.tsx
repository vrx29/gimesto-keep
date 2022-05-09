type CheckboxButtonType = {
  name: string;
  element: Array<string>;
  handleChange: (label: string) => void;
};

export function CheckboxButton({ name, element, handleChange }: CheckboxButtonType) {
  return (
    <div className="flex items-center mr-4">
      <input
        id={'f' + name}
        type="checkbox"
        checked={element.includes(name)}
        onChange={() => handleChange(name)}
        value={name}
        className="w-4 h-4 accent-teal-600 rounded border-gray-300"
      />
      <label htmlFor={'f' + name} className="ml-2 text-sm font-medium text-gray-800 ">
        {name}
      </label>
    </div>
  );
}
