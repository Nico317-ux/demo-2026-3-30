import { cn } from '../../utils/cn';

interface LogoBrandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

/**
 * Pure CSS recreation of the Super A brand logo.
 * Navy banner with "SUPER" in white italic + red stylized "A" with white triangle.
 */
export function LogoBrand({ size = 'md', className, showText = true }: LogoBrandProps) {
  const sizes = {
    sm: { h: 'h-8', textSize: 'text-[10px]', aSize: 'text-lg', aW: 'w-7 h-7' },
    md: { h: 'h-10', textSize: 'text-xs', aSize: 'text-xl', aW: 'w-9 h-9' },
    lg: { h: 'h-14', textSize: 'text-sm', aSize: 'text-3xl', aW: 'w-12 h-12' },
    xl: { h: 'h-20', textSize: 'text-lg', aSize: 'text-5xl', aW: 'w-18 h-18' },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-0", className)}>
      {/* Navy banner with SUPER text */}
      {showText && (
        <div className={cn(
          "flex items-center bg-brand-charcoal px-3 rounded-l-lg relative overflow-hidden",
          s.h,
        )} style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}>
          <span className={cn(
            "font-display font-bold text-white tracking-[0.15em] uppercase italic pr-2",
            s.textSize,
          )}>
            SUPER
          </span>
        </div>
      )}
      {/* Red A */}
      <SuperA className={s.aW} textClass={s.aSize} />
    </div>
  );
}

/**
 * The iconic red "A" with white triangle cutout.
 */
export function SuperA({ className, textClass, spin = false }: { className?: string; textClass?: string; spin?: boolean }) {
  return (
    <div className={cn(
      "relative flex items-center justify-center bg-brand-red rounded-lg shadow-lg",
      spin && "animate-spin-y",
      className,
    )}>
      {/* The A letter */}
      <span className={cn(
        "font-display font-extrabold text-white leading-none select-none",
        textClass || "text-xl",
      )} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        A
      </span>
      {/* White triangle cutout overlay (the hole in the A) */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 border-l-[5px] border-r-[5px] border-b-[7px] border-l-transparent border-r-transparent border-b-white/90" />
    </div>
  );
}

/**
 * Hero spinning A for login page — a large red A that rotates on its Y axis.
 */
export function SpinningHeroA() {
  return (
    <div className="perspective-[800px] inline-flex">
      <div className="w-28 h-28 relative animate-spin-y-slow">
        <div className="w-full h-full bg-gradient-to-br from-brand-red to-[#c42820] rounded-2xl flex items-center justify-center shadow-2xl"
          style={{ 
            boxShadow: '0 0 60px rgba(232,55,45,0.3), 0 0 120px rgba(232,55,45,0.15), 0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-7xl font-display font-extrabold text-white select-none drop-shadow-lg" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            A
          </span>
        </div>
        {/* Reflection glow */}
        <div className="absolute -inset-4 bg-brand-red/10 rounded-3xl blur-2xl -z-10" />
      </div>
    </div>
  );
}
