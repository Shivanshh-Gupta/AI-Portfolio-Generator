// Scroll to Top Button Component
'use client';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full shadow-elegant-xl hover:shadow-2xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 hover:scale-110 animate-fadeInUp ripple group"
            aria-label="Scroll to top"
        >
            <span className="text-xl group-hover:animate-bounce inline-block">↑</span>
        </button>
    );
}
