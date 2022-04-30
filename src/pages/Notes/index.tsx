import React, { useState } from 'react';
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
              <li key={id}>
                <div className="bg-white rounded-lg p-2 mb-2">
                  <p className="text-sm font-medium overflow-hidden	whitespace-nowrap	text-ellipsis">
                    {item.title}
                  </p>
                  <p className="text-sm my-1 text-gray-600 overflow-hidden	whitespace-nowrap	text-ellipsis">
                    {item.content.blocks[0].text}
                  </p>
                  <p className="text-xs my-1 text-gray-400">Created on : {item.created}</p>
                </div>
              </li>
            ))}
        </ul>
      </section>
      <section className="grow bg-stone-50 max-h-screen overscroll-contain overflow-y-auto">
        <NotesEditor notes={notes} setNotes={setNotes} />
      </section>
    </div>
  );
}
