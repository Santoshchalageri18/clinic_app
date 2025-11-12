"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import CustomSelect from "@/components/ui/CustomSelect";
import SuccessModal from "@/components/SuccessModal";

const practitioners = [
  { value: "saria-dilon", label: "Saria Dilon", phone: "+91 9876543210" },
  { value: "dr-sharma", label: "Dr. Sharma", phone: "+91 9876543211" },
  { value: "dr-patel", label: "Dr. Patel", phone: "+91 9876543212" },
];

const sessionTypes = [
  { value: "counselling-1hr", label: "Counselling (1 hour)" },
  { value: "counselling-30min", label: "Counselling (30 minutes)" },
  { value: "therapy-1hr", label: "Therapy (1 hour)" },
];

const existingPatients = [
  {
    id: "1",
    name: "Shubham Naik",
    mobileNumber: "9876543210",
    whatsappNumber: "9876543210",
    email: "shubham@example.com",
    address: "123 Main Street, Pune, Maharashtra",
  },
  {
    id: "2",
    name: "Priya Sharma",
    mobileNumber: "9876543211",
    whatsappNumber: "9876543211",
    email: "priya@example.com",
    address: "456 Park Avenue, Mumbai, Maharashtra",
  },
  {
    id: "3",
    name: "Rahul Verma",
    mobileNumber: "9876543212",
    whatsappNumber: "9876543212",
    email: "rahul@example.com",
    address: "789 Garden Road, Bangalore, Karnataka",
  },
];

