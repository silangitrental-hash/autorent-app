import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 16.5V14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v2.5" />
      <path d="M14 9.5V12a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V9.5" />
      <path d="M5 20h14" />
      <path d="M5 16.5l-1.5-1.2a2 2 0 0 1 0-2.6L5 11.5" />
      <path d="M19 16.5l1.5-1.2a2 2 0 0 0 0-2.6L19 11.5" />
      <path d="M12 2v4" />
      <path d="M12 20v2" />
    </svg>
  );
}
