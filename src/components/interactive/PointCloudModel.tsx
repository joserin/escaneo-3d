import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface PointCloudModelProps {
  url: string;
  pointSize?: number;
  color?: string;
}

export function PointCloudModel({
  url,
  pointSize = 0.03,
  color = '#00f0ff', // Color cian/neón tipo escáner láser
}: PointCloudModelProps) {
  // Cargamos el modelo GLTF/GLB
  const { scene } = useGLTF(url);

  // Extraemos todos los vértices del modelo para unirlos en una sola geometría de puntos
  const combinedGeometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Clonamos la geometría y le aplicamos las transformaciones (posición, rotación, escala) de la malla padre
        const clonedGeom = mesh.geometry.clone();
        clonedGeom.applyMatrix4(mesh.matrixWorld);
        geometries.push(clonedGeom);
      }
    });

    if (geometries.length === 0) return null;

    // Fusionamos todas las geometrías en una sola para máxima optimización de rendimiento
    return mergeGeometries(geometries);
  }, [scene]);

  if (!combinedGeometry) return null;

  return (
    <points geometry={combinedGeometry}>
      <pointsMaterial
        size={pointSize}
        color={color}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.85}
      />
    </points>
  );
}

// Función auxiliar para combinar múltiples BufferGeometry en una sola
function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  let totalPositions = 0;

  for (const geom of geometries) {
    if (geom.attributes.position) {
      totalPositions += geom.attributes.position.array.length;
    }
  }

  const mergedPositions = new Float32Array(totalPositions);
  let offset = 0;

  for (const geom of geometries) {
    if (geom.attributes.position) {
      const posArray = geom.attributes.position.array;
      mergedPositions.set(posArray, offset);
      offset += posArray.length;
    }
  }

  const mergedGeometry = new THREE.BufferGeometry();
  mergedGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(mergedPositions, 3)
  );

  return mergedGeometry;
}

// Pre-cargamos el modelo para evitar tirones de carga
useGLTF.preload('/models/prison_hallway.glb');