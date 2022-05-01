import { SVGProps } from 'react';

export function ArchiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
      <g fill="currentColor">
        <path d="M4 3a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z"></path>
        <path
          fillRule="evenodd"
          d="M3 8h14v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm5 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z"
          clipRule="evenodd"></path>
      </g>
    </svg>
  );
}
