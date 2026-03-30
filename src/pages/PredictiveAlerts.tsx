import { Sparkles } from "lucide-react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { AlertBadge } from "../components/shared/AlertBadge";
import { predictiveAlerts } from "../utils/predictiveModel";

export function PredictiveAlerts() {
  return (
    <PageWrapper
      title="Centro de inteligencia predictiva"
      description="Alertas simuladas para la demo — en producción usaría modelos entrenados y feeds en vivo."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {predictiveAlerts.map((a) => (
          <article
            key={a.id}
            className="rounded-xl border border-[#0A204E]/10 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-600" aria-hidden />
              <AlertBadge severity={a.severity} />
              <span className="text-[10px] text-[#0A204E]/50">{a.date}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-[#0A204E]">
              {a.title}
            </h3>
            <p className="mt-1 text-sm text-[#0A204E]/60">{a.description}</p>
            {(a.product || a.entity) && (
              <p className="mt-2 text-xs text-[#0A204E]/50">
                {a.product && (
                  <span className="mr-2">Producto: {a.product}</span>
                )}
                {a.entity && <span>Entidad: {a.entity}</span>}
              </p>
            )}
            {a.value !== undefined && (
              <p className="mt-1 text-xs font-medium tabular-nums text-[#0A204E]">
                Valor del modelo: {a.value}
              </p>
            )}
          </article>
        ))}
      </div>
    </PageWrapper>
  );
}
