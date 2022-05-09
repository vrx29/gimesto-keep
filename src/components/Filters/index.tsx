import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CheckboxButton } from 'components/CheckboxButton';
import { RadioButton } from 'components/RadioButton';
import { clearFilters, saveFilters } from 'features/Notes/notesSlice';
import React, { useState } from 'react';

export function Filters({ setShowFilters }: any) {
  const filters = useAppSelector((state) => state.notes.filters);
  const dispatch = useAppDispatch();
  const [priority, setPriority] = useState(filters.priority);
  const [timeSort, setTimeSort] = useState(filters.sortByTime);
  const [labels, setLabels] = useState<Array<string>>(filters.labels || []);

  const lableHandler = (label: string) => {
    if (labels.includes(label)) {
      const newLabels = labels.filter((i) => i !== label);
      setLabels(newLabels);
    } else {
      setLabels([...labels, label]);
    }
  };

  const clearFilterData = () => {
    setPriority('');
    setTimeSort('');
    setLabels([]);
    dispatch(clearFilters());
  };

  const applyFilters = () => {
    dispatch(saveFilters({ priority, sortByTime: timeSort, labels }));
    setShowFilters(false);
  };

  return (
    <div
      onClick={() => setShowFilters(false)}
      className="block absolute h-full w-full top-0 left-0 bg-gray-500 bg-opacity-30 flex justify-center items-center">
      <div
        className="w-80 bg-white text-black px-4 py-8 rounded-3xl"
        onClick={(e) => e.stopPropagation()}>
        <h6 className="text-black text-center text-xl mb-4 font-semibold">Filters</h6>
        <p className="font-medium mb-2">Sort by priority</p>
        <div className="flex gap-4 flex-wrap mb-4">
          <RadioButton
            name="Low to High"
            group="priority"
            element={priority}
            handleElementChange={setPriority}
          />
          <RadioButton
            name="High to Low"
            group="priority"
            element={priority}
            handleElementChange={setPriority}
          />
        </div>
        <p className="font-medium mb-2">Sort by created time</p>
        <div className="flex gap-4 flex-wrap mb-4">
          <RadioButton
            name="Recent first"
            group="time"
            element={timeSort}
            handleElementChange={setTimeSort}
          />
          <RadioButton
            name="Old first"
            group="time"
            element={timeSort}
            handleElementChange={setTimeSort}
          />
        </div>
        <p className="font-medium mb-2">Filter by labels</p>
        <div className="flex gap-4 flex-wrap">
          <CheckboxButton name="Home" element={labels} handleChange={lableHandler} />
          <CheckboxButton name="Work" element={labels} handleChange={lableHandler} />
          <CheckboxButton name="Study" element={labels} handleChange={lableHandler} />
          <CheckboxButton name="Fun" element={labels} handleChange={lableHandler} />
        </div>

        <div className="flex mt-8 gap-4 justify-between flex-wrap">
          <button
            type="button"
            onClick={clearFilterData}
            className="flex items-center text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
            Clear filters
          </button>
          <button
            type="button"
            onClick={applyFilters}
            className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}
