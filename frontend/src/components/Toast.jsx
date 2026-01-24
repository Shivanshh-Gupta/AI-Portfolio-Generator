// Toast Notification Component
'use client';
import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    const colors = {
        success: 'from-gray-700 to-gray-900 border-gray-500',
        error: 'from-gray-800 to-black border-gray-600',
        warning: 'from-gray-600 to-gray-800 border-gray-500',
        info: 'from-gray-700 to-gray-900 border-gray-500'
    };

    return (
        <div
            className={`fixed top-20 right-6 z-[9999] max-w-md animate-fadeInRight ${isExiting ? 'animate-fadeOutRight' : ''
                }`}
        >
            <div
                className={`bg-gradient-to-r ${colors[type]} border-2 rounded-xl shadow-elegant-xl p-4 backdrop-blur-xl`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl animate-bounce">{icons[type]}</span>
                    <p className="text-white font-medium flex-1">{message}</p>
                    <button
                        onClick={() => {
                            setIsExiting(true);
                            setTimeout(() => {
                                setIsVisible(false);
                                onClose?.();
                            }, 300);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}

// Toast Container Hook
export function useToast() {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const ToastContainer = () => (
        <>
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </>
    );

    return { showToast, ToastContainer };
}
