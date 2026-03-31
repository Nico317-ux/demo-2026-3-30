import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';

interface AICardProps {
  title?: string;
  content: string | React.ReactNode;
  variant?: 'info' | 'warning' | 'success';
  dismissible?: boolean;
  className?: string;
}

export function AICard({
  title = "Sugerencia IA",
  content,
  variant = 'info',
  dismissible = true,
  className
}: AICardProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const styles = {
    info: 'border-accent-violet/20 bg-accent-violet/5',
    warning: 'border-accent-amber/20 bg-accent-amber/5',
    success: 'border-accent-emerald/20 bg-accent-emerald/5',
  };

  const iconStyles = {
    info: 'text-accent-violet bg-accent-violet/10',
    warning: 'text-accent-amber bg-accent-amber/10',
    success: 'text-accent-emerald bg-accent-emerald/10',
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 animate-fade-in-up card-lift",
      styles[variant],
      className
    )}>
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5 rounded-xl p-2", iconStyles[variant])}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm text-text-primary flex items-center gap-2">
              {title}
              <span className="px-1.5 py-0.5 rounded-md text-[9px] uppercase tracking-wider bg-accent-violet/10 text-accent-violet font-bold ia-glow">IA</span>
            </h4>
            {dismissible && (
              <button onClick={() => setVisible(false)} className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-surface-1">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-sm leading-relaxed text-text-secondary">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
