
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <label htmlFor="prompt" className="block text-xl font-semibold mb-3 text-gray-300">
        Describe your GNOME Extension
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={onChange}
        placeholder="e.g., 'A simple extension that displays the current time in the top panel, refresh every second, and shows 'Hello World' on click'"
        className="w-full h-40 p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="mt-4 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Extension Code'
        )}
      </button>
    </div>
  );
};
