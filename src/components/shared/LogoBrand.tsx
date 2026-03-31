import { cn } from '../../utils/cn';

interface LogoBrandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

/**
 * Pure CSS recreation of the Super A brand logo.
 * "SUPER" in italic + red "A" badge.
 */
export function LogoBrand({ size = 'md', className, showText = true }: LogoBrandProps) {
  const sizes = {
    sm: { superText: 'text-sm', aBox: 'w-7 h-7', aText: 'text-sm', gap: 'gap-1' },
    md: { superText: 'text-lg', aBox: 'w-9 h-9', aText: 'text-base', gap: 'gap-1.5' },
    lg: { superText: 'text-2xl', aBox: 'w-11 h-11', aText: 'text-xl', gap: 'gap-2' },
    xl: { superText: 'text-4xl', aBox: 'w-16 h-16', aText: 'text-3xl', gap: 'gap-3' },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      {showText && (
        <span className={cn(
          "font-display font-extrabold text-white uppercase italic tracking-wide select-none",
          s.superText,
        )}>
          SUPER
        </span>
      )}
      <div className={cn(
        "flex items-center justify-center bg-gradient-to-br from-brand-red to-[#c42820] rounded-lg shadow-lg",
        s.aBox,
      )}>
        <span className={cn(
          "font-display font-extrabold text-white leading-none select-none",
          s.aText,
        )}>
          A
        </span>
      </div>
    </div>
  );
}

/**
 * Hero "SUPER" + Spinning "A" lockup for the login page.
 * "SUPER" is styled text, "A" is a 3D spinning cube.
 */
export function HeroBrandLockup() {
  return (
    <div className="flex items-center justify-center gap-5 animate-fade-in-up">
      {/* SUPER text */}
      <span
        className="text-6xl font-display font-extrabold text-white uppercase italic tracking-wider select-none"
        style={{
          textShadow: '0 2px 20px rgba(255,255,255,0.15), 0 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        SUPER
      </span>

      {/* Spinning A */}
      <div className="relative" style={{ perspective: '800px' }}>
        <div className="animate-spin-y-slow" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="w-24 h-24 bg-gradient-to-br from-brand-red via-[#e63e35] to-[#b52a22] rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(232,55,45,0.35), 0 0 80px rgba(232,55,45,0.15), 0 12px 32px rgba(0,0,0,0.3)',
            }}
          >
            {/* Inner shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
            {/* The letter */}
            <span
              className="text-6xl font-display font-black text-white leading-none select-none relative z-10"
              style={{ textShadow: '0 3px 6px rgba(0,0,0,0.25)' }}
            >
              A
            </span>
          </div>
        </div>
        {/* Ambient glow underneath */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-brand-red/25 rounded-full blur-xl" />
      </div>
    </div>
  );
}
