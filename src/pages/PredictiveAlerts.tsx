import { Sparkles } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AlertBadge } from '../components/shared/AlertBadge';
import { predictiveAlerts } from '../utils/predictiveModel';

export function PredictiveAlerts() {
  return (
    <PageWrapper
      title="Predictive intelligence center"
      description="Simulated alerts for the demo — production would use trained models and live feeds."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {predictiveAlerts.map((a) => (
          <article
            key={a.id}
            className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-600" aria-hidden />
              <AlertBadge severity={a.severity} />
              <span className="text-[10px] text-slate-500">{a.date}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">{a.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{a.description}</p>
            {(a.product || a.entity) && (
              <p className="mt-2 text-xs text-slate-500">
                {a.product && <span className="mr-2">Product: {a.product}</span>}
                {a.entity && <span>Entity: {a.entity}</span>}
              </p>
            )}
            {a.value !== undefined && (
              <p className="mt-1 text-xs font-medium tabular-nums text-slate-800">
                Model value: {a.value}
              </p>
            )}
          </article>
        ))}
      </div>
    </PageWrapper>
  );
}
