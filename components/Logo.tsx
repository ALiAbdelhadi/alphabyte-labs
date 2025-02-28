import { cn } from '@/lib/utils';
import Link from 'next/link';

const Logo = ({ className, showLogoText }: { className?: string, showLogoText: boolean }) => {
   return (
      <Link href="/" className="group relative flex items-center">
         {/* Simple Container */}
         <div className="relative flex items-center space-x-0 md:space-x-3 py-2">
            {/* Text */}
            {
               showLogoText && (
                  <span className={cn(
                     "font-bold lg:text-xl text-lg tracking-tight",
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