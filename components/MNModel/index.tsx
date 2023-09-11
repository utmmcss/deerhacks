import { Suspense } from 'react';
import { useState } from 'react';

import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, extend } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, ToneMapping } from '@react-three/postprocessing';
import { GLTF } from 'three-stdlib';

extend({ OrbitControls });

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    MN: THREE.Mesh;
    MN_Wireframe: THREE.Mesh;
  };
};

type Props = {
  onCreated?: () => void;
};

const Model = () => {
  const { nodes } = useGLTF('./mn.glb') as GLTFResult;

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        scale={[0.5, 0.25, 1.75]}
      />
      <mesh
        geometry={nodes.Cube_1.geometry}
        material={nodes.Cube_1.material}
        scale={[0.5, 0.25, 1.75]}
      />
      <mesh geometry={nodes.MN.geometry} material={nodes.MN.material} scale={[0.5, 0.25, 1.75]} />
      <mesh
        geometry={nodes.MN_Wireframe.geometry}
        material={nodes.MN_Wireframe.material}
        scale={[0.525, 0.275, 1.775]}
        material-toneMapped={false}
        material-emissiveIntensity={3.65}
      />
    </group>
  );
};

const MNModel = (props: Props) => {
  const { onCreated } = props;
  const [grabbing, setGrabbing] = useState(false);

  return (
    <Canvas
      camera={{ position: [4.5, 0, -3], filmOffset: -0.5 }}
      onMouseDown={() => setGrabbing(true)}
      onMouseUp={() => setGrabbing(false)}
      onCreated={() => onCreated?.()}
      style={{ cursor: grabbing ? 'grabbing' : 'grab' }}
    >
      <Suspense fallback={null}>
        <Model />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        rotateSpeed={1}
        maxPolarAngle={1.6}
        enablePan={false}
        enableZoom={false}
      />
      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={1} />
        <Noise opacity={0.05} />
        <ToneMapping
          adaptive
          resolution={256}
          middleGrey={0.4}
          maxLuminance={16.0}
          averageLuminance={1.0}
          adaptationRate={1.0}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default MNModel;
