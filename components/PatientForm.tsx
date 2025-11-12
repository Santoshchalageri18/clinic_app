"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import Input from "./ui/Input";
import { patientSchema } from "@/lib/validations";
import { debounce } from "@/lib/utils";

interface PatientFormData {
  name: string;
  mobileNumber: string;
  whatsappSameAsMobile: boolean;
  whatsappNumber: string;
  email: string;
  address: string;
}

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  onPatientSearch?: (query: string) => void;
  existingPatients?: any[];
}

export default function PatientForm({
  onSubmit,
  onPatientSearch,
  existingPatients = [],
}: PatientFormProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      whatsappSameAsMobile: false,
    },
  });

  const whatsappSameAsMobile = watch("whatsappSameAsMobile");
  const mobileNumber = watch("mobileNumber");
  const nameValue = watch("name");

  useEffect(() => {
    if (whatsappSameAsMobile && mobileNumber) {
      setValue("whatsappNumber", mobileNumber);
    }
  }, [whatsappSameAsMobile, mobileNumber, setValue]);

  useEffect(() => {
    const debouncedSearch = debounce((query: string) => {
      if (query.length >= 2 && onPatientSearch) {
        onPatientSearch(query);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    if (nameValue) {
      debouncedSearch(nameValue);
    }
  }, [nameValue, onPatientSearch]);

  const selectPatient = (patient: any) => {
    setValue("name", patient.name);
    setValue("mobileNumber", patient.mobileNumber);
    setValue("whatsappNumber", patient.whatsappNumber);
    setValue("email", patient.email);
    setValue("address", patient.address);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <Input
          label="Patient Name"
          placeholder="Enter patient name"
          {...register("name")}
          error={errors.name?.message}
          required
          autoComplete="off"
        />
        {showSuggestions && existingPatients.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {existingPatients.map((patient, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectPatient(patient)}
                className="w-full px-4 py-2 text-left hover:bg-primary-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <p className="font-medium text-gray-900">{patient.name}</p>
                <p className="text-sm text-gray-600">{patient.mobileNumber}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <Input
        label="Mobile Number"
        type="tel"
        placeholder="Enter 10-digit mobile number"
        {...register("mobileNumber")}
        error={errors.mobileNumber?.message}
        required
        maxLength={10}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="whatsapp-same"
          {...register("whatsappSameAsMobile")}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label
          htmlFor="whatsapp-same"
          className="text-sm font-medium text-gray-700"
        >
          WhatsApp number same as mobile
        </label>
      </div>

      <Input
        label="WhatsApp Number"
        type="tel"
        placeholder="Enter WhatsApp number"
        {...register("whatsappNumber")}
        error={errors.whatsappNumber?.message}
        required
        disabled={whatsappSameAsMobile}
        maxLength={10}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="patient@example.com"
        {...register("email")}
        error={errors.email?.message}
        required
      />

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          {...register("address")}
          placeholder="Enter full address"
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-400 ${
            errors.address
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 animate-fade-in">
            {errors.address.message}
          </p>
        )}
      </div>
    </form>
  );
}
