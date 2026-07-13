import React from 'react';

interface TeamLogoProps {
  team: string;
  className?: string;
}

export default function TeamLogo({ team, className = "w-5 h-5" }: TeamLogoProps) {
  const norm = team.toLowerCase();

  if (norm.includes('red bull') || norm.includes('rbr')) {
    // Red Bull Racing Badge
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#3671C6" strokeWidth="2" fill="#0c1020" />
        <circle cx="12" cy="12" r="6" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M 8,14 C 9,11 11,10 12,11.5 C 13,10 15,11 16,14" stroke="#FF1801" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="7.5" r="1.5" fill="#FFB800" />
      </svg>
    );
  }

  if (norm.includes('mercedes') || norm.includes('petronas') || norm.includes('mer')) {
    // Mercedes Star
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#27F4D2" strokeWidth="1.5" fill="#091414" />
        <path d="M 12,3 L 12,12 M 12,12 L 4.5,16.5 M 12,12 L 19.5,16.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 12,3 L 8,10.5 L 12,12 L 16,10.5 Z" fill="#ffffff" fillOpacity="0.1" />
        <path d="M 4.5,16.5 L 11,14.5 L 12,12 L 7,10 Z" fill="#ffffff" fillOpacity="0.1" />
        <path d="M 19.5,16.5 L 13,14.5 L 12,12 L 17,10 Z" fill="#ffffff" fillOpacity="0.1" />
      </svg>
    );
  }

  if (norm.includes('ferrari') || norm.includes('scuderia') || norm.includes('fer')) {
    // Ferrari Shield
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 5,4 H 19 L 17,17 C 16,20 12,22 12,22 C 12,22 8,20 7,17 Z" fill="#FFB800" stroke="#E80020" strokeWidth="1.5" />
        {/* Prancing horse abstract representation */}
        <path d="M 10,16 C 11,15 11,14 10.5,12 C 11,11 12,12 12,10.5 C 12.5,9.5 12,8.5 11.5,7 C 12.5,7.5 13.5,9.5 13,11 C 13.5,12 14,11.5 14,13.5 C 13.5,14.5 12.5,15.5 13.5,17" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Tricolore strip on top */}
        <rect x="7" y="5.5" width="3" height="1.5" fill="#00D25B" />
        <rect x="10" y="5.5" width="4" height="1.5" fill="#ffffff" />
        <rect x="14" y="5.5" width="3" height="1.5" fill="#FF1801" />
      </svg>
    );
  }

  if (norm.includes('mclaren') || norm.includes('mcl')) {
    // McLaren speedmark
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#FF8000" strokeWidth="1.5" fill="#140d04" />
        {/* Elegant swoop */}
        <path d="M 7,14 C 11,14 16,11 17.5,7 C 15.5,10 10.5,10 7,11" fill="#FF8000" />
        <path d="M 17.5,7 C 16.5,8.5 14.5,10 12.5,10.5 C 15,10 17,9 17.5,7" fill="#ffffff" />
      </svg>
    );
  }

  // Fallback F1 badge
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#e10600" strokeWidth="1.5" fill="#0a0a0c" />
      <path d="M 8,8 H 16 M 12,8 V 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Reusable premium F1 Logo component
export function F1Logo({ className = "h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red F1 stylized brand shape */}
      <path 
        d="M 5,3 H 26 L 24.5,9 H 14.5 L 13.5,13 H 22 L 20.5,19 H 12 L 11,23 H 5 Z" 
        fill="#e10600" 
      />
      {/* The slanted speed lines of the "1" */}
      <path d="M 29,3 L 24,23 H 28.5 L 33.5,3 Z" fill="#ffffff" />
      <path d="M 35.5,3 L 30.5,23 H 34 L 39,3 Z" fill="#ffffff" fillOpacity="0.4" />
    </svg>
  );
}
