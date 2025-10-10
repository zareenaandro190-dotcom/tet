import React from 'react';

export function AppLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="hsl(var(--primary))">
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
        <path d="M197.66 186.34a8 8 0 0 1-11.32-11.32l24-24a8 8 0 0 1 11.32 11.32Z" />
        <path d="m154.51 140.85-24 16a8 8 0 0 1-8-13.7l24-16a8 8 0 0 1 8 13.7Z" />
        <path d="m112 112-40-16a8 8 0 0 1 6.4-14.8l40 16a8 8 0 1 1-6.4 14.8Z" />
        <circle cx="80" cy="144" r="16" />
        <circle cx="176" cy="80" r="16" />
      </g>
    </svg>
  );
}
