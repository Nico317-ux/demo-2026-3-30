import type { ReactNode } from 'react';

export function PageWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-[#F1EEEE] md:text-2xl">{title}</h1>
        {description && (
          <p className="mt-1 max-w-3xl text-sm text-[#F1EEEE]/60">{description}</p>
        )}
      </header>
      {children}
    </div>
  );
}
