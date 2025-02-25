import { cn } from '@/lib/utils';
import Link from 'next/link';

const Logo = ({ className, showIcon, showLogoText }: { className?: string, showIcon: boolean, showLogoText: boolean }) => {
   return (
      <Link href="/" className="group relative flex items-center">
         {/* Simple Container */}
         <div className="relative flex items-center space-x-0 md:space-x-3 py-2">
            {/* Icon */}
            {
               showIcon && (
                  <div className="relative hidden xl:block">
                     <div className={cn(
                        "w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-[#02F4EE]",
                        "flex items-center justify-center",
                        "transition-transform duration-300",
                        "group-hover:scale-105"
                     )}>
                        <span className="text-white font-bold text-xl">A</span>
                     </div>
                     {/* Subtle Glow */}
                     <div className="absolute inset-0 bg-primary rounded-lg blur opacity-0 group-hover:opacity-20 transition-all duration-300" />
                  </div>
               )
            }
            {/* Text */}
            {
               showLogoText && (
                  <span className={cn(
                     "font-bold text-xl tracking-tight",
                     "text-primary",
                     "transition-colors duration-300",
                     "group-hover:text-primary/80",
                     className
                  )}>
                     Alphabyte-labs
                  </span>
               )
            }
         </div>
      </Link>
   );
};

export default Logo;