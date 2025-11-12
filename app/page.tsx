"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// Mock data
const upcomingSession = {
  id: "1",
  time: "11:00 AM",
  duration: "01:00 HR",
  mode: "Online",
  doctor: {
    name: "Dr. Kiran Rathi",
    photo: "👨‍⚕️",
  },
  date: "Today",
  previousSession: "Tuesday, March 5, 2025",
};

const pastSessions = [
  {
    id: "1",
    time: "12:00 AM",
    doctor: "Dr. Ramesh Naik",
    date: "Tuesday, March 25, 2025",
  },
  {
    id: "2",
    time: "10:30 AM",
    doctor: "Dr. Suresh Sawant",
    date: "Tuesday, March 15, 2025",
  },
  {
    id: "3",
    time: "09:30 AM",
    doctor: "Dr. Neeta Singh",
    date: "Monday, March 11, 2025",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Good morning,</p>
              <h1 className="text-2xl font-bold text-gray-900">
                Manjunath Naik
              </h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-2xl shadow-md">
              👤
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search Psychologists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => router.push("/doctors")}
                readOnly
                className="w-full px-4 py-3 pr-10 bg-white border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm cursor-pointer"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
            </div>
            <button className="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors active:scale-95">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Upcoming Session */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Upcoming Session
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-slide-up">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{upcomingSession.doctor.photo}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {upcomingSession.doctor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span>{upcomingSession.mode}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsUpcomingExpanded(!isUpcomingExpanded)}
                  className="text-gray-400 hover:text-gray-600 transition-transform duration-300 p-1"
                  style={{
                    transform: isUpcomingExpanded
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Collapsible Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isUpcomingExpanded
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Time</span>
                    <span className="font-semibold text-gray-900">
                      {upcomingSession.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Session Duration</span>
                    <span className="font-semibold text-gray-900">
                      {upcomingSession.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Session Mode</span>
                    <span className="font-semibold text-gray-900">
                      {upcomingSession.mode}
                    </span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-pink-200 to-purple-200 hover:from-pink-300 hover:to-purple-300 text-gray-900 font-medium rounded-xl transition-all active:scale-95 shadow-sm">
                  Mark as Completed
                </button>

                <p className="text-xs text-gray-500 mt-3">
                  Previous Session: {upcomingSession.previousSession}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Sessions */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Past Sessions
          </h2>
          <div className="space-y-3">
            {pastSessions.map((session, index) => (
              <div
                key={session.id}
                className="bg-white/90 rounded-xl p-4 flex items-center justify-between hover:bg-white transition-all hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 shadow-sm">
                    {session.time.split(":")[0]}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {session.doctor}
                    </h3>
                    <p className="text-xs text-gray-500">{session.date}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {session.time}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <div className="container mx-auto max-w-md pointer-events-auto">
          <Button
            onClick={() => router.push("/doctors")}
            variant="primary"
            size="lg"
            className="w-full bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-900 font-semibold shadow-lg"
          >
            Schedule Now
          </Button>
        </div>
      </div>
    </main>
  );
}
