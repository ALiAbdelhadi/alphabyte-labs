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
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

import { ComponentProps, useEffect, useState } from "react";

interface PreProps extends ComponentProps<"pre"> {
  raw?: string;
  className?: string;
  highlightLines?: number[];
  folderPath?: string;
  highlightStyle?: 'solid' | 'gradient' | 'border' | 'marker' | 'custom';
  customHighlightClass?: string;
  showLineNumbers?: boolean;
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
  highlightStyle,
  customHighlightClass,
  showLineNumbers = true,
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
        const lines = codeBlock.innerHTML
          .replace(/^\n+|\n+$/g, '')
          .replace(/\n\s*\n/g, '\n')
          .replace(/\t/g, '  ')
          .replace(/\r\n/g, '\n')
          .split('\n');
        const highlightedLines = lines.map((line, index) => {
          if (highlightLines.includes(index + 1)) {
            return `<span class="highlighted-line">${line}</span>`;
          }
          return line;
        });
        codeBlock.innerHTML = highlightedLines.join('\n');
      }
    }
  }, [children, highlightLines, highlightStyle, customHighlightClass, isClient]);

  const language = className?.split('-')[1] || 'typescript';
  const code = typeof children === "string" ? children.trim() : " ";
  const lineNumbersClass = showLineNumbers ? 'line-numbers' : '';

  if (!isClient) {
    return (
      <div className="code-block-container relative group rounded-[6px] custom-scrollbar my-5 w-full">
        <pre className={`overflow-x-auto max-h-[650px] hide-scrollbar ${lineNumbersClass}`}>
          <code>{children}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="code-block-container relative group rounded-[6px] w-full">
      <div className="code-block-header code-block-toolbar overflow-x-auto hide-scrollbar flex items-center justify-between">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/40" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/40" />
          </div>
          <span className="code-block-folder-path font-medium text-gray-400 text-sm text-nowrap">{folderPath}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <CopyButton content={raw || code} />
          </div>
          <div className="w-4 h-4">
            {languageIcons[language] || <FileCode className="w-4 h-4 text-gray-400" />}
          </div>
        </div>
      </div>
      <pre className={cn(
        `language-${language}`,
        className,
        "overflow-x-auto",
        "max-h-[650px]",
        "border-none",
        "custom-scrollbar",
        lineNumbersClass
      )}
        data-line={highlightLines.length > 0 ? highlightLines.join(",") : undefined}
      >
        <code className={cn("language-" + language)}>{children}</code>
      </pre>
    </div>
  );
}