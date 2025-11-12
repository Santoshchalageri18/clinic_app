"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const doctors = [
  {
    id: "1",
    name: "Dr. Tejas Sharma",
    phone: "+91 98765 43210",
    photo: "👨‍⚕️",
    expertise: "Gynaecology",
    gender: "Male",
    sessionMode: "In-Person & Online",
    sessionFee: "₹1,500/-",
  },
  {
    id: "2",
    name: "Dr. Priya Kapoor",
    phone: "+91 98765 43210",
    photo: "👩‍⚕️",
    expertise: "IVF Specialist",
    gender: "Female",
    sessionMode: "In-Person & Online",
    sessionFee: "₹2,000/-",
  },
  {
    id: "3",
    name: "Dr. Pranay Saxena",
    phone: "+91 98765 43210",
    photo: "👨‍⚕️",
    expertise: "Gynaecology",
    gender: "Male",
    sessionMode: "In-Person & Online",
    sessionFee: "₹1,800/-",
  },
  {
    id: "4",
    name: "Dr. Toshib Bagde",
    phone: "+91 98765 43210",
    photo: "👨‍⚕️",
    expertise: "Psychologist",
    gender: "Male",
    sessionMode: "Online Only",
    sessionFee: "₹1,200/-",
  },
];

export default function DoctorsPage() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(doctors[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleBookNow = (doctor: any) => {
    // Store selected doctor in sessionStorage
    sessionStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    router.push("/schedule-session");
  };

  return (
    <main className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-900"
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
          <h1 className="text-xl font-bold text-gray-900">Available Doctors</h1>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search Psychologists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 bg-white/80 backdrop-blur-sm border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
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
          <button className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:bg-white transition-colors">
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

        {/* Doctors List */}
        <div className="space-y-3">
          {filteredDoctors.map((doctor, index) => {
            const isExpanded = expandedId === doctor.id;

            return (
              <div
                key={doctor.id}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{doctor.photo}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-600">{doctor.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpand(doctor.id)}
                      className="text-gray-400 hover:text-gray-600 transition-transform duration-300"
                      style={{
                        transform: isExpanded
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

                  {/* Collapsed Info */}
                  {!isExpanded && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{doctor.expertise}</span>
                      <span className="font-semibold text-purple-600">
                        {doctor.sessionFee}
                      </span>
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="px-4 pb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Expertise</p>
                        <p className="font-medium text-gray-900 text-sm">
                          {doctor.expertise}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Gender</p>
                        <p className="font-medium text-gray-900 text-sm">
                          {doctor.gender}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          Session mode
                        </p>
                        <p className="font-medium text-gray-900 text-sm">
                          {doctor.sessionMode}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          Session Fee
                        </p>
                        <p className="font-semibold text-purple-600 text-sm">
                          {doctor.sessionFee}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookNow(doctor)}
                      className="w-full py-3 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-900 font-semibold rounded-xl transition-all active:scale-95 shadow-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
