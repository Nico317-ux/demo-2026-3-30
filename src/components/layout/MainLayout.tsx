import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export function MainLayout() {
  const container = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useGSAP(() => {
    // Entrance animations for layout components
    gsap.from(".main-sidebar", { x: -50, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" });
    gsap.from(".main-header", { y: -30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out", clearProps: "transform" });
    gsap.from(".main-content-area", { opacity: 0, duration: 1.5, delay: 0.4, ease: "power2.out" });

    // Cursor Trail Effect (Estela premium)
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;

    if (cursor && follower) {
      gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

      const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
      const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

      const xToFollower = gsap.quickTo(follower, "x", { duration: 0.8, ease: "power3" });
      const yToFollower = gsap.quickTo(follower, "y", { duration: 0.8, ease: "power3" });

      const onMouseMove = (e: MouseEvent) => {
        xToCursor(e.clientX);
        yToCursor(e.clientY);
        xToFollower(e.clientX);
        yToFollower(e.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, { scope: container });

  return (
    <div ref={container} className="bg-mesh text-on-surface font-body min-h-screen selection:bg-[var(--color-primary)]/30 overflow-hidden relative">

      {/* Decorative ambient backgrounds */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="fixed top-[30%] left-[40%] w-[30%] h-[30%] bg-tertiary/10 blur-[200px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '15s' }}></div>

      {/* Custom Cursor Trail Elements */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--color-primary)] mix-blend-screen pointer-events-none z-[9999] opacity-80 backdrop-blur-sm shadow-[0_0_15px_rgba(144,171,255,1)]"></div>
      <div ref={cursorFollowerRef} className="fixed top-0 left-0 w-48 h-48 bg-[var(--color-primary)]/20 rounded-full blur-[60px] pointer-events-none z-[9998] transition-opacity duration-300"></div>

      {/* Global Floating Particles */}
      <div className="global-particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}></div>
        ))}
      </div>

      <div className="main-sidebar">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="md:ml-72 ml-0 min-h-screen flex flex-col relative z-50">
        <div className="main-header">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        <div className="main-content-area flex-1 pt-32 px-4 md:px-12 pb-16 z-10 relative">
          <Outlet />
        </div>

        {/* Contextual FAB Button */}
        <button className="fixed bottom-10 right-6 md:right-10 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dim)] rounded-full flex items-center justify-center text-[var(--color-on-primary-container)] shadow-[0_0_30px_rgba(144,171,255,0.4)] hover:shadow-[0_0_40px_rgba(155,255,206,0.6)] hover:scale-110 active:scale-95 transition-all duration-500 z-50 group border border-white/10">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-500">add</span>
        </button>
      </main>
    </div>
  );
}
