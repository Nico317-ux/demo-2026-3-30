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
      <div className="flex-1 card flex flex-col overflow-hidden animate-fade-in-up">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex w-full animate-fade-in-up", msg.type === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn("flex gap-3 max-w-[85%] md:max-w-[70%]", msg.type === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                  msg.type === 'user'
                    ? "bg-brand-charcoal text-white"
                    : "bg-gradient-to-br from-accent-violet to-accent-blue text-white"
                )}>
                  {msg.type === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  msg.type === 'user'
                    ? "bg-brand-charcoal text-white rounded-tr-md"
                    : "bg-surface-1 border border-surface-2 text-text-primary rounded-tl-md"
                )}>
                  <div dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }} />
                  {msg.isWidget && (
                    <div className="mt-3 p-3 bg-accent-violet/5 border border-accent-violet/15 rounded-xl flex items-center gap-3 hover:bg-accent-violet/10 transition-colors cursor-pointer group">
                      <BarChart2 className="w-5 h-5 text-accent-violet" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-text-primary">Reporte de Clientes Generado</p>
                        <p className="text-[11px] text-text-muted">Análisis de retención y valor de cartera</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-violet transition-colors" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-3 max-w-[70%]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-violet to-accent-blue flex items-center justify-center text-white animate-pulse-soft shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-surface-1 border border-surface-2 rounded-tl-md flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-accent-violet animate-spin" />
                  <span className="text-sm text-text-muted font-medium">Analizando datos...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-surface-2/50 bg-white/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta sobre ventas, clientes o inventarios..."
              disabled={isTyping}
              className="w-full bg-surface-1 border border-surface-2 rounded-xl pl-4 pr-14 py-3.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-violet/30 focus:border-accent-violet/30 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-accent-violet hover:bg-accent-violet/80 text-white rounded-lg transition-all disabled:opacity-40 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={isTyping}
                className="text-[11px] font-medium text-text-muted hover:text-accent-violet px-3 py-1.5 rounded-lg bg-surface-1 hover:bg-accent-violet/5 border border-surface-2 transition-all disabled:opacity-50"
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
