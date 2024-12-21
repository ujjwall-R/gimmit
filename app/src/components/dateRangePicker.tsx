"use client";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import dayjs from "dayjs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaTimesCircle, FaSave } from "react-icons/fa";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

type DateRangePickerProps = {
  onRangeChange: (range: string | null) => void;
};

export default function DateRangePicker({ onRangeChange }: DateRangePickerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().toDate(),
    key: "selection",
  });
  const [tempRange, setTempRange] = useState(selectedRange);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isColumnVisible, setColumnVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleRangeChange = (ranges: any) => {
    const range = ranges.selection;
    if (range.startDate && range.endDate) {
      const endDate = dayjs(range.endDate).isAfter(dayjs()) ? dayjs().toDate() : range.endDate;
      setTempRange({ ...range, endDate });
    }
  };

  const handleSave = () => {
    setSelectedRange(tempRange);
    const formattedRange = `${dayjs(tempRange.startDate).format("YYYY-MM-DD")} - ${dayjs(tempRange.endDate).format("YYYY-MM-DD")}`;
    onRangeChange(formattedRange);
    setPickerVisible(false);
  };

  const handlePresetClick = (presetRange: { startDate: Date; endDate: Date }) => {
    const endDate = dayjs(presetRange.endDate).isAfter(dayjs()) ? dayjs().toDate() : presetRange.endDate;
    setTempRange({ ...presetRange, endDate, key: "selection" });
  };

  return (
    <div className="relative">
      <div
        onClick={() => setPickerVisible(!isPickerVisible)}
        className="bg-green-100 text-green-700 px-4 py-1 rounded-lg cursor-pointer"
      >
        {`${dayjs(selectedRange.startDate).format("YYYY-MM-DD")} - ${dayjs(selectedRange.endDate).format("YYYY-MM-DD")}`}
      </div>
      {isPickerVisible && (
        <div className="absolute top-full right-0 mt-2 z-50 bg-white shadow-lg p-4 rounded-md flex">
          {isColumnVisible && (
            <>
              <div className="p-2 mr-4 flex flex-col gap-2" style={{ width: "200px", height: "auto" }}>
                {[
                  { label: "Today", range: { startDate: dayjs().startOf("day").toDate(), endDate: dayjs().startOf("day").toDate() } },
                  { label: "Yesterday", range: { startDate: dayjs().subtract(1, "day").startOf("day").toDate(), endDate: dayjs().subtract(1, "day").toDate() } },
                  { label: "This Week", range: { startDate: dayjs().startOf("week").toDate(), endDate: dayjs().endOf("week").toDate() } },
                  { label: "Last Week", range: { startDate: dayjs().subtract(1, "week").startOf("week").toDate(), endDate: dayjs().subtract(1, "week").endOf("week").toDate() } },
                  { label: "This Month", range: { startDate: dayjs().startOf("month").toDate(), endDate: dayjs().toDate() } },
                  { label: "Last Month", range: { startDate: dayjs().subtract(1, "month").startOf("month").toDate(), endDate: dayjs().subtract(1, "month").endOf("month").toDate() } },
                ].map((option, index) => (
                  <div
                    key={option.label}
                    onClick={() => handlePresetClick(option.range)}
                    className="bg-green-100 text-green-700 text-sm py-2 px-3 rounded-2xl cursor-pointer hover:bg-green-300"
                  >
                    {option.label}
                  </div>
                ))}
              </div>
                <div className="border-l border-gray-300 mr-4"></div>
            </>
          )}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={() => setColumnVisible(!isColumnVisible)}
                className="bg-green-100 text-green-700 px-2 py-1 rounded"
              >
                {isColumnVisible ? <TbLayoutSidebarLeftExpandFilled size={18} /> : <TbLayoutSidebarRightExpandFilled size={18} />}
              </button>
              <div className="flex items-center gap-2">
                <FaSave className="cursor-pointer text-gray-600 text-lg" onClick={handleSave} />
                <FaTimesCircle className="cursor-pointer text-gray-600 text-xl" onClick={() => setPickerVisible(false)} />
              </div>
            </div>
            <DateRange
              ranges={[tempRange]}
              onChange={handleRangeChange}
              rangeColors={["#32CD32"]}
              showDateDisplay={false}
              direction="horizontal"
              months={2}
              className="custom-date-range"
            />
          </div>
        </div>
      )}
    </div>
  );
}