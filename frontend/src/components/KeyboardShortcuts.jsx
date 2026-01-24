// Keyboard Shortcuts Hook
'use client';
import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts) {
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();
            const ctrl = event.ctrlKey || event.metaKey;
            const shift = event.shiftKey;
            const alt = event.altKey;

            shortcuts.forEach(shortcut => {
                const matches =
                    shortcut.key.toLowerCase() === key &&
                    (shortcut.ctrl === undefined || shortcut.ctrl === ctrl) &&
                    (shortcut.shift === undefined || shortcut.shift === shift) &&
                    (shortcut.alt === undefined || shortcut.alt === alt);

                if (matches) {
                    event.preventDefault();
                    shortcut.action();
                }
            });
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [shortcuts]);
}

// Keyboard Shortcuts Help Modal
export function KeyboardShortcutsHelp({ isOpen, onClose }) {
    if (!isOpen) return null;

    const shortcuts = [
        { keys: ['Ctrl', 'K'], description: 'Open command palette' },
        { keys: ['Ctrl', 'S'], description: 'Save portfolio' },
        { keys: ['Ctrl', 'D'], description: 'Download portfolio' },
        { keys: ['Ctrl', 'U'], description: 'Upload resume' },
        { keys: ['Esc'], description: 'Close modal' },
        { keys: ['?'], description: 'Show keyboard shortcuts' },
    ];

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="glass rounded-2xl p-8 max-w-2xl w-full shadow-elegant-xl animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white gradient-text">
                        ⌨️ Keyboard Shortcuts
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3">
                    {shortcuts.map((shortcut, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 animate-fadeInUp"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <span className="text-gray-300">{shortcut.description}</span>
                            <div className="flex gap-2">
                                {shortcut.keys.map((key, i) => (
                                    <kbd
                                        key={i}
                                        className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg text-sm font-mono shadow-elegant border border-gray-600"
                                    >
                                        {key}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    Press <kbd className="px-2 py-1 bg-gray-700 rounded">?</kbd> anytime to see this help
                </div>
            </div>
        </div>
    );
}
