import React from 'react';

const CongratsModal = ({ onClose, onStay }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-lg text-center shadow-xl transform transition-all animate-fade-in max-w-md w-full mx-4">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Congratulations!</h2>
      <p className="text-gray-600 mb-6">You have successfully submitted your test.</p>
      <div className="space-y-3">
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Return to Home
        </button>
        <button
          onClick={onStay}
          className="w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Stay on Page
        </button>
      </div>
    </div>
  </div>
);

export default CongratsModal;