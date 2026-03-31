import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

gsap.registerPlugin(useGSAP);

export function MainLayout() {
  const container = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animation for layout components
    gsap.from(".main-sidebar", { x: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".main-header", { y: -30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
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
      
      {/* Custom Cursor Trail Elements */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"></div>
      <div ref={cursorFollowerRef} className="fixed top-0 left-0 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-[80px] pointer-events-none z-[9998] transition-opacity duration-300"></div>

      <div className="main-sidebar relative z-[100]">
        <Sidebar />
      </div>
      
      <main className="ml-72 min-h-screen flex flex-col relative z-50">
        <div className="main-header">
          <Header />
        </div>
        
        <div className="main-content-area flex-1 pt-32 px-12 pb-16 z-10 relative">
          <Outlet />
        </div>
        
        {/* Contextual FAB Button */}
        <button className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dim)] rounded-full flex items-center justify-center text-[var(--color-on-primary-container)] shadow-[0_0_30px_rgba(144,171,255,0.4)] hover:shadow-[0_0_40px_rgba(155,255,206,0.6)] hover:scale-110 active:scale-95 transition-all duration-500 z-50 group border border-white/10">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-500">add</span>
        </button>
      </main>
    </div>
  );
}
