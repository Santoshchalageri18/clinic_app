"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

interface SessionCalendarProps {
  sessions: Array<{ date: Date; id: string }>;
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

export default function SessionCalendar({
  sessions,
  onDateSelect,
  selectedDate,
}: SessionCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const emptyDays = Array(startDayOfWeek).fill(null);

  const hasSession = (date: Date) => {
    return sessions.some((session) => isSameDay(new Date(session.date), date));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {daysInMonth.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isTodayDate = isToday(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const hasSessionOnDate = hasSession(date);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={`
                aspect-square relative flex items-center justify-center rounded-lg text-sm font-medium transition-all
                ${!isCurrentMonth && "text-gray-300 cursor-not-allowed"}
                ${isCurrentMonth && "hover:bg-gray-100 active:scale-95"}
                ${isTodayDate && "bg-primary-100 text-primary-700"}
                ${
                  isSelected && "bg-primary-600 text-white hover:bg-primary-700"
                }
                ${
                  hasSessionOnDate &&
                  !isSelected &&
                  "bg-blue-50 border border-blue-200"
                }
              `}
              disabled={!isCurrentMonth}
            >
              {format(date, "d")}
              {hasSessionOnDate && !isSelected && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
