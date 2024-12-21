"use client";
import { useState } from "react";
import Image from "next/image";
import DateRangePicker from "@/components/dateRangePicker";

export default function Header({ appName }: { appName: string }) {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  return (
    <header className="bg-white shadow-md rounded-lg mx-6 mt-4 px-6 py-1 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">{appName}</h1>
      <div className="flex items-center gap-4">
        <DateRangePicker onRangeChange={setSelectedRange} />
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
          <Image src="/user-icon.png" alt="User" width={40} height={40} />
        </div>
      </div>
    </header>
  );
}