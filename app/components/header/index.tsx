'use client';

import Image from 'next/image';
// import { Search } from 'lucide-react';

export default function IPLDashboardHeader() {
  return (
    <div className="w-full">
      {/* Top Blue Bar */}
      <div className="bg-[#003B8F] flex items-center justify-between px-4 py-2 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2 h-10">
          {/* <img src="/images/ipl-logo.png" /> */}
          <Image
            src="/images/ipl-logo.png" // Replace with your actual logo path or remote URL
            alt="IPL Logo"
            width={60}
            height={60}
          />
          {/* <span className="uppercase font-semibold text-sm">Indian Premier League</span> */}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#0A2D6A] text-white text-sm px-4 py-1">
        Home <span className="text-gray-300">/</span> Points Table
      </div>

      {/* Heading */}
      <div className="bg-[#0A1E3D] px-4 py-3 text-white text-lg font-bold uppercase">
        Points Table
      </div>
    </div>
  );
}
