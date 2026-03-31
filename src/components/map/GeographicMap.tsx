import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Interface for simulated websocket data
interface NodeData {
  id: string;
  name: string;
  coords: [number, number];
  type: "principal" | "crecimiento" | "neutral";
  radius: number;
}

interface Connection {
  id: string;
  from: [number, number];
  to: [number, number];
  type: "primary" | "secondary";
  active: boolean;
}

// Initial Base Data
const INITIAL_NODES: NodeData[] = [
  { id: "maracaibo", name: "ZULIA", coords: [10.6317, -71.6406], type: "principal", radius: 6 },
  { id: "caracas", name: "CARACAS", coords: [10.4806, -66.9036], type: "crecimiento", radius: 8 },
  { id: "valencia", name: "Valencia", coords: [10.1620, -68.0077], type: "neutral", radius: 4 },
  { id: "guayana", name: "BOLÍVAR", coords: [8.3039, -62.7189], type: "principal", radius: 5 },
  { id: "sancristobal", name: "TÁCHIRA", coords: [7.7669, -72.2250], type: "crecimiento", radius: 6 },
];

const INITIAL_CONNECTIONS: Connection[] = [
  { id: "c1", from: [10.6317, -71.6406], to: [10.1620, -68.0077], type: "primary", active: true },
  { id: "c2", from: [10.1620, -68.0077], to: [10.4806, -66.9036], type: "secondary", active: true },
  { id: "c3", from: [10.4806, -66.9036], to: [8.3039, -62.7189], type: "primary", active: true },
  { id: "c4", from: [7.7669, -72.2250], to: [10.6317, -71.6406], type: "secondary", active: true },
];

