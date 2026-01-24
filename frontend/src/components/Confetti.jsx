// Confetti Animation Component
'use client';
import { useEffect, useState } from 'react';

export default function Confetti({ trigger, duration = 3000 }) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (trigger) {
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                animationDelay: Math.random() * 0.5,
                size: Math.random() * 10 + 5,
                color: ['#ffffff', '#9ca3af', '#6b7280', '#4b5563'][Math.floor(Math.random() * 4)]
            }));

            setParticles(newParticles);

            const timer = setTimeout(() => {
                setParticles([]);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute top-0 animate-confetti-fall"
                    style={{
                        left: `${particle.left}%`,
                        animationDelay: `${particle.animationDelay}s`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        borderRadius: '50%'
                    }}
                />
            ))}
        </div>
    );
}
