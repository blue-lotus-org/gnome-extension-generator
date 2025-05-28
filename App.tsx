
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { CodeDisplay } from './components/CodeDisplay';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { generateGnomeExtensionCode } from './services/geminiService';
import type { GnomeExtensionCode } from './types';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<GnomeExtensionCode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a description for your GNOME extension.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedCode(null);

    try {
      const result = await generateGnomeExtensionCode(userInput);
      setGeneratedCode(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="w-full max-w-4xl mt-8 space-y-8">
        <PromptInput
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onSubmit={handleGenerateCode}
          isLoading={isLoading}
        />

        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {generatedCode && !isLoading && (
          <div className="space-y-6">
            <CodeDisplay
              title="extension.js"
              code={generatedCode.extension_js}
              language="javascript"
            />
            <CodeDisplay
              title="metadata.json"
              code={generatedCode.metadata_json}
              language="json"
            />
          </div>
        )}
      </main>
      <footer className="w-full max-w-4xl mt-12 text-left text-gray-400 text-sm space-y-6">
        <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">How to Install Your Extension:</h3>
            <ol className="list-decimal list-inside space-y-1 pl-2">
                <li>
                    Identify the <code className="bg-gray-700 px-1 rounded text-pink-400">uuid</code> from your generated <code className="bg-gray-700 px-1 rounded text-pink-400">metadata.json</code> file.
                </li>
                <li>
                    Create a directory for your extension: <br />
                    <code className="bg-gray-700 p-1 rounded text-pink-400 block my-1 overflow-x-auto">mkdir -p ~/.local/share/gnome-shell/extensions/YOUR-EXTENSION-UUID</code><br />
                    Replace <code className="bg-gray-700 px-1 rounded text-pink-400">YOUR-EXTENSION-UUID</code> with the actual UUID (e.g., <code className="bg-gray-700 px-1 rounded text-pink-400">my-extension@example.com</code>).
                </li>
                <li>
                    Save the generated <code className="bg-gray-700 px-1 rounded text-pink-400">extension.js</code> and <code className="bg-gray-700 px-1 rounded text-pink-400">metadata.json</code> files into this directory.
                </li>
                <li>
                    Restart GNOME Shell: Press <kbd className="bg-gray-700 px-1.5 py-0.5 rounded border border-gray-600 text-gray-300">Alt</kbd> + <kbd className="bg-gray-700 px-1.5 py-0.5 rounded border border-gray-600 text-gray-300">F2</kbd>, type <code className="bg-gray-700 px-1 rounded text-pink-400">r</code>, and press <kbd className="bg-gray-700 px-1.5 py-0.5 rounded border border-gray-600 text-gray-300">Enter</kbd>. (Alternatively, log out and log back in).
                </li>
                <li>
                    Enable your extension using the "Extensions" application or via the command line: <br />
                    <code className="bg-gray-700 p-1 rounded text-pink-400 block my-1 overflow-x-auto">gnome-extensions enable YOUR-EXTENSION-UUID</code>
                </li>
            </ol>
             <p className="mt-2 text-xs text-gray-500">
                Note: The directory name under <code className="bg-gray-700 px-1 rounded text-xs">~/.local/share/gnome-shell/extensions/</code> must exactly match the <code className="bg-gray-700 px-1 rounded text-xs">uuid</code> in your <code className="bg-gray-700 px-1 rounded text-xs">metadata.json</code>.
            </p>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center">
            <p>Generated code is a starting point. Always review and test thoroughly.</p>
            <p>Powered by Gemini API & GJS Guidelines.</p>
            <p>Presents by <a href="https://lotuschain.org">Blue Lotus "LotusChain"</a></p>
        </div>
      </footer>
    </div>
  );
};

export default App;