export default function ScheduleSessionPage() {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [step, setStep] = useState<"patient" | "session">("patient");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [patientData, setPatientData] = useState({
    name: "",
    mobileNumber: "",
    whatsappNumber: "",
    whatsappSameAsMobile: false,
    email: "",
    address: "",
  });

  const [sessionData, setSessionData] = useState({
    practitioner: "",
    sessionType: "",
    sessionMode: "in-person" as "in-person" | "online",
    date: "",
    timeSlot: "",
    onlineLink: "",
    sessionDetails: "",
  });

  const [showTimeSlotPicker, setShowTimeSlotPicker] = useState(false);
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [patientSuggestions, setPatientSuggestions] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const doctor = sessionStorage.getItem("selectedDoctor");
    if (doctor) {
      const parsedDoctor = JSON.parse(doctor);
      setSelectedDoctor(parsedDoctor);

      const matchingPractitioner = practitioners.find((p) =>
        p.label
          .toLowerCase()
          .includes(parsedDoctor.name.toLowerCase().split(" ")[1])
      );
      if (matchingPractitioner) {
        setSessionData((prev) => ({
          ...prev,
          practitioner: matchingPractitioner.value,
        }));
      }
    }
  }, []);

  const handlePatientSearch = (
    value: string,
    field: "name" | "mobileNumber"
  ) => {
    if (value.length >= 2) {
      const matches = existingPatients.filter((patient) => {
        if (field === "name") {
          return patient.name.toLowerCase().includes(value.toLowerCase());
        } else {
          return patient.mobileNumber.includes(value);
        }
      });
      setPatientSuggestions(matches);
      setShowPatientSuggestions(matches.length > 0);
    } else {
      setShowPatientSuggestions(false);
      setPatientSuggestions([]);
    }
  };

  const handleSelectExistingPatient = (patient: any) => {
    setPatientData({
      name: patient.name,
      mobileNumber: patient.mobileNumber,
      whatsappNumber: patient.whatsappNumber,
      whatsappSameAsMobile: patient.mobileNumber === patient.whatsappNumber,
      email: patient.email,
      address: patient.address,
    });
    setShowPatientSuggestions(false);
  };

  const handlePatientChange = (
    field: keyof typeof patientData,
    value: string | boolean
  ) => {
    setPatientData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "whatsappSameAsMobile" && value === true) {
        updated.whatsappNumber = updated.mobileNumber;
      }

      if (field === "mobileNumber" && updated.whatsappSameAsMobile) {
        updated.whatsappNumber = value as string;
      }

      return updated;
    });

    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }

    if (field === "name" || field === "mobileNumber") {
      handlePatientSearch(value as string, field);
    }
  };

  const handleSessionChange = (
    field: keyof typeof sessionData,
    value: string
  ) => {
    setSessionData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const validatePatientInfo = () => {
    const newErrors: any = {};
    if (!patientData.name || patientData.name.length < 2) {
      newErrors.name = "Name is required (min 2 characters)";
    }
    if (
      !patientData.mobileNumber ||
      !/^[6-9]\d{9}$/.test(patientData.mobileNumber)
    ) {
      newErrors.mobileNumber = "Invalid mobile number (10 digits)";
    }
    if (
      !patientData.whatsappNumber ||
      !/^[6-9]\d{9}$/.test(patientData.whatsappNumber)
    ) {
      newErrors.whatsappNumber = "Invalid WhatsApp number";
    }
    if (
      !patientData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!patientData.address || patientData.address.length < 10) {
      newErrors.address = "Address is required (min 10 characters)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSessionInfo = () => {
    const newErrors: any = {};
    if (!sessionData.practitioner)
      newErrors.practitioner = "Please select a practitioner";
    if (!sessionData.sessionType)
      newErrors.sessionType = "Please select session type";
    if (!sessionData.date) newErrors.date = "Please select date";
    if (!sessionData.timeSlot) newErrors.timeSlot = "Please select time slot";
    if (sessionData.sessionMode === "online" && !sessionData.onlineLink) {
      newErrors.onlineLink = "Please enter online session link";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validatePatientInfo()) {
      setStep("session");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSessionInfo()) {
      const fullData = { ...patientData, ...sessionData };
      console.log("Session scheduled:", fullData);

      setShowSuccessModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    sessionStorage.removeItem("selectedDoctor");
    router.push("/");
  };

  const today = new Date().toISOString().split("T")[0];
  const selectedPractitioner = practitioners.find(
    (p) => p.value === sessionData.practitioner
  );

  return (
    <main className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-6 max-w-md pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() =>
              step === "session" ? setStep("patient") : router.back()
            }
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
          <h1 className="text-xl font-bold text-gray-900">Schedule Session</h1>
        </div>

        {step === "patient" ? (
          /* PATIENT INFORMATION FORM */
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-5"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Patient Information
              </p>
              <p className="text-xs text-blue-700">
                Enter patient details or select from existing patients
              </p>
            </div>

            {/* Name with autocomplete */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter patient name"
                value={patientData.name}
                onChange={(e) => handlePatientChange("name", e.target.value)}
                onFocus={() => {
                  if (patientData.name.length >= 2) {
                    handlePatientSearch(patientData.name, "name");
                  }
                }}
                className={`w-full px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400 ${
                  errors.name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {errors.name}
                </p>
              )}

              {/* Existing Patient Suggestions Dropdown */}
              {showPatientSuggestions && patientSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border-2 border-purple-300 rounded-xl shadow-2xl max-h-64 overflow-y-auto animate-slide-down">
                  <div className="p-2">
                    <p className="text-xs font-semibold text-purple-600 px-2 py-1 mb-1">
                      Select Existing Patient
                    </p>
                    {patientSuggestions.map((patient) => (
                      <button
                        key={patient.id}
                        type="button"
                        onClick={() => handleSelectExistingPatient(patient)}
                        className="w-full px-3 py-3 text-left hover:bg-purple-50 active:bg-purple-100 rounded-lg transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center text-lg flex-shrink-0">
                            👤
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {patient.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              📱 {patient.mobileNumber}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              ✉️ {patient.email}
                            </p>
                          </div>
                          <svg
                            className="w-5 h-5 text-purple-600 flex-shrink-0"
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
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Show selected patient info banner */}
            {patientData.name && patientData.email && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-3 animate-slide-down">
                <svg
                  className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">
                    Patient information loaded
                  </p>
                  <p className="text-xs text-green-700">
                    {patientData.name} - {patientData.mobileNumber}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={patientData.mobileNumber}
                onChange={(e) => {
                  const cleaned = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  handlePatientChange("mobileNumber", cleaned);
                }}
                onFocus={() => {
                  if (patientData.mobileNumber.length >= 3) {
                    handlePatientSearch(
                      patientData.mobileNumber,
                      "mobileNumber"
                    );
                  }
                }}
                maxLength={10}
                className={`w-full px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400 ${
                  errors.mobileNumber
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* WhatsApp Same as Mobile Checkbox */}
            <div className="flex items-start space-x-3 py-2 px-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="whatsapp-same"
                checked={patientData.whatsappSameAsMobile}
                onChange={(e) =>
                  handlePatientChange("whatsappSameAsMobile", e.target.checked)
                }
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5 cursor-pointer"
              />
              <label
                htmlFor="whatsapp-same"
                className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
              >
                WhatsApp number same as mobile number
              </label>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter WhatsApp number"
                value={patientData.whatsappNumber}
                onChange={(e) => {
                  const cleaned = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  handlePatientChange("whatsappNumber", cleaned);
                }}
                disabled={patientData.whatsappSameAsMobile}
                maxLength={10}
                className={`w-full px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400 ${
                  patientData.whatsappSameAsMobile
                    ? "bg-gray-100 cursor-not-allowed"
                    : errors.whatsappNumber
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.whatsappNumber && !patientData.whatsappSameAsMobile && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {errors.whatsappNumber}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email ID <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="patient@example.com"
                value={patientData.email}
                onChange={(e) => handlePatientChange("email", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400 ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={patientData.address}
                onChange={(e) => handlePatientChange("address", e.target.value)}
                placeholder="Enter full address"
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400 ${
                  errors.address
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-900 font-semibold"
              >
                Next
              </Button>
            </div>
          </form>
        ) : (
          /* SESSION DETAILS FORM */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Patient Info Display */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 animate-slide-up">
              <p className="text-xs text-gray-600 mb-2">Patient</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {patientData.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    +91 {patientData.mobileNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Assign Practitioner */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <CustomSelect
                label="Assign Practitioner"
                value={sessionData.practitioner}
                onChange={(value) => handleSessionChange("practitioner", value)}
                options={practitioners.map((p) => ({
                  value: p.value,
                  label: p.label,
                }))}
                placeholder="Select practitioner"
                error={errors.practitioner}
                required
              />

              {selectedPractitioner && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg flex items-center gap-3 animate-fade-in">
                  <div className="text-2xl">👨‍⚕️</div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {selectedPractitioner.label}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedPractitioner.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Session Type */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CustomSelect
                label="Session Type"
                value={sessionData.sessionType}
                onChange={(value) => handleSessionChange("sessionType", value)}
                options={sessionTypes}
                placeholder="Select session type"
                error={errors.sessionType}
                required
              />
            </div>

            {/* Session Mode */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Mode <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    sessionData.sessionMode === "in-person"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="sessionMode"
                    value="in-person"
                    checked={sessionData.sessionMode === "in-person"}
                    onChange={(e) =>
                      handleSessionChange("sessionMode", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        sessionData.sessionMode === "in-person"
                          ? "border-purple-600"
                          : "border-gray-300"
                      }`}
                    >
                      {sessionData.sessionMode === "in-person" && (
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 text-sm">
                      In-Person
                    </span>
                  </div>
                </label>

                <label
                  className={`flex-1 relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    sessionData.sessionMode === "online"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="sessionMode"
                    value="online"
                    checked={sessionData.sessionMode === "online"}
                    onChange={(e) =>
                      handleSessionChange("sessionMode", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        sessionData.sessionMode === "online"
                          ? "border-purple-600"
                          : "border-gray-300"
                      }`}
                    >
                      {sessionData.sessionMode === "online" && (
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 text-sm">
                      Online
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Date and Time Slot */}
            <div
              className="grid grid-cols-2 gap-3 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={sessionData.date}
                  onChange={(e) => handleSessionChange("date", e.target.value)}
                  min={today}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.date
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Slot <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowTimeSlotPicker(true)}
                  className={`w-full px-3 py-2 text-left border rounded-lg transition-colors flex items-center justify-between ${
                    sessionData.timeSlot
                      ? "border-gray-300 bg-white text-gray-900"
                      : "border-gray-300 bg-white text-gray-400"
                  } ${errors.timeSlot ? "border-red-500 bg-red-50" : ""}`}
                >
                  <span className="text-sm">
                    {sessionData.timeSlot || "HH : MM"}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6l4 2"
                    />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </button>
                {errors.timeSlot && (
                  <p className="mt-1 text-sm text-red-600">{errors.timeSlot}</p>
                )}
              </div>
            </div>

            {/* Online Session Link */}
            {sessionData.sessionMode === "online" && (
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.5s" }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Online Session Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Add Online Session Link or WhatsApp Number"
                  value={sessionData.onlineLink}
                  onChange={(e) =>
                    handleSessionChange("onlineLink", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400 ${
                    errors.onlineLink
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
                {errors.onlineLink && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.onlineLink}
                  </p>
                )}
              </div>
            )}

            {/* Session Details */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Details (Optional)
              </label>
              <textarea
                value={sessionData.sessionDetails}
                onChange={(e) =>
                  handleSessionChange("sessionDetails", e.target.value)
                }
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
                onClick={() => setStep("patient")}
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
          </form>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Booking Confirmed!"
        message="Your session has been scheduled successfully. Redirecting to dashboard..."
      />

      {/* Time Slot Picker Modal */}
      {showTimeSlotPicker && (
        <TimeSlotPicker
          selectedSlot={sessionData.timeSlot}
          onSelect={(slot) => {
            handleSessionChange("timeSlot", slot);
            setShowTimeSlotPicker(false);
          }}
          onClose={() => setShowTimeSlotPicker(false)}
        />
      )}
    </main>
  );
}
