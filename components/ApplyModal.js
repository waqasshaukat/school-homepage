"use client";

import { useState } from "react";

export default function ApplyModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("🎉 Application submitted successfully!");
        onClose();
      } else {
        alert("⚠️ Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  {/* Modal Box */}
  <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        
        {/* Close Button (Top-Right now) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black text-2xl font-bold hover:text-red-600"
        >
          ✕
        </button>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Admission Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block font-bold text-black mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white text-black border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-bold text-black mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white text-black border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"              placeholder="Enter your email"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block font-bold text-black mb-1">
              Applying for Grade
            </label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="w-full bg-white text-black border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"              placeholder="e.g. Grade 5"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-[1.02]"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
