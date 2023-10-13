import { createContext, ReactNode, useContext, useState } from 'react'

const INITIAL_FEATURE_TOGGLES = {
  registration: process.env.NEXT_PUBLIC_TOGGLE_REGISTRATION,
  mlh: process.env.NEXT_PUBLIC_TOGGLE_MLH,
} as const

type FeatureToggleKey = keyof typeof INITIAL_FEATURE_TOGGLES
type FeatureToggles = { [key in FeatureToggleKey]?: string }

type Props = {
  /**
   * Feature toggles are either undefined (feature is unreleased),
   * 'true' (feature is released), or 'false' (feature is released but disabled)
   */
  toggles: FeatureToggles
  setToggles: (toggles: FeatureToggles) => void
}

const FeatureToggleContext = createContext<Props | undefined>(undefined)

export const useFeatureToggle = () => {
  const context = useContext(FeatureToggleContext)
  if (context === undefined) {
    throw new Error('useFeatureToggle must be used within FeatureToggleProvider')
  }
  return context
}

export const FeatureToggleProvider = (props: { children: ReactNode }) => {
  const [toggles, setToggles] = useState<FeatureToggles>(INITIAL_FEATURE_TOGGLES)

  return (
    <FeatureToggleContext.Provider value={{ toggles, setToggles }}>
      {props.children}
    </FeatureToggleContext.Provider>
  )
}
