import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Login() {
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate background elements smoothly
    tl.fromTo(".bg-element", 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 0.1, scale: 1, duration: 2, stagger: 0.2 }
    )
    .fromTo(".particles div", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.1 }, 
      "-=1.5"
    )
    .fromTo(".login-header", 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=1"
    )
    .fromTo(".glass-card", 
      { scale: 0.95, opacity: 0, y: 30 }, 
      { scale: 1, opacity: 1, y: 0, duration: 1.2 }, 
      "-=0.8"
    )
    .fromTo(".stagger-item", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, 
      "-=0.6"
    );
    
    // Continuous floating for particles
    gsap.to(".particles div", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      duration: "random(3, 6)",
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.5
    });
  }, { scope: container });

  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate complex neural bootup
    gsap.to(".glass-card", {
      scale: 1.05,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => navigate("/comercial")
    });
  };

  return (
    <div ref={container} className="font-body text-on-surface bg-mesh min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 p-16 opacity-10 blur-3xl pointer-events-none bg-element">
        <div className="w-96 h-96 bg-primary rounded-full"></div>
      </div>
      <div className="fixed bottom-0 left-0 p-16 opacity-10 blur-3xl pointer-events-none bg-element">
        <div className="w-80 h-80 bg-tertiary rounded-full"></div>
      </div>

      {/* Decorative Particles */}
      <div className="particles fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-[2px] h-[2px] bg-primary rounded-full top-[10%] left-[20%] shadow-[0_0_8px_rgba(144,171,255,0.8)]"></div>
        <div className="absolute w-[3px] h-[3px] bg-tertiary rounded-full top-[30%] left-[80%] shadow-[0_0_8px_rgba(155,255,206,0.8)]"></div>
        <div className="absolute w-[2px] h-[2px] bg-primary rounded-full top-[70%] left-[15%] shadow-[0_0_8px_rgba(144,171,255,0.8)]"></div>
        <div className="absolute w-[2px] h-[2px] bg-primary rounded-full top-[85%] left-[60%] shadow-[0_0_8px_rgba(144,171,255,0.8)]"></div>
        <div className="absolute w-[3px] h-[3px] bg-tertiary rounded-full top-[50%] left-[45%] shadow-[0_0_8px_rgba(155,255,206,0.8)]"></div>
      </div>

      {/* Main Box */}
      <main className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        <div className="login-header flex flex-col items-center mb-10 w-full">
          <div className="mb-6 h-16 w-16 flex items-center justify-center bg-[var(--color-primary)]/10 rounded-2xl border border-[var(--color-primary)]/30 shadow-[0_0_20px_rgba(144,171,255,0.2)]">
            <span className="material-symbols-outlined text-[var(--color-primary)] text-4xl drop-shadow-[0_0_15px_rgba(144,171,255,0.8)]">psychology</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface text-center uppercase">Super A</h1>
          <p className="font-label text-sm text-on-surface-variant tracking-widest mt-1 uppercase text-center w-full">Plataforma de Inteligencia</p>
        </div>

        <div className="glass-card w-full p-10 flex flex-col gap-8">
          <header className="stagger-item">
            <h2 className="font-headline text-xl font-bold text-on-surface">Iniciar Sesión</h2>
            <p className="text-on-surface-variant text-sm mt-1">Acceso autorizado al núcleo neuronal</p>
          </header>

          <form onSubmit={handleInitialize} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 stagger-item">
              <label className="font-label text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] px-1 opacity-80">ID de Ejecutivo</label>
              <div className="group relative flex items-center transition-all duration-400">
                <span className="material-symbols-outlined absolute left-4 text-outline group-focus-within:text-primary transition-colors">fingerprint</span>
                <input 
                  type="text" 
                  placeholder="EX-CORE-772" 
                  className="input-ghost w-full py-4 pl-12 pr-6 placeholder:text-outline font-medium text-sm" 
                  required 
                  defaultValue="K.ORTEGA"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 stagger-item">
              <label className="font-label text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] px-1 opacity-80">Clave de Seguridad</label>
              <div className="group relative flex items-center transition-all duration-400">
                <span className="material-symbols-outlined absolute left-4 text-outline group-focus-within:text-primary transition-colors">key_visualizer</span>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="input-ghost w-full py-4 pl-12 pr-6 placeholder:text-outline font-medium text-sm tracking-[0.2em]" 
                  required 
                  defaultValue="password"
                />
                <button type="button" className="absolute right-4 text-outline hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-4 mt-2 stagger-item">
              INICIAR SESIÓN
            </button>
          </form>

          <div className="flex items-center gap-4 py-2 opacity-60 stagger-item">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>
            <span className="text-outline text-[10px] font-bold tracking-[0.2em] uppercase">Alternativas</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 stagger-item">
            <button className="flex items-center justify-center gap-3 bg-[var(--color-surface-container)] border border-[rgba(65,71,91,0.2)] rounded-full py-3 px-4 hover:bg-[var(--color-surface-container-high)] hover:border-[rgba(144,171,255,0.2)] transition-all group duration-400">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">hub</span>
              <span className="font-label text-xs font-semibold text-on-surface">Portal SSO</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-[var(--color-surface-container)] border border-[rgba(65,71,91,0.2)] rounded-full py-3 px-4 hover:bg-[var(--color-surface-container-high)] hover:border-[rgba(155,255,206,0.2)] transition-all group duration-400">
              <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform" style={{fontVariationSettings: "'FILL' 1"}}>face_unlock</span>
              <span className="font-label text-xs font-semibold text-on-surface">Biometría</span>
            </button>
          </div>
        </div>
        
        <footer className="mt-12 w-full flex items-center justify-between px-4 opacity-0 login-header">
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-400">Política Neuronal</a>
            <a href="#" className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-400">Estado del Sistema</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(155,255,206,0.6)] animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-tertiary">Operativo</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
