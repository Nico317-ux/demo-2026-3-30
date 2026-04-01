import { cn } from '../../utils/cn';

interface LogoBrandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

/**
 * Pure CSS "SUPER A" logo.
 */
export function LogoBrand({ size = 'md', className, showText = true }: LogoBrandProps) {
  const sizes = {
    sm: { text: 'text-xl', sub: 'text-[8px]', circle: 'w-8 h-8', gap: 'gap-2' },
    md: { text: 'text-2xl', sub: 'text-[10px]', circle: 'w-10 h-10', gap: 'gap-3' },
    lg: { text: 'text-4xl', sub: 'text-xs', circle: 'w-16 h-16', gap: 'gap-4' },
    xl: { text: 'text-6xl', sub: 'text-sm', circle: 'w-24 h-24', gap: 'gap-6' },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <div className={cn("rounded-xl bg-gradient-to-br from-secondary to-secondary-dim flex items-center justify-center shadow-[0_0_20px_rgba(255,113,101,0.4)] border border-white/20", s.circle)}>
        <GeometricA className="w-[60%] h-[60%] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-headline font-black tracking-tighter text-secondary brightness-125 text-glow-red leading-none",
            s.text,
          )}>
            SUPER A
          </h1>
          <p className={cn("uppercase tracking-[0.3em] text-slate-500 font-bold mt-1", s.sub)}>
            Intelligence Platform
          </p>
        </div>
      )}
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

export function HeroBrandLockup() {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <LogoBrand size="xl" />
    </div>
  );
}
