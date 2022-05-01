import { SVGProps } from 'react';

export function NoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M200 32h-16v-8a8 8 0 0 0-16 0v8h-32v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H56a16 16 0 0 0-16 16v152a32.1 32.1 0 0 0 32 32h112a32.1 32.1 0 0 0 32-32V48a16 16 0 0 0-16-16Zm-40 136H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16Zm0-32H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16Z"></path>
    </svg>
  );
}
