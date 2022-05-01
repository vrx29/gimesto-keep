import React, { useState } from 'react';
import { ArchiveIcon, DeleteIcon } from '../../assets/icons';
import { NotesEditor } from '../../components';
import { NotesType } from '../../types/notes';

export function Notes() {
  const [notes, setNotes] = useState<Array<NotesType>>([] as Array<NotesType>);

  return (
    <div className="flex min-h-screen">
      <section className="min-w-[380px] max-w-sm shrink-0 p-4 overscroll-contain overflow-y-auto sticky max-h-screen">
        <div className="">
          <input
            type="search"
            placeholder="Search notes"
            className="w-full h-10 rounded-lg pl-2 outline-none"
          />
        </div>
        <ul className="mt-4">
          {notes &&
            notes.map((item, id) => (
              <li key={id} className="bg-white rounded-lg p-2 mb-2">
                <p className="text-sm font-medium overflow-hidden	whitespace-nowrap	text-ellipsis">
                  {item.title}
                </p>
                <p className="text-sm my-1 text-gray-600 overflow-hidden whitespace-nowrap	text-ellipsis">
                  {item.content.blocks[0].text}
                </p>
                <p className="text-xs my-1 text-gray-400">Created on : {item.created}</p>
                <div className="flex gap-0.5">
                  {item.labels.map((label, id) => (
                    <span
                      key={id}
                      className="text-xs py-0.5 px-2 rounded-md bg-orange-200 text-slate-700">
                      {label}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2 text-xl text-slate-700">
                  <button className="text">
                    <ArchiveIcon />
                  </button>
                  <button className="text-red-400">
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </section>
      <NotesEditor notes={notes} setNotes={setNotes} />
    </div>
  );
}
