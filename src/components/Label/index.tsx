type LabelTypeProps = {
  labels: Array<string>;
  data: { id: number; name: string };
  changeLabel: (label: string) => void;
};
export function Label({ labels, data, changeLabel }: LabelTypeProps) {
  return (
    <span className="flex items-center" key={data.id}>
      <input
        id={data.name}
        type="checkbox"
        onChange={() => changeLabel(data.name)}
        className="hidden"
      />
      <label
        htmlFor={data.name}
        className={`${
          labels.includes(data.name) ? 'bg-amber-200' : 'bg-white text-gray-900 bg-gray-100'
        } font-medium rounded-lg text-sm px-3 py-2.5`}>
        {data.name}
      </label>
    </span>
  );
}
