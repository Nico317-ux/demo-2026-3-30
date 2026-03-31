import { cn } from '../../utils/cn';

interface LogoBrandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

/**
 * Pure CSS "SUPER A" logo.
 * "SUPER" in bold italic text + navy circle with geometric red A.
 */
export function LogoBrand({ size = 'md', className, showText = true }: LogoBrandProps) {
  const sizes = {
    sm: { text: 'text-[11px]', circle: 'w-7 h-7', gap: 'gap-1.5' },
    md: { text: 'text-sm', circle: 'w-9 h-9', gap: 'gap-2' },
    lg: { text: 'text-xl', circle: 'w-12 h-12', gap: 'gap-2.5' },
    xl: { text: 'text-3xl', circle: 'w-16 h-16', gap: 'gap-3' },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      {showText && (
        <span className={cn(
          "font-display font-extrabold text-white uppercase italic tracking-wider select-none",
          s.text,
        )}>
          SUPER
        </span>
      )}
      <div className={cn("rounded-full bg-brand-navy flex items-center justify-center shadow-md", s.circle)}>
        <GeometricA className="w-[60%] h-[60%] text-brand-red" />
      </div>
    </div>
  );
}

function GeometricA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M 37 18 L 63 18 L 88 85 L 63 85 L 56 66 L 44 66 L 37 85 L 12 85 Z M 50 46 L 45.5 58 L 54.5 58 Z"
      />
    </svg>
  );
}

/**
 * Hero lockup for login: SUPER text + large spinning A circle.
 */
export function HeroBrandLockup() {
  return (
    <div className="flex items-center justify-center gap-6 animate-fade-in-up">
      {/* SUPER text */}
      <span
        className="text-6xl font-display font-extrabold text-white uppercase italic tracking-wider select-none"
        style={{
          textShadow: '0 2px 20px rgba(255,255,255,0.15), 0 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        SUPER
      </span>

      {/* Spinning A in navy circle */}
      <div className="relative" style={{ perspective: '800px' }}>
        <div className="animate-spin-y-slow" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="w-28 h-28 rounded-full bg-brand-navy flex items-center justify-center shadow-2xl relative overflow-hidden ring-1 ring-white/10"
            style={{
              boxShadow: '0 0 50px rgba(15,52,96,0.5), 0 0 100px rgba(232,55,45,0.2), 0 16px 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* Inner shine */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            {/* Geometric A */}
            <GeometricA className="w-[60%] h-[60%] text-brand-red relative z-10" />
          </div>
        </div>
        {/* Ambient glow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-brand-red/20 rounded-full blur-2xl" />
      </div>
    </div>
  );
}
