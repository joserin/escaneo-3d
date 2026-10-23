import { useGLTF } from '@react-three/drei';

interface TexturedModelProps {
  url: string;
}

export function TexturedModel({ url }: TexturedModelProps) {
  // useGLTF carga automáticamente las mallas, geometrías y materiales/texturas incrustadas en el .glb
  const { scene } = useGLTF(url);

  return <primitive object={scene} />;
}

// Pre-cargamos el modelo para optimizar la transición entre pestañas
useGLTF.preload('/models/prison_hallway.glb');