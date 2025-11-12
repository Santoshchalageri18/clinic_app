"use client";

import { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import TimeSlotPicker from "./TimeSlotPicker";

const practitioners = [
  { value: "saria-dilon", label: "Saria Dilon - +91 9876543210" },
  { value: "dr-sharma", label: "Dr. Sharma - +91 9876543211" },
  { value: "dr-patel", label: "Dr. Patel - +91 9876543212" },
];

const sessionTypes = [
  { value: "counselling-1hr", label: "Counselling (1 hour)" },
  { value: "counselling-30min", label: "Counselling (30 minutes)" },
  { value: "therapy-1hr", label: "Therapy (1 hour)" },
];

interface SessionSchedulerProps {
  onComplete: () => void;
}

export default function SessionScheduler({
  onComplete,
}: SessionSchedulerProps) {
  const [formData, setFormData] = useState({
    patientName: "Shubham Naik",
    patientPhone: "+91 9876543210",
    practitioner: "",
    sessionType: "",
    sessionMode: "in-person",
    date: "",
    timeSlot: "",
    onlineLink: "",
    sessionDetails: "",
  });

  const [showTimeSlotPicker, setShowTimeSlotPicker] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.practitioner)
      newErrors.practitioner = "Please select a practitioner";
    if (!formData.sessionType)
      newErrors.sessionType = "Please select session type";
    if (!formData.date) newErrors.date = "Please select date";
    if (!formData.timeSlot) newErrors.timeSlot = "Please select time slot";
    if (formData.sessionMode === "online" && !formData.onlineLink) {
      newErrors.onlineLink = "Please enter online session link";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Session scheduled:", formData);
      alert("Session scheduled successfully!");
      onComplete();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Patient Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <p className="text-xs text-gray-600 mb-1">Patient</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-xl">
            👤
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {formData.patientName}
            </p>
            <p className="text-sm text-gray-600">{formData.patientPhone}</p>
          </div>
        </div>
      </div>

      {/* Assign Practitioner */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assign Practitioner <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.practitioner}
          onChange={(e) => handleChange("practitioner", e.target.value)}
          options={practitioners}
          error={errors.practitioner}
        />
      </div>

      {/* Session Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Type <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.sessionType}
          onChange={(e) => handleChange("sessionType", e.target.value)}
          options={sessionTypes}
          error={errors.sessionType}
        />
      </div>

      {/* Session Mode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Mode <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.sessionMode === "in-person"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white hover:border-purple-300"
            }`}
          >
            <input
              type="radio"
              name="sessionMode"
              value="in-person"
              checked={formData.sessionMode === "in-person"}
              onChange={(e) => handleChange("sessionMode", e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium text-gray-900 text-sm">
                In-Person
              </span>
            </div>
            {formData.sessionMode === "in-person" && (
              <div className="absolute top-2 right-2">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </label>

          <label
            className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.sessionMode === "online"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white hover:border-purple-300"
            }`}
          >
            <input
              type="radio"
              name="sessionMode"
              value="online"
              checked={formData.sessionMode === "online"}
              onChange={(e) => handleChange("sessionMode", e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium text-gray-900 text-sm">Online</span>
            </div>
            {formData.sessionMode === "online" && (
              <div className="absolute top-2 right-2">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Date and Time Slot */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            min={today}
            error={errors.date}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Time Slot <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowTimeSlotPicker(true)}
            className={`w-full px-3 py-2 text-left border rounded-lg transition-colors ${
              formData.timeSlot
                ? "border-gray-300 bg-white"
                : "border-gray-300 bg-white text-gray-400"
            } ${errors.timeSlot ? "border-red-500 bg-red-50" : ""}`}
          >
            {formData.timeSlot || "Select"}
          </button>
          {errors.timeSlot && (
            <p className="mt-1 text-sm text-red-600">{errors.timeSlot}</p>
          )}
        </div>
      </div>

      {/* Online Session Link */}
      {formData.sessionMode === "online" && (
        <Input
          label="Online Session Link"
          placeholder="Add Online Session Link or WhatsApp Number"
          value={formData.onlineLink}
          onChange={(e) => handleChange("onlineLink", e.target.value)}
          error={errors.onlineLink}
          required
        />
      )}

      {/* Session Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Details (Optional)
        </label>
        <textarea
          value={formData.sessionDetails}
          onChange={(e) => handleChange("sessionDetails", e.target.value)}
          placeholder="Enter session details here"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onComplete}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-900 font-semibold"
        >
          Confirm
        </Button>
      </div>

      {/* Time Slot Picker Modal */}
      {showTimeSlotPicker && (
        <TimeSlotPicker
          selectedSlot={formData.timeSlot}
          onSelect={(slot: string) => {
            handleChange("timeSlot", slot);
            setShowTimeSlotPicker(false);
          }}
          onClose={() => setShowTimeSlotPicker(false)}
        />
      )}
    </form>
  );
}
