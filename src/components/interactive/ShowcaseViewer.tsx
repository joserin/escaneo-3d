import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import factoryImage from '../../assets/industrial-factory.webp';
import PointCanvas from './PointCanvas';
import TexturedCanvas from './TexturedCanvas';
import FloorPlanViewer from './FloorPlanViewer';

const showcaseTabs = [
  {
    id: "tour",
    short: "Tours virtuales",
    label: "Tours Virtuales 3D (Matterport)",
    code: "MP-SPACE-04",
  },
  {
    id: "plant",
    short: "Modelos de planta",
    label: "Modelos de Planta 3D (Three.js / Autodesk)",
    code: "CAD-PLANT-12",
  },
  {
    id: "compare",
    short: "Comparador",
    label: "Comparador: Nube de Puntos vs. Plano",
    code: "CMP-ASB-08",
  },
];

export default function ShowcaseViewer() {
  const [activeShowcase, setActiveShowcase] = useState("tour");
  const [modelLoaded, setModelLoaded] = useState(false);
  const [comparison, setComparison] = useState(52);

  const selectShowcase = (id: string) => {
    setActiveShowcase(id);
    setModelLoaded(false);
  };

  return (
    <div className="showcase-inner">
      {/* Cabecera */}
      <div className="showcase-heading">
        <div>
          <span className="section-kicker cyan-kicker">
            <i></i>
            Showcase interactivo 3D
          </span>
          <h2>Explore el proyecto antes de intervenir.</h2>
        </div>
        <div className="showcase-intro">
          <span>03 / ENTORNO DIGITAL</span>
          <p>
            Inspeccione espacios, valide geometrías y compare cada fase
            desde una única interfaz técnica optimizada.
          </p>
        </div>
      </div>

      {/* Pestañas de selección */}
      <div aria-label="Tipos de visualización" className="showcase-tabs" role="tablist">
        {showcaseTabs.map((tab, index) => (
          <button
            aria-selected={activeShowcase === tab.id}
            className={activeShowcase === tab.id ? "is-active" : ""}
            key={tab.id}
            onClick={() => selectShowcase(tab.id)}
            role="tab"
            type="button"
          >
            <small>0{index + 1}</small>
            <span>{tab.label}</span>
            <b>{tab.short}</b>
          </button>
        ))}
      </div>

      {/* Visor Interactivo Principal */}
      <div className={`showcase-viewer mode-${activeShowcase}`}>
        <div className="viewer-head">
          <span>
            <i></i>
            VISOR / {showcaseTabs.find((tab) => tab.id === activeShowcase)?.code}
          </span>
          <div>
            <span>X 18.242</span>
            <span>Y 06.091</span>
            <span>Z 03.840</span>
          </div>
        </div>

        <div className="showcase-scene">
          <div className="showcase-photo" 
            style={{ backgroundImage: `url(${factoryImage.src})` }}/>
          <div className="showcase-wireframe">
            <i className="wire wire-one" />
            <i className="wire wire-two" />
            <i className="wire wire-three" />
            <i className="wire wire-four" />
          </div>
          <div className="showcase-cloud">
            {Array.from({ length: 54 }).map((_, index) => (
              <i
                key={index}
                style={
                  {
                    "--sx": `${(index * 67) % 96}%`,
                    "--sy": `${(index * 43) % 88}%`,
                    "--sd": `${(index % 9) * 0.17}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {modelLoaded ? (
            <div className="loaded-model">
              {activeShowcase === "tour" ? (
                  <TexturedCanvas modelUrl="/models/prison_hallway.glb" />
              ) : activeShowcase === "plant" ? (
                <FloorPlanViewer svgUrl="/models/plano.svg" />
              ) : (
                /* Renderizamos la Nube de Puntos interactiva desde tu archivo .glb */
                <PointCanvas modelUrl="/models/prison_hallway.glb" />
              )}
              <div className="loaded-status">
                <span>
                  <i></i> MODELO CARGADO
                </span>
                <b>60 FPS</b>
              </div>
            </div>
          ) : (
            <div className="load-overlay">
              <div className="load-card">
                <span className="load-icon">
                  <Icon name="cube" size={26} />
                </span>
                <div>
                  <small>CARGA BAJO DEMANDA</small>
                  <strong>
                    {activeShowcase === "tour"
                      ? "Recorrido virtual — Planta Norte"
                      : activeShowcase === "plant"
                        ? "Modelo BIM — Sistema de proceso"
                        : "Gemelo digital — Comparación As-Built"}
                  </strong>
                  <p>El contenido 3D se activa únicamente cuando lo solicita para mantener la web ligera.</p>
                </div>
                <Button className="load-button" onClick={() => setModelLoaded(true)}>
                  <span>▶</span>
                  Cargar modelo 3D
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="viewer-statusbar">
          <span>
            <Icon name="layers" size={15} />
            CAPAS: 08
          </span>
          <span>
            <Icon name="scan" size={15} />
            PUNTOS: 24.8M
          </span>
          <b>WEBGL / READY</b>
          <span className="viewer-progress">
            <i style={{ width: modelLoaded ? "100%" : "18%" }} />
          </span>
        </div>
      </div>

      {/* Módulo Comparador Antes / Después */}
      <div className="comparison-module">
        <div className="comparison-copy">
          <span className="comparison-number">03.2</span>
          <div>
            <span className="section-kicker">
              <i></i>
              Verificación visual
            </span>
            <h3>Nube de puntos vs. modelo final</h3>
            <p>
              Deslice para comprobar cómo los datos capturados con láser se convierten
              en geometría CAD precisa y documentación As-Built.
            </p>
          </div>
          <div className="comparison-legend">
            <span>
              <i className="legend-cloud" />
              Captura láser
            </span>
            <span>
              <i className="legend-cad" />
              Modelo CAD
            </span>
          </div>
        </div>

        <div className="comparison-view">
          <div className="comparison-base">
            <div className="cad-building">
              <span className="cad-floor floor-one" />
              <span className="cad-floor floor-two" />
              <span className="cad-floor floor-three" />
              <i className="cad-pipe cad-pipe-one" />
              <i className="cad-pipe cad-pipe-two" />
              <i className="cad-pipe cad-pipe-three" />
            </div>
            <span className="compare-side-label right-label">
              <small>OUTPUT</small>
              MODELO AUTOCAD
            </span>
          </div>

          <div className="comparison-before" style={{ width: `${comparison}%` }}>
            <div className="comparison-before-image" 
              style={{ backgroundImage: `url(${factoryImage.src})` }}/>
            <div className="comparison-point-pattern">
              {Array.from({ length: 42 }).map((_, index) => (
                <i
                  key={index}
                  style={
                    {
                      "--px": `${(index * 37) % 94}%`,
                      "--py": `${(index * 61) % 90}%`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <span className="compare-side-label left-label">
              <small>INPUT</small>
              NUBE DE PUNTOS
            </span>
          </div>

          <div className="comparison-handle" style={{ left: `${comparison}%` }}>
            <span>‹</span>
            <i></i>
            <span>›</span>
          </div>
          <input
            aria-label="Comparar nube de puntos y modelo CAD"
            max="82"
            min="18"
            onChange={(event) => setComparison(Number(event.currentTarget.value))}
            type="range"
            value={comparison}
          />
          <div className="compare-coordinates">
            <span>REF / SCAN-A04</span>
            <span>PRECISIÓN ±20 MM</span>
          </div>
        </div>
      </div>
    </div>
  );
}