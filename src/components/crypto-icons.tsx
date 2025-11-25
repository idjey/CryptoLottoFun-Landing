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

export const BitcoinIcon = (props: SVGProps<SVGSVGElement>) => (
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
        <path d="M11.78 17.585c-1.28.235-2.56.09-3.72-.03-.5-.05-.88-.48-.88-.98V7.525c0-.49.38-.92.88-.98 1.16-.12 2.44-.265 3.72-.03.5.09.88.52.88 1.01v1.94c0 .48-.38.91-.88.99-1.16.18-2.44.33-3.72.03-.5-.05-.88-.48-.88-.98" />
        <path d="M8.22 10.425v3.15" />
        <path d="M11.78 8.475h1.94c.5 0 .88.44.88.98v1.19c0 .54-.38.98-.88.98h-1.94" />
        <path d="M11.78 12.575h2.92c.5 0 .88.44.88.98v1.19c0 .54-.38.98-.88.98h-2.92" />
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    </svg>
);


export const CurrencyIcon = (props: SVGProps<SVGSVGElement>) => (
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
        <circle cx="12" cy="12" r="8" />
        <path d="M12 18V6" />
        <path d="M8 14h4" />
        <path d="M8 10h4" />
    </svg>
);
