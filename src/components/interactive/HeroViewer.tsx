import { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import factoryImage from '../../assets/industrial-factory.webp';

export default function HeroViewer() {
  const [scanActive, setScanActive] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scanActive) return;
    const timer = window.setInterval(
      () => setRotation((value) => value + 0.15),
      30,
    );
    return () => window.clearInterval(timer);
  }, [scanActive]);

  return (
    <div className="visual-column">
      <div className="visual-index">VISUALIZACIÓN / 01</div>
      <div className="viewport-shell" ref={viewportRef}>
        <div
          className="viewport-image"
          style={{
            backgroundImage: `url(${factoryImage.src})`,
            transform: `scale(${zoom}) rotate(${rotation * 0.025}deg)`,
          }}
        />
        <div className="viewport-grid" />
        <div className={scanActive ? "scan-line active" : "scan-line"} />
        <div
          className="point-cloud"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {Array.from({ length: 34 }).map((_, index) => (
            <i
              key={index}
              style={
                {
                  "--x": `${(index * 47) % 96}%`,
                  "--y": `${(index * 71) % 91}%`,
                  "--delay": `${(index % 7) * 0.25}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="viewport-topbar">
          <span>
            <i /> Escaneo activo
          </span>
          <b>PLANTA-A / SECTOR 04</b>
        </div>

        <div className="target target-one">
          <span>HVAC–042</span>
        </div>
        <div className="target target-two">
          <span>LÍNEA–P12</span>
        </div>
        <div className="target target-three" />

        <div className="axis">
          <span className="axis-z">Z</span>
          <span className="axis-x">X</span>
          <span className="axis-y">Y</span>
        </div>

        <div className="viewer-controls">
          <Button
            variant="control"
            className="control"
            onClick={() => setZoom((value) => Math.min(value + 0.1, 1.35))}
          >
            <Icon name="plus" size={18} />
            <span className="sr-only">Acercar</span>
          </Button>
          <Button
            variant="control"
            className="control"
            onClick={() => setZoom((value) => Math.max(value - 0.1, 1))}
          >
            <Icon name="minus" size={18} />
            <span className="sr-only">Alejar</span>
          </Button>
          <Button
            variant="control"
            className={`control ${scanActive ? "is-active" : ""}`}
            onClick={() => setScanActive((active) => !active)}
          >
            <Icon name="rotate" size={18} />
            <span className="sr-only">Rotar</span>
          </Button>
          <span className="control-divider" />
          <Button
            variant="control"
            className="control"
            onClick={() => viewportRef.current?.requestFullscreen()}
          >
            <Icon name="expand" size={18} />
            <span className="sr-only">Pantalla completa</span>
          </Button>
        </div>

        <div className="viewport-footer">
          <span>
            <Icon name="scan" size={15} /> NUBE DE PUNTOS
          </span>
          <b>14.2M PTS</b>
          <span className="coordinates">
            X 24.903 · Y 08.412 · Z 06.831
          </span>
        </div>
      </div>
      <div className="image-credit">
        Imagen:{" "}
        <a
          href="https://unsplash.com/@moyse"
          target="_blank"
          rel="noreferrer"
        >
          Taton Moïse / Unsplash
        </a>
      </div>
    </div>
  );
}