import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, BarChart3, Bot, Users } from 'lucide-react';
import { SpinningHeroA, LogoBrand } from '../components/shared/LogoBrand';

export function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('demo@supera.com');
  const [password, setPassword] = useState('demo123');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/comercial'), 900);
  };

  return (
    <div className="min-h-screen flex bg-surface-0">
      {/* Left: Visual Brand Panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden sidebar-gradient items-center justify-center">
        {/* Decorative animated orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-brand-gold/15 rounded-full blur-[150px] animate-pulse-soft delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-violet/10 rounded-full blur-[100px] animate-float" />

        {/* Floating particle dots */}
        <div className="absolute top-[20%] right-[25%] w-2 h-2 bg-brand-gold/40 rounded-full animate-float" />
        <div className="absolute top-[60%] left-[20%] w-1.5 h-1.5 bg-white/20 rounded-full animate-float delay-150" />
        <div className="absolute bottom-[30%] right-[15%] w-1 h-1 bg-brand-red/30 rounded-full animate-float delay-300" />

        <div className="relative z-10 text-center space-y-10 px-12 animate-fade-in-up">
          {/* Spinning 3D red A */}
          <div className="mx-auto">
            <SpinningHeroA />
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Super A
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-brand-red rounded-full mx-auto" />
            <p className="text-lg text-white/60 font-light max-w-sm mx-auto">
              Plataforma inteligente de gestión empresarial
            </p>
          </div>

          {/* Feature pills with icons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { text: 'Dashboard en Tiempo Real', icon: BarChart3 },
              { text: 'Inteligencia Artificial', icon: Bot },
              { text: 'Gestión de Clientes', icon: Users },
            ].map((item, i) => (
              <span key={item.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 text-white/70 text-sm font-medium border border-white/10 backdrop-blur-sm animate-fade-in-up hover:bg-white/12 hover:text-white/90 hover:border-white/20 transition-all cursor-default" style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'backwards' }}>
                <item.icon className="w-4 h-4 text-brand-gold" />
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom branding */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/30 text-xs font-medium tracking-widest uppercase">
            © 2026 Super A · Demo BOTINFY
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md animate-fade-in-up delay-150" style={{ animationFillMode: 'backwards' }}>
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <LogoBrand size="lg" />
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-display font-bold text-text-primary">
              Bienvenido
            </h2>
            <p className="text-text-secondary">
              Inicia sesión para acceder al dashboard.
            </p>
          </div>

          {/* Quick Access */}
          <div className="mb-8">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Acceso Rápido Demo</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Keller Ortega', role: 'Coordinador', initials: 'KO', color: 'bg-brand-red' },
                { name: 'Ana Martínez', role: 'Ejecutiva', initials: 'AM', color: 'bg-brand-gold' },
              ].map((user, i) => (
                <button
                  key={user.name}
                  onClick={() => { setEmail('demo@supera.com'); submit({ preventDefault: () => {} } as React.FormEvent); }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-surface-2 hover:border-brand-gold/40 hover:bg-surface-1 transition-all group card-lift cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${250 + i * 100}ms`, animationFillMode: 'backwards' }}
                >
                  <div className={`w-10 h-10 rounded-xl ${user.color} flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {user.initials}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                    <p className="text-[11px] text-text-muted">{user.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-surface-2" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">O ingresa manualmente</span>
            <div className="flex-1 h-px bg-surface-2" />
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-text-primary">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-1 border border-surface-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/40 transition-all text-sm"
                placeholder="usuario@empresa.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-text-primary">Contraseña</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-surface-1 border border-surface-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold/40 transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-text-muted mt-1">Contraseña demo: <span className="font-mono font-semibold text-brand-gold">demo123</span></p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-charcoal to-brand-charcoal/90 hover:from-brand-red hover:to-brand-red/90 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Iniciar Sesión <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-xs text-text-muted text-center mt-8">
            © 2026 Super A · Desarrollado por BOTINFY
          </p>
        </div>
      </div>
    </div>
  );
}
