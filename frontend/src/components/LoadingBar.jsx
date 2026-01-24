// Loading Progress Bar Component
'use client';
import { useEffect, useState } from 'react';

export default function LoadingBar({ isLoading }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 10;
                });
            }, 200);

            return () => clearInterval(interval);
        } else {
            setProgress(100);
            setTimeout(() => setProgress(0), 500);
        }
    }, [isLoading]);

    if (progress === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[10000] h-1">
            <div
                className="h-full bg-gradient-to-r from-gray-600 via-white to-gray-600 transition-all duration-300 ease-out shadow-lg shadow-white/50"
                style={{ width: `${progress}%` }}
            >
                <div className="h-full w-full shimmer"></div>
            </div>
        </div>
    );
}
