"use client"
import { cn } from "@/lib/utils";
import { languageIcons } from "@/settings/LanguageIcon";
import { Check, Clipboard, FileCode } from "lucide-react";
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import { ComponentProps, useEffect, useState } from "react";

interface PreProps extends ComponentProps<"pre"> {
  raw?: string;
  className?: string;
  highlightLines?: number[];
  folderPath?: string;
}

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-600/50"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-[18px] h-[18px] text-green-500" />
      ) : (
        <Clipboard className="w-[18px] h-[18px] text-gray-100" />
      )}
    </button>
  );
};

export default function Pre({
  children,
  raw,
  className,
  highlightLines = [],
  folderPath,
  ...rest
}: PreProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      Prism.highlightAll();
      const codeBlock = document.querySelector('pre code');
      if (codeBlock) {
        const lines = codeBlock.innerHTML.replace(/^\n+|\n+$/g, '').replace(/\n\s*\n/g, '\n').replace(/\t/g, '  ').replace(/\r\n/g, '\n').split('\n');
        const highlightedLines = lines.map((line, index) => {
          if (highlightLines.includes(index + 1)) {
            return `<span class="highlighted-line">${line}</span>`;
          }
          return line;
        });
        codeBlock.innerHTML = highlightedLines.join('\n');
      }
    }
  }, [children, isClient, highlightLines]);
  const language = className?.split('-')[1] || 'typescript';
  const code = typeof children === "string" ? children.trim() : " ";
  if (!isClient) {
    return (
      <div className="relative group bg-[#1E1E1E] rounded-[6px] custom-scrollbar my-5 w-full">
        <pre className="overflow-x-auto max-h-[650px] hide-scrollbar">
          <code>{children}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="relative group bg-[#1E1E1E] rounded-[6px]  my-5 w-full">
      <div className="absolute top-0 right-3">
        <div className="flex items-center space-x-2">
          <div>
            <CopyButton content={raw || code} />
          </div>
          <div>
            {languageIcons[language] || <FileCode className="w-4 h-4 text-gray-400" />}
          </div>
        </div>
      </div>
      <div className="rounded-[6px_6px_0_0] overflow-hidden bg-[#1E1E1E] ">
        <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D]">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/40" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/40" />
            <span className="text-muted font-light ">{folderPath}</span>
          </div>
        </div>
      </div>
      <pre className={`${className} overflow-x-auto max-h-[650px] line-numbers border-none custom-scrollbar`}>
        <code className={cn("language-" + language)}>{children}</code>
      </pre>
    </div>
  );
}