import { cn } from '@/lib/utils';
import React from 'react';

const LoadingIcon = ({ size = 20, color = 'currentColor', className }: {
    size?: number;
    color?: string;
    className?: string;
}) => {
    const angleStep = 30;
    return (
        <span
            className={cn("inline-flex justify-center relative items-center flex-shrink-0 -mt-[2px]", className)}
            style={{ width: `${size}px`, height: `${size}px`}} 
        >
            <span className="absolute inset-0">
                <span className="relative w-full h-full flex items-center justify-center"> 
                    {[...Array(12)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute rounded-full animate-pulse"
                            style={{
                                width: `${size * 0.12}px`,
                                height: `${size * 0.3}px`,
                                backgroundColor: color,
                                opacity: 0.2, 
                                top: "50%", 
                                left: "50%",
                                margin: `-${size * 0.15}px 0 0 -${size * 0.06}px`, 
                                transformOrigin: "center bottom", 
                                transform: `rotate(${i * angleStep}deg) translateY(-${size * 0.35}px)`,
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: '1.2s',
                            }}
                        />
                    ))}
                </span>
            </span>
        </span>
    );
};

export default LoadingIcon;

// تأكد من وجود تعريف لـ animation الـ pulse في ملف CSS العام لديك، مثل:
/*
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
   animation: pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

// أو يمكنك استخدام animation مخصص للـ spinner
@keyframes loading-spinner-opacity {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
*/