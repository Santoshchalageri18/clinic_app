"use client";

import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Success!",
  message = "Session scheduled successfully!",
}: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 2 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">{message}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 h-full animate-progress" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-3 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-900 font-semibold rounded-xl transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
