
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        GNOME Extension AI Builder
      </h1>
      <p className="mt-3 text-lg text-gray-400">
        Describe your desired GNOME Shell Extension, and let AI help you craft the initial code.
      </p>
    </header>
  );
};