export function GeographicMap() {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [activePoints, setActivePoints] = useState(24);

  // Simulated WebSocket Effect for Real-Time Data
  useEffect(() => {
    const wsSimulationInterval = setInterval(() => {
      // Fluctuate node radii randomly to simulate activity
      setNodes((current) =>
        current.map((node) => ({
          ...node,
          radius: node.radius + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2),
        }))
      );
      
      // Randomly pulse connections
      setConnections((current) =>
        current.map((conn) => ({
          ...conn,
          active: Math.random() > 0.3,
        }))
      );

      // Randomly increment active points highly dynamically (like real-time sessions)
      setActivePoints((prev) => prev + (Math.random() > 0.6 ? 1 : Math.random() > 0.8 ? -1 : 0));
    }, 2000); // New payload every 2s

    return () => clearInterval(wsSimulationInterval);
  }, []);

  const getColor = (type: string) => {
    switch (type) {
      case "principal": return "var(--color-primary)"; // Blue
      case "crecimiento": return "var(--color-tertiary)"; // Cyan/Emerald
      default: return "#ffffff"; // Neutral White
    }
  };

  return (
    <div className="glass-card h-full overflow-hidden flex flex-col relative group">
      {/* UI Overlay: Top Map Legend */}
      <div className="p-8 pb-4 flex justify-between items-center absolute top-0 left-0 w-full z-[1000] bg-gradient-to-b from-[var(--color-surface-container-low)] to-transparent pointer-events-none">
        <div>
          <h3 className="text-xl font-bold font-headline text-on-surface">Geografía</h3>
          <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-widest font-bold">Densidad de Concentración</p>
        </div>
        <div className="bg-[var(--color-surface-container-highest)] px-4 py-3 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-6 border border-[rgba(144,171,255,0.1)] pointer-events-auto uppercase shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-tertiary)] shadow-[0_0_8px_rgba(155,255,206,0.6)] animate-pulse"></span>
            <span>Crecimiento</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_rgba(144,171,255,0.6)]"></span>
            <span>Principal</span>
          </div>
        </div>
      </div>

      {/* The Map Core */}
      <div className="flex-1 w-full min-h-[500px] relative bg-black">
        {/* We use a Dark Matter tile layer for the high tech appearance without an API key */}
        <MapContainer 
          center={[8.82, -66.19]} // Centered on Venezuela approx
          zoom={5} 
          scrollWheelZoom={false}
          className="w-full h-full z-0 font-body mix-blend-screen"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          />

          {/* Aristas (Líneas de conexión) */}
          {connections.map((conn) => (
            <Polyline 
              key={conn.id} 
              positions={[conn.from, conn.to]} 
              pathOptions={{ 
                color: conn.type === "primary" ? "var(--color-primary)" : "var(--color-tertiary)", 
                weight: conn.active ? 2 : 1,
                opacity: conn.active ? 0.8 : 0.2,
                dashArray: "5, 10" 
              }} 
              className="transition-all duration-1000"
            />
          ))}

          {/* Nodos (Círculos Pulsantes) */}
          {nodes.map((node) => (
            <React.Fragment key={node.id}>
              {/* Outer pulsing halo */}
              <CircleMarker 
                center={node.coords} 
                radius={node.radius * 2} 
                pathOptions={{ color: getColor(node.type), fillColor: getColor(node.type), fillOpacity: 0.1, stroke: false }} 
                className="transition-all duration-1000 origin-center"
              />
              {/* Inner Solid Node */}
              <CircleMarker 
                center={node.coords} 
                radius={node.type === "neutral" ? 3 : 5} 
                pathOptions={{ 
                  color: "white", 
                  weight: 1.5,
                  fillColor: getColor(node.type), 
                  fillOpacity: 1 
                }} 
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} className="dark-tooltip font-headline font-bold">
                  {node.name} <span className="opacity-70 text-[10px] ml-1 uppercase">({node.type})</span>
                </Tooltip>
              </CircleMarker>
            </React.Fragment>
          ))}
        </MapContainer>
        
        {/* Floating Action Button for Map Interaction */}
        <button className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[var(--color-primary)] to-[#002f5d] rounded-full z-[1000] flex items-center justify-center text-white shadow-[0_0_20px_rgba(144,171,255,0.4)] hover:scale-110 active:scale-95 transition-all outline-none border border-[var(--color-primary)]/50">
           <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>

      {/* UI Overlay: Statistics Footer */}
      <div className="p-8 bg-[var(--color-surface-container-low)] flex flex-col md:flex-row items-center justify-between border-t border-[rgba(65,71,91,0.2)] relative z-[1000]">
        <div className="flex gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] font-bold mb-1">Región Principal</p>
            <p className="text-2xl font-bold text-on-surface font-headline">Sudamérica</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-tertiary)] font-bold mb-1 flex items-center gap-2">Puntos Activos <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-tertiary)] animate-pulse"></span></p>
            <p className="text-2xl font-bold text-on-surface font-headline">{activePoints} Ubicaciones</p>
          </div>
        </div>
        <div className="flex -space-x-3 mt-4 md:mt-0 hover:space-x-1 transition-all duration-400">
           <div className="w-12 h-12 rounded-full border-2 border-[var(--color-surface-container-low)] bg-blue-900/50 flex items-center justify-center text-[var(--color-primary)] relative z-[3] hover:z-10 transition-transform shadow-[0_4px_10px_rgba(0,0,0,0.5)]"> <span className="material-symbols-outlined text-xl">person</span> </div>
           <div className="w-12 h-12 rounded-full border-2 border-[var(--color-surface-container-low)] bg-emerald-900/50 flex items-center justify-center text-[var(--color-tertiary)] relative z-[2] hover:z-10 transition-transform shadow-[0_4px_10px_rgba(0,0,0,0.5)]"> <span className="material-symbols-outlined text-xl">person_4</span> </div>
           <div className="w-12 h-12 rounded-full border-2 border-[var(--color-surface-container-low)] bg-[var(--color-surface-container-highest)] flex items-center justify-center text-[10px] font-bold text-on-surface relative z-[1] hover:z-10 transition-transform hover:bg-[var(--color-primary)] hover:text-white shadow-[0_4px_10px_rgba(0,0,0,0.5)]">+12</div>
        </div>
      </div>
    </div>
  );
}
