import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const IconCard: React.FC<IconProps> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export const IconAccount: React.FC<IconProps> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconPlus: React.FC<IconProps> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconChevronRight: React.FC<IconProps> = ({ size = 18, color = '#AAAAAA' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const IconShopping: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

export const IconTravel: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
  </svg>
);

export const IconFood: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1" />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

export const IconTech: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

export const IconCheckCircle: React.FC<IconProps> = ({ size = 18, color = '#01D167' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const IconCardSmall: React.FC<IconProps> = ({ size = 13, color = '#0E4D7B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export const IconCardDetail: React.FC<IconProps> = ({ size = 20, color = '#01D167' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export const IconTransactions: React.FC<IconProps> = ({ size = 20, color = '#01D167' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);

export const IconHome: React.FC<IconProps> = ({ size = 24, color = "#FFFFFF" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(-2 4)">
      <rect width="24" height="24" transform="translate(2 -4)" fill="transparent" />

      <g transform="translate(2 -4)">
        <path
          d="M23.5,14.772c0,.067,0,.133-.069.133a.149.149,0,0,1-.138-.133c-.207-.266-10.675-11.323-11.157-11.723-.207-.2-.275-.133-.482.067C11.588,3.182.707,14.639.569,14.838c-.069.067-.138.067-.138-.067a10.912,10.912,0,0,1-.413-3.663A10.341,10.341,0,0,1,1.533,6.046,11.451,11.451,0,0,1,9.384.318,11.829,11.829,0,0,1,20.61,3.582a10.907,10.907,0,0,1,3.237,6.261,8.818,8.818,0,0,1,.138,1.932A15.1,15.1,0,0,1,23.5,14.772Z"
          fill={color}
        />
        <path
          d="M.08,9.109c-.069-.067-.138-.133,0-.266S8.275.25,8.482.05c.069-.067.138-.067.138,0,.275.333,8.2,8.726,8.4,8.859.069.067.069.133-.069.133a9.34,9.34,0,0,1-1.515,1.266,11.776,11.776,0,0,1-5.923,2.131,6.121,6.121,0,0,1-1.1.067A11.907,11.907,0,0,1,.08,9.109Z"
          transform="translate(3.451 10.925)"
          fill={color}
        />
      </g>
    </g>
  </svg>
);

export const IconCredit: React.FC<IconProps> = ({ size = 24, color = "#FFFFFF" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(-1.5 4)">
      <rect width="24" height="24" transform="translate(1.5 -4)" fill="transparent" />

      <g transform="translate(1.5 -4.001)">
        <path
          d="M12,24A12,12,0,0,1,3.515,3.516,12,12,0,0,1,20.485,20.487,11.922,11.922,0,0,1,12,24ZM10.453,9.746v8.837a1.162,1.162,0,0,0,1.161,1.161h.775a1.162,1.162,0,0,0,1.161-1.161V9.746l3.5,3.652a1.159,1.159,0,0,0,1.659.021l.527-.533a1.161,1.161,0,0,0,.342-.827,1.142,1.142,0,0,0-.342-.812L12.823,4.825a1.159,1.159,0,0,0-1.64,0L4.757,11.247a1.155,1.155,0,0,0-.342.824,1.142,1.142,0,0,0,.342.815l.527.533a1.166,1.166,0,0,0,.823.339,1.151,1.151,0,0,0,.842-.36l3.5-3.65Z"
          fill={color}
        />
      </g>
    </g>
  </svg>
);

export const IconPayments: React.FC<IconProps> = ({ size = 24, color = "#FFFFFF" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24.25"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(-2 4.125)">
      <rect width="24" height="24" transform="translate(2 -4)" fill="transparent" />

      <g transform="translate(-21.169 -14)">
        <path
          d="M35.169,10A11.837,11.837,0,0,0,23.5,22,11.838,11.838,0,0,0,35.167,34a11.33,11.33,0,0,0,6.651-2.2c.5-.473.811-.529.811-1.041l.007-.1a1.075,1.075,0,0,0-1.06-1.09,1.026,1.026,0,0,0-.764.343,9.322,9.322,0,0,1-5.633,1.9,9.7,9.7,0,0,1-9.563-9.833,9.567,9.567,0,1,1,19.127,0,10.009,10.009,0,0,1-.921,4.19,9.724,9.724,0,0,0-.49,1.185l-.007.1a1.078,1.078,0,0,0,1.063,1.092,1.054,1.054,0,0,0,1-.776l0,0A12.189,12.189,0,0,0,46.836,22,11.835,11.835,0,0,0,35.169,10ZM28.653,20.7a1.045,1.045,0,0,0,.3.676,1.026,1.026,0,0,0,.676.3h0a.791.791,0,0,0,.108,0l10.8,0a1.033,1.033,0,1,0,0-2.067l-8.437.012,1.222-1.234a1,1,0,0,0-1.413-1.413l-2.956,2.983a.988.988,0,0,0-.289.632l-.007,0a.654.654,0,0,0,0,.11ZM36.9,27.591a1,1,0,0,0,1.416,0l2.958-2.978a1,1,0,0,0,.289-.629l.007,0s0-.073,0-.108h0a1.039,1.039,0,0,0-.3-.673,1.05,1.05,0,0,0-.676-.3h0a.791.791,0,0,0-.108,0l-10.8,0a1.031,1.031,0,1,0,0,2.062l8.439-.012-1.222,1.237A.987.987,0,0,0,36.9,27.591Z"
          fill={color}
          stroke="#0C365A"
          strokeWidth="0.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);