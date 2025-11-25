import type { SVGProps } from 'react';

export const EthereumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 12 6-7 6 7-6 7-6-7Z" />
    <path d="M12 19V5" />
    <path d="m6 12 6 7" />
    <path d="m18 12-6 7" />
  </svg>
);

export const DogecoinIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 12a5 5 0 0 0-5 5" />
        <path d="M17 12a5 5 0 0 1-5 5" />
        <path d="M12 12a5 5 0 0 1 5-5" />
        <path d="M7 12a5 5 0 0 0 5-5" />
        <path d="m7 7 2 2" />
        <path d="m17 7-2 2" />
    </svg>
);
