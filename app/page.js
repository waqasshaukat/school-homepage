"use client";

import { useState } from "react";
import ApplyModal from "../components/ApplyModal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 -z-10" />

      {/* Header */}
      <header className="w-full flex justify-between items-center p-6 bg-white shadow-md fixed top-0">
        <h1 className="text-2xl font-bold text-blue-700">My School</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center mt-24">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our School
        </h2>
        <p className="text-lg text-gray-600 max-w-xl">
          A place where learning meets creativity. Join us to shape a brighter
          future!
        </p>
      </main>

      {/* Apply Modal */}
      {isOpen && <ApplyModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
