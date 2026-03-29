import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { navCrossModules, navExtra, navCoreModules } from '../utils/navConfig';

function Card({
  to,
  title,
  subtitle,
}: {
  to: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-md"
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-slate-600">{subtitle}</p>}
      </div>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sky-600">
        Open
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function Home() {
  return (
    <PageWrapper
      title="Home"
      description="Operational and executive dashboard demo with mock USD B2B data. Use the sidebar or quick links."
    >
      <section className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-sky-900">Predictive intelligence center</h2>
            <p className="mt-1 max-w-2xl text-sm text-sky-800/90">
              Simulated alerts for stockouts, sales anomalies, backorder risk, and at-risk customers.
            </p>
          </div>
          <Link
            to="/predictive"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            View alerts
          </Link>
        </div>
      </section>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Core modules (01–05)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {navCoreModules.map((n) => (
            <Card key={n.to} to={n.to} title={n.label} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Cross analysis (06–12)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {navCrossModules.map((n) => (
            <Card key={n.to} to={n.to} title={n.label} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">More</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {navExtra.map((n) => (
            <Card key={n.to} to={n.to} title={n.label} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
