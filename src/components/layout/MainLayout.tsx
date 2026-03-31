import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function MainLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-0">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto dashboard-bg p-5 md:p-8">
          <div className="max-w-[1400px] mx-auto animate-fade-in-up relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
