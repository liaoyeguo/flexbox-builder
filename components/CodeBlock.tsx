import React, { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const CodeBlock = ({
  code,
  filename,
  language = "javascript",
}: {
  code: string;
  filename?: string;
  language?: "javascript" | "css";
}) => {
  // Returns a highlighted HTML string
  const html = useMemo(
    () =>
      Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        "javascript"
      ),
    [code, language]
  );

  return (
    <div className="bg-slate-800 rounded-xl mb-4 last:mb-0 relative">
      {filename && (
        <div className="py-2 px-4 text-gray-400 italic text-sm border-b border-slate-600 font-mono">
          {filename}
        </div>
      )}
      <button
        className="absolute right-2 top-[6px] bg-slate-600 hover:bg-slate-500 p-1 
      rounded text-xs text-white"
        onClick={() => {
          navigator.clipboard.writeText(code);
        }}
      >
        Copy
      </button>
      <pre className="p-4 overflow-auto">
        <code
          dangerouslySetInnerHTML={{ __html: html }}
          className={`language-${language}`}
        ></code>
      </pre>
    </div>
  );
};

export default CodeBlock;
