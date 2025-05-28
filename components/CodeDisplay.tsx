
import React, { useState, useCallback } from 'react';

interface CodeDisplayProps {
  title: string;
  code: string;
  language: 'javascript' | 'json';
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ title, code, language }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text. Please try again or copy manually.');
    }
  }, [code]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex justify-between items-center px-5 py-3 bg-gray-750 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
          }`}
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="p-5 text-sm overflow-x-auto bg-gray-850">
        <code className={`language-${language} whitespace-pre-wrap break-all`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

// Small style addition for pseudo syntax highlighting (very basic)
// For real syntax highlighting, a library like prism.js or highlight.js would be needed.
// Tailwind doesn't directly support complex syntax highlighting.
// This is a placeholder to make it look like a code block.
// Added custom scrollbar styles in index.html for better aesthetics in code blocks.
