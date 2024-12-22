import * as Select from "@radix-ui/react-select";
import React, { useState } from "react";

export default () => {
  // You can use any API to generate a list of countries
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

  const [value, setValue] = useState("");
  const [countries, setCountries] = React.useState(menuItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const results = menuItems.filter((item) =>
      item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setTimeout(() => setCountries(results), 100);
  };

  return (
    <Select.Root
      onValueChange={setValue}
      onOpenChange={() => setCountries(menuItems)}
    >
      <div className="w-72 max-w-full">
        <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none font-mono">
          <Select.Value placeholder="Select a repository">
            {value}
          </Select.Value>
          <Select.Icon className="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            avoidCollisions={false}
            className="w-[var(--radix-select-trigger-width)] overflow-hidden mt-3 bg-white border rounded-lg shadow-sm text-sm font-mono"
          >
            <div className="shadow flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="p-2 text-gray-500 w-full rounded-lg outline-none border-none focus:ring-0 font-mono"
                onInput={handleSearch}
              />
            </div>
            <Select.Viewport className="max-h-64 mt-2 overflow-y-auto">
              {countries.length < 1 ? (
                <div className="px-3 py-2 text-gray-600 font-mono">
                  Nothing found.
                </div>
              ) : (
                ""
              )}
              {countries.map((item, idx) => (
                <SelectItem key={idx} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  );
};

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 font-mono data-[state=checked]:text-green-600 data-[state=checked]:bg-green-50 data-[highlighted]:text-green-600 data-[highlighted]:bg-green-50 data-[highlighted]:hover:text-green-600 data-[highlighted]:hover:bg-green-50 outline-none"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <div className="pr-4 line-clamp-1 font-mono">{children}</div>
        </Select.ItemText>
        <div className="w-6">
          <Select.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>{" "}
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  }
);