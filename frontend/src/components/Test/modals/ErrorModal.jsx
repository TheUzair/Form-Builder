import React from 'react';

const ErrorModal = ({ errors, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-lg text-center shadow-xl transform transition-all animate-fade-in max-w-md w-full mx-4">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Incomplete Test</h2>
      <div className="text-left mb-6">
        <p className="text-gray-600 mb-2">Please complete the following sections:</p>
        <ul className="list-disc pl-5">
          {errors.categories && (
            <li className="text-red-600">Categorization Questions</li>
          )}
          {errors.cloze && (
            <li className="text-red-600">Fill in the Blanks</li>
          )}
          {errors.comprehension && (
            <li className="text-red-600">Reading Comprehension</li>
          )}
        </ul>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Continue Test
      </button>
    </div>
  </div>
);

export default ErrorModal;