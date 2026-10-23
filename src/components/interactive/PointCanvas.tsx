import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { PointCloudModel } from './PointCloudModel';

interface PointCanvasProps {
  modelUrl: string;
}

export default function PointCanvas({ modelUrl }: PointCanvasProps) {
  return (
    <div className="w-full h-125 bg-slate-950 rounded-lg overflow-hidden relative">
      {/* Superposición estética de rejilla/grid técnica */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none opacity-40 z-10" />

      <Canvas
        camera={{ position: [10, 10, 10], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Center centrará automáticamente tu modelo 3D en el origen */}
        <Center>
          <PointCloudModel url={modelUrl} pointSize={0.04} color="#00e5ff" />
        </Center>

        {/* OrbitControls le permite al cliente rotar, hacer zoom y desplazarse por el modelo */}
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          makeDefault 
        />
      </Canvas>
    </div>
  );
}