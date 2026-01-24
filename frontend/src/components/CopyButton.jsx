// Copy to Clipboard Hook with Toast
'use client';
import { useState } from 'react';

export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    };

    return { copied, copyToClipboard };
}

// Copy Button Component
export function CopyButton({ text, className = '' }) {
    const { copied, copyToClipboard } = useCopyToClipboard();

    return (
        <button
            onClick={() => copyToClipboard(text)}
            className={`relative px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold hover:from-gray-600 hover:to-gray-800 transition-all duration-300 hover:scale-105 shadow-elegant ripple ${className}`}
        >
            <span className="flex items-center gap-2">
                {copied ? (
                    <>
                        <span className="animate-bounce">✓</span>
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <span>📋</span>
                        <span>Copy</span>
                    </>
                )}
            </span>
        </button>
    );
}
