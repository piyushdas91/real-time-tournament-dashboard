"use client";

import Image from "next/image";
import Link from "next/link";
// import { Search } from 'lucide-react';

export default function IPLDashboardHeader({ header }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-[#003B8F] border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 h-10">
          {/* <img src="/images/ipl-logo.png" /> */}
          <Link href="/">
            <Image
              src="/images/ipl-logo.png" // Replace with your actual logo path or remote URL
              alt="IPL Logo"
              width={60}
              height={60}
            />
          </Link>

          <span className="uppercase text-white text-center font-semibold text-md">
            {header}
          </span>
        </div>
      </div>
    </header>
  );
}
