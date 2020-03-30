import { useState, useEffect } from 'react';

function usePersistedState(key, initialState) {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (!storageValue) {
      return initialState;
    }

    return JSON.parse(storageValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
