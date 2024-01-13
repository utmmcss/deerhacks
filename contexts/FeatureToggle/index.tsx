import { createContext, ReactNode, useContext, useState } from 'react'

const INITIAL_FEATURE_TOGGLES = {
  // DEV TOGGLES

  // Toggle for DeerHacks dashboard portal
  dashboard: process.env.NEXT_PUBLIC_TOGGLE_DASHBOARD === 'true',
  // Toggle for admin user status updates
  statusUpdates: process.env.NEXT_PUBLIC_TOGGLE_STATUS_UPDATES === 'true',

  // TIME BASED TOGGLES

  // Toggle for hacker registration period
  signupHacker: process.env.NEXT_PUBLIC_TOGGLE_SIGNUP_HACKER === 'true',
  // Toggle for volunteer registration period
  signupVolunteer: process.env.NEXT_PUBLIC_TOGGLE_SIGNUP_VOLUNTEER === 'true',
  // Toggle for mentor registration period
  signupMentor: process.env.NEXT_PUBLIC_TOGGLE_SIGNUP_MENTOR === 'true',
} as const

type FeatureToggleKey = keyof typeof INITIAL_FEATURE_TOGGLES
type FeatureToggles = { [key in FeatureToggleKey]: boolean }

type Props = {
  toggles: FeatureToggles
}

const FeatureToggleContext = createContext<Props | undefined>(undefined)

export const useFeatureToggle = () => {
  const context = useContext(FeatureToggleContext)
  if (!context) {
    throw new Error('useFeatureToggle must be used within FeatureToggleProvider')
  }
  return context
}

export const FeatureToggleProvider = (props: { children: ReactNode }) => {
  const [toggles] = useState<FeatureToggles>(INITIAL_FEATURE_TOGGLES)

  return (
    <FeatureToggleContext.Provider value={{ toggles }}>
      {props.children}
    </FeatureToggleContext.Provider>
  )
}
