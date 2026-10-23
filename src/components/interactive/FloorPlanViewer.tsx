import { useState } from 'react';

interface FloorPlanViewerProps {
  svgUrl: string;
}

export default function FloorPlanViewer({ svgUrl }: FloorPlanViewerProps) {
  const [scale, setScale] = useState(1);
  const [activeLayers, setActiveLayers] = useState({
    cotas: true,
    estructura: true,
    mobiliario: true,
  });

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const handleReset = () => setScale(1);

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="w-full h-125 bg-slate-950 rounded-lg overflow-hidden relative flex flex-col">
      {/* Barra de herramientas superior del plano */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-700/60 p-2 rounded-lg backdrop-blur-md shadow-lg">
        <button
          onClick={handleZoomIn}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-sm font-mono rounded transition"
          title="Acercar"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-sm font-mono rounded transition"
          title="Alejar"
        >
          -
        </button>
        <button
          onClick={handleReset}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded transition"
        >
          Reset
        </button>
        <div className="h-4 w-px bg-slate-700 mx-1" />
        <span className="text-xs text-slate-400 font-mono">ESCALA: 1:100</span>
      </div>

      {/* Control de Capas CAD 
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-lg backdrop-blur-md shadow-lg text-xs font-mono text-slate-300">
        <span className="text-[10px] text-cyan-400 tracking-wider mb-1">CAPAS AS-BUILT</span>
        <label className="flex items-center gap-2 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={activeLayers.cotas}
            onChange={() => toggleLayer('cotas')}
            className="accent-cyan-500"
          />
          Cotas y Ejes
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={activeLayers.estructura}
            onChange={() => toggleLayer('estructura')}
            className="accent-cyan-500"
          />
          Estructura Base
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={activeLayers.mobiliario}
            onChange={() => toggleLayer('mobiliario')}
            className="accent-cyan-500"
          />
          Instalaciones / Equipos
        </label>
      </div>*/}

      {/* Contenedor desplazable del plano SVG */}
      <div className="w-full h-full overflow-auto flex items-center justify-center p-8 cursor-grab active:cursor-grabbing">
        <div
          style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
          className="transition-transform origin-center"
        >
          {/* Aquí cargamos dinámicamente o simulamos el plano con clases dinámicas según las capas */}
          <div className="relative border border-cyan-500/30 bg-slate-900/50 p-8 rounded shadow-2xl min-w-150 min-h-100 flex items-center justify-center">
            {/* Si tienes tu SVG como componente o imagen */}
            <object
              data={svgUrl}
              type="image/svg+xml"
              className="w-full h-full max-w-2xl pointer-events-none filter invert hue-rotate-180 opacity-90"
            >
              {/* Fallback por si el SVG no carga */}
              <div className="text-center font-mono text-slate-400 p-8">
                <p className="text-cyan-400 mb-2">PLANO TÉCNICO AS-BUILT (DWG/PDF)</p>
                <p className="text-xs">Planta industrial - Sector Norte A-04</p>
              </div>
            </object>
          </div>
        </div>
      </div>

      {/* Barra de estado inferior */}
      <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 border-t border-slate-800 px-4 py-2 flex justify-between items-center text-xs font-mono text-slate-400 z-20">
        <span>FORMATO: VECTORIAL (SVG / CAD)</span>
        <a
          href={svgUrl}
          download
          className="text-cyan-400 hover:underline flex items-center gap-1"
        >
          ↓ Descargar Plano Oficial (PDF)
        </a>
      </div>
    </div>
  );
}