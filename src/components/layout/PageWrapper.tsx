import type { ReactNode } from "react";

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
        <h1 className="text-xl font-semibold tracking-tight text-[#0A204E] md:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-3xl text-sm text-[#0A204E]/55">
            {description}
          </p>
        )}
      </header>
      {children}
    </div>
  );
}
