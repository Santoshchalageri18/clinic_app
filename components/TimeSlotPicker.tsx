"use client";

import { useState } from "react";

// Time slots with availability status
const timeSlots = {
  Morning: [
    { time: "08:00 AM", available: false },
    { time: "09:00 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
  ],
  Afternoon: [
    { time: "12:00 PM", available: true },
    { time: "01:00 PM", available: false },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
  ],
  Evening: [
    { time: "04:00 PM", available: true },
    { time: "05:00 PM", available: false },
    { time: "06:00 PM", available: false },
    { time: "07:00 PM", available: true },
  ],
  Night: [
    { time: "08:00 PM", available: true },
    { time: "09:00 PM", available: false },
    { time: "10:00 PM", available: true },
    { time: "11:00 PM", available: false },
  ],
};

interface TimeSlotPickerProps {
  selectedSlot: string;
  onSelect: (slot: string) => void;
  onClose: () => void;
}

export default function TimeSlotPicker({
  selectedSlot,
  onSelect,
  onClose,
}: TimeSlotPickerProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
  ]);
  const [tempSelectedSlot, setTempSelectedSlot] = useState(selectedSlot);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSlotClick = (time: string, available: boolean) => {
    if (available) {
      setTempSelectedSlot(time);
    }
  };

  const handleConfirm = () => {
    if (tempSelectedSlot) {
      onSelect(tempSelectedSlot);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="relative bg-white rounded-t-3xl w-full max-w-md shadow-2xl animate-slide-up-bottom">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Select Session Time
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Time Slots */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {Object.entries(timeSlots).map(([period, slots]) => {
              const isExpanded = expandedSections.includes(period);

              return (
                <div
                  key={period}
                  className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(period)}
                    className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  >
                    <h4 className="text-base font-semibold text-gray-900">
                      {period}
                    </h4>
                    <svg
                      className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Slots Grid */}
                  <div
                    className={`grid grid-cols-4 gap-2 mt-3 transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {slots.map((slot) => {
                      const isSelected = tempSelectedSlot === slot.time;
                      const isBooked = !slot.available;

                      return (
                        <button
                          key={slot.time}
                          onClick={() =>
                            handleSlotClick(slot.time, slot.available)
                          }
                          disabled={isBooked}
                          className={`
                            py-2.5 px-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap
                            ${
                              isSelected
                                ? "bg-pink-200 text-pink-800 border-2 border-pink-400 shadow-sm"
                                : isBooked
                                ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                                : "bg-white text-pink-600 border border-pink-300 hover:bg-pink-50 hover:border-pink-400 active:scale-95"
                            }
                          `}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 p-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-pink-300 text-pink-700 font-medium rounded-xl hover:bg-pink-50 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!tempSelectedSlot}
            className="flex-1 py-3 bg-gradient-to-r from-pink-200 to-purple-200 hover:from-pink-300 hover:to-purple-300 text-gray-900 font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
