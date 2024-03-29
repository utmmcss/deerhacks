import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { useToast } from '@/contexts/Toast'
import { Environment, OrbitControls, PerformanceMonitor, Preload, useGLTF } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, ToneMapping } from '@react-three/postprocessing'
import { suspend } from 'suspend-react'
import { Mesh } from 'three'
import { GLTF, GLTFLoader } from 'three-stdlib'

extend({ OrbitControls })

type Props = {
  onAfterRender?: () => void
}

type ModelProps = Props & {
  onError: () => void
}

const environment = import('@pmndrs/assets/hdri/city.exr').then((module) => module.default)
useGLTF.preload('./mn.glb')

const Model = (props: ModelProps) => {
  const { onAfterRender, onError } = props

  const [model, setModel] = useState<GLTF>()

  useEffect(() => {
    const loadModel = async () => {
      try {
        const gltf = await new GLTFLoader().loadAsync('./mn.glb')
        setModel(gltf)
      } catch (err) {
        onError()
      }
    }
    loadModel()
  }, [onError])

  if (!model) return null

  const MN_Cube = model.scenes[0].children[0].children[0] as Mesh
  const MN_Cube_1 = model.scenes[0].children[0].children[1] as Mesh
  const MN_Wireframe = model.scenes[0].children[1] as Mesh

  return (
    <group dispose={null} position={[0, 0, -0.25]}>
      <mesh
        geometry={MN_Cube.geometry}
        material={MN_Cube.material}
        scale={[0.49, 0.255, 1.7]}
        position={[0, 0.13, 0.13]}
      />
      <mesh
        geometry={MN_Cube_1.geometry}
        material={MN_Cube_1.material}
        scale={[0.49, 0.255, 1.7]}
        position={[0, 0.13, 0.13]}
      />
      <mesh
        geometry={MN_Wireframe.geometry}
        material={MN_Wireframe.material}
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
  const [fallback, setFallback] = useState(false)
  const [hasHWA] = useState(() => {
    const test = (force: boolean) => {
      if (typeof OffscreenCanvas === 'undefined') return ''
      const canvas = new OffscreenCanvas(200, 200)
      const ctx = canvas.getContext('2d', { willReadFrequently: force })
      if (!ctx) return ''
      ctx.moveTo(0, 0), ctx.lineTo(120, 121)
      ctx.stroke()
      return ctx.getImageData(0, 0, 200, 200).data.join()
    }

    const isVendorApple = navigator.vendor && navigator.vendor.indexOf('Apple') > -1
    const isNotCriOS = navigator.userAgent && navigator.userAgent.indexOf('CriOS') === -1
    const isNotFxiOS = navigator.userAgent && navigator.userAgent.indexOf('FxiOS') === -1

    const isSafari = isVendorApple && isNotCriOS && isNotFxiOS
    const result = isSafari || test(true) !== test(false)

    return result
  })

  const { setToast } = useToast()

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
      {hasHWA && !fallback ? (
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
            <Model onAfterRender={() => onAfterRender?.()} onError={() => setFallback(true)} />
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
      ) : (
        <Container data-aos="zoom-out" data-aos-duration="2000">
          <Image
            src="/icons/neon.png"
            alt="DeerHacks Glow"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'min(100%, 300px)', height: 'auto' }}
            priority
            onLoad={() => {
              onAfterRender?.()
              if (hasHWA) return
              setToast({
                type: 'info',
                message: (
                  <>
                    Interacting with the 3D model is disabled for either performance, browser
                    support, or hardware acceleration is disabled.{' '}
                    <Link
                      rel="noopener"
                      target="_blank"
                      underline="always"
                      href="https://google.com/search?q=Enable+Browser+Hardware+Acceleration"
                      sx={{ color: 'primary.main', opacity: 0.9 }}
                    >
                      Learn More
                    </Link>
                  </>
                ),
                autoHide: false,
              })
            }}
          />
        </Container>
      )}
      <Typography
        color="text.secondary"
        letterSpacing={1.5}
        textAlign="right"
        display={{ xs: 'none', md: 'grid', lg: 'block' }}
        position="absolute"
        p="0 2rem 2rem 0"
        sx={{ inset: 'auto 0 0 auto' }}
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
