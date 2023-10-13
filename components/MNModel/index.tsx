import { Suspense, useState } from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Environment, OrbitControls, PerformanceMonitor, Preload, useGLTF } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, ToneMapping } from '@react-three/postprocessing'
import { suspend } from 'suspend-react'
import { GLTF } from 'three-stdlib'

extend({ OrbitControls })

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
    Cube_1: THREE.Mesh
    MN: THREE.Mesh
    MN_Wireframe: THREE.Mesh
  }
}

type Props = {
  onAfterRender?: () => void
}

const environment = import('@pmndrs/assets/hdri/city.exr').then((module) => module.default)

const Model = (props: Props) => {
  const { onAfterRender } = props
  const { nodes } = useGLTF('./mn.glb') as GLTFResult

  return (
    <group dispose={null} position={[0, 0, -0.25]}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        scale={[0.49, 0.255, 1.7]}
        position={[0, 0.13, 0.13]}
      />
      <mesh
        geometry={nodes.Cube_1.geometry}
        material={nodes.Cube_1.material}
        scale={[0.49, 0.255, 1.7]}
        position={[0, 0.13, 0.13]}
      />
      <mesh
        geometry={nodes.MN_Wireframe.geometry}
        material={nodes.MN_Wireframe.material}
        scale={[0.525, 0.275, 1.775]}
        material-toneMapped={false}
        material-emissiveIntensity={3.65}
        onAfterRender={() => onAfterRender?.()}
      />
    </group>
  )
}

const MNModel = (props: Props) => {
  const { onAfterRender } = props

  const [dpr, setDpr] = useState(1.25)

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 'calc(100svh - 4rem)',
        p: '0 !important',
        m: { xs: '2rem 1rem', lg: '2rem' },
        width: { xs: 'calc(100% - 2rem)', lg: 'calc(100% - 4rem)' },
        borderRadius: '1rem',
        backgroundImage:
          'radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#202124, #202124)',
      }}
    >
      <Canvas
        camera={{
          position: [2.5, 0, -1.5],
          filmOffset: -0.5,
        }}
        style={{ cursor: 'move' }}
        dpr={dpr}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(Math.min(dpr + 0.25, 1.5))}
          onDecline={() => setDpr(Math.max(dpr - 0.25, 0.75))}
        />
        <Suspense>
          <Model onAfterRender={() => onAfterRender?.()} />
          <Environment files={suspend(environment) as string} />
          <Preload all />
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
      <Typography
        color="secondary"
        variant="body1"
        letterSpacing={1.5}
        textAlign="right"
        display={{ xs: 'none', md: 'grid', lg: 'block' }}
        position="absolute"
        sx={{ inset: 'auto 0 0 auto', pb: '2rem', pr: '2rem' }}
        data-aos="fade"
        data-aos-delay="2000"
        data-aos-duration="2000"
      >
        <span>43.5505053°,&nbsp;</span>
        <span>-79.6662651°</span>
      </Typography>
    </Container>
  )
}

export default MNModel
