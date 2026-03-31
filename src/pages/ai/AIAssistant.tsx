import { useState } from 'react';
import { Send, User, Sparkles, Loader2, BarChart2, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Message {
  id: number;
  type: 'user' | 'ia';
  content: string;
  isWidget?: boolean;
}

const SUGGESTIONS = [
  '¿Cuáles fueron las ventas este mes?',
  '¿Quiénes son mis top clientes?',
  '¿Cómo va el stock crítico?',
];

export function AIAssistant() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ia',
      content: '¡Hola! 👋 Soy el asistente de inteligencia de **Super A**. Puedo analizar tus ventas, clientes e inventario en tiempo real. ¿Qué deseas consultar?',
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
  };

  const sendMessage = (query: string) => {
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: query }]);
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let response = 'No tengo una respuesta específica para esa consulta en mi base demo. Prueba preguntando sobre **ventas**, **clientes** o **inventario**.';
      let isWidget = false;

      if (lower.includes('venta') || lower.includes('ingreso')) {
        response = '📊 Las ventas totales de Marzo 2026 ascienden a **$13,222.43 USD**, con un crecimiento del **+12.4%** respecto al mes anterior. El vendedor estrella es **Keller Ortega** con $5,197.10 en ventas, representando el 39.3% del total. La marca **SUPER A** lidera con $11,903.83 (90% del volumen).';
      } else if (lower.includes('cliente') || lower.includes('ferremundial')) {
        response = '👥 El cliente principal es **Ferremundial Proto 2020 C.A.** (Capital) con $3,923.64 facturados, representando el **34.89%** de los ingresos. **Pinta Ofertas C.A.** (Oriente) contribuye con $583.54 (5.18%). Hay 2 clientes con compras negativas que sugieren devoluciones: **Constructora Maca 78** y **Distribuciones Liscano**.';
        isWidget = true;
      } else if (lower.includes('inventario') || lower.includes('stock')) {
        response = '📦 El inventario Pareto tiene un valor de **$9,605.78 USD** y el fuera de Pareto **$2,442.21 USD**. ⚠️ **Alerta Crítica:** El SKU 404400702006 (Pintura Esmalte Pintamas Blanca) tiene **stock en 0** pero registra ventas recientes de $583.54. Se recomienda reabastecimiento urgente.';
      } else if (lower.includes('recomend') || lower.includes('sugier') || lower.includes('qué debo')) {
        response = '💡 Basado en el análisis actual recomiendo: **1)** Redistribuir cuentas de Keller Ortega para reducir dependencia. **2)** Reabastecer urgente Pintura Esmalte Pintamas. **3)** Activar campaña para clientes inactivos en Oriente. **4)** Revisar devoluciones de Constructora Maca 78.';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ia', content: response, isWidget }]);
      setIsTyping(false);
    }, 1200);
  };

  const renderContent = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-5">
      {/* Chat container */}
      <div className="flex-1 glass-card border border-[rgba(65,71,91,0.2)] flex flex-col overflow-hidden animate-fade-in-up relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none"></div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex w-full animate-fade-in-up", msg.type === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn("flex gap-3 max-w-[85%] md:max-w-[70%]", msg.type === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  msg.type === 'user'
                    ? "bg-[var(--color-surface-container-high)] text-white border-[rgba(65,71,91,0.2)]"
                    : "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)]"
                )}>
                  {msg.type === 'user' ? <User className="w-5 h-5 opacity-70" /> : <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(144,171,255,0.6)]" />}
                </div>
                <div className={cn(
                  "px-5 py-4 rounded-2xl text-sm leading-relaxed border backdrop-blur-sm",
                  msg.type === 'user'
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-on-primary-container)] border-[var(--color-primary)]/20 rounded-tr-sm"
                    : "bg-[var(--color-surface-container-high)]/50 border-[rgba(65,71,91,0.2)] text-on-surface rounded-tl-sm"
                )}>
                  <div dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }} />
                  {msg.isWidget && (
                    <div className="mt-4 p-4 bg-[var(--color-surface-container-highest)]/80 border border-[rgba(65,71,91,0.3)] rounded-xl flex items-center gap-4 hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                        <BarChart2 className="w-5 h-5 text-[var(--color-primary)]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold font-headline text-on-surface mb-1">Reporte de Clientes Generado</p>
                        <p className="text-[11px] text-on-surface-variant font-medium uppercase tracking-widest">Análisis de retención</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-3 max-w-[70%]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dim)] flex items-center justify-center text-white animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(144,171,255,0.4)]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[var(--color-surface-container-high)]/80 border border-[rgba(65,71,91,0.2)] rounded-tl-sm flex items-center gap-2 backdrop-blur-md">
                  <Loader2 className="w-4 h-4 text-[var(--color-primary)] animate-spin" />
                  <span className="text-sm text-on-surface-variant font-medium">Procesando núcleo neuronal...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[rgba(65,71,91,0.2)] bg-[var(--color-surface-container-low)]/60 backdrop-blur-xl relative z-10">
          <form onSubmit={handleSubmit} className="relative group transition-all duration-400">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta sobre ventas, clientes o inventarios..."
              disabled={isTyping}
              className="input-ghost w-full py-4 pl-6 pr-16 bg-black/20 text-sm font-medium tracking-wide placeholder-[rgba(165,170,194,0.4)] transition-colors group-focus-within:border-[var(--color-primary)]/50 focus:outline-none focus:ring-0 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-[var(--color-on-primary-container)] transition-all disabled:opacity-30 disabled:scale-95 disabled:hover:scale-95 hover:scale-105 shadow-[0_0_15px_rgba(144,171,255,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={isTyping}
                className="text-[11px] font-bold tracking-widest uppercase text-on-surface-variant hover:text-[var(--color-primary)] px-4 py-2 rounded-full bg-[var(--color-surface-container-highest)]/50 hover:bg-[var(--color-primary)]/10 border border-[rgba(65,71,91,0.2)] hover:border-[var(--color-primary)]/30 transition-all disabled:opacity-50 disabled:hover:border-transparent"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
