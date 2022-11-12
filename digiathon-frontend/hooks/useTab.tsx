import { useCallback, useState } from 'react';

export function useTab<T>(initialValue: T) {
  const [tabState, setTabState] = useState<T>(initialValue);

  const setTab = useCallback((tab: T) => {
    setTabState(tab);
  }, []);

  return { setTab, tab: tabState };
}
