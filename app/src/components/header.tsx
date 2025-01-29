"use client";
import { useState } from "react";
import Image from "next/image";
import DateRangePicker from "@/components/date_range_picker";
import DropDownSearchSelect from "./drop_down_search_select";

export default function Header() {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const menuItems = [
    "archlinux/archwiki",
    "microsoft/vscode",
    "mongodb/mongo",
    "facebook/react",
    "python/cpython",
    "torvalds/linux",
    "flutter/flutter",
    "vercel/next.js",
    "golang/go",
    "nodejs/node",
    "facebook/create-react-app",
    "microsoft/TypeScript",
    "tailwindlabs/tailwindcss",
  ];

  return (
    <header className="bg-white shadow-md rounded-2xl border px-4 py-1 flex justify-between items-center h-16 mx-4 mt-4">
      <DropDownSearchSelect placeHolder={"Select a repository"} menuItems={menuItems}/>
      {/* <div className="flex items-center gap-4"> */}
        <DateRangePicker onRangeChange={setSelectedRange} />
        {/* <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
          <Image src="/user-icon.png" alt="User" width={40} height={40} />
        </div> */}
      {/* </div> */}
    </header>
  );
}