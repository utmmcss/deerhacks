import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const INITIAL_FEATURE_TOGGLES = {
  registration: false,
  dashboard: false,
} as const;

type FeatureToggleKey = keyof typeof INITIAL_FEATURE_TOGGLES;
type FeatureToggles = { [key in FeatureToggleKey]: boolean };

type Props = {
  toggles: FeatureToggles;
};

const FeatureToggleContext = createContext<Props | undefined>(undefined);

export const useFeatureToggle = () => {
  const context = useContext(FeatureToggleContext);
  if (context === undefined) {
    throw new Error('useFeatureToggle must be used within FeatureToggleProvider');
  }
  return context;
};

export const FeatureToggleProvider = (props: { children: ReactNode }) => {
  const [toggles, setToggles] = useState<FeatureToggles>(INITIAL_FEATURE_TOGGLES);

  useEffect(() => {
    setToggles({
      registration: process.env.NEXT_PUBLIC_TOGGLE_REGISTRATION === 'true',
      dashboard: process.env.NEXT_PUBLIC_TOGGLE_DASHBOARD === 'true',
    });
  }, []);

  return (
    <FeatureToggleContext.Provider value={{ toggles }}>
      {props.children}
    </FeatureToggleContext.Provider>
  );
};
