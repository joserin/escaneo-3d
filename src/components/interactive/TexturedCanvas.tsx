import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { TexturedModel } from './TexturedModel';

interface TexturedCanvasProps {
  modelUrl: string;
}

export default function TexturedCanvas({ modelUrl }: TexturedCanvasProps) {
  return (
    <div className="w-full h-125 bg-slate-900 rounded-lg overflow-hidden relative">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Iluminación general y direccional para resaltar volúmenes */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -10, -15]} intensity={0.3} />

        {/* Environment añade reflejos realistas sobre las superficies del modelo */}
        <Environment preset="city" />

        <Center>
          <TexturedModel url={modelUrl} />
        </Center>

        <OrbitControls 
          enableDamping 
          dampingFactor={0.9} 
          makeDefault 
        />
      </Canvas>
    </div>
  );
}