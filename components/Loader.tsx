
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
      <p className="ml-4 text-xl text-gray-400">Generating code, please wait...</p>
    </div>
  );
};
