import { useState, useEffect } from 'react';

export const useSessionStorage = (key: string, defaultValue: any) => {
  const getSessionStorageOrDefault = () => {
    if (typeof window !== 'undefined') {
        const stored = window.sessionStorage.getItem(key);
        if (!stored) {
          window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
        return JSON.parse(stored);
    }
    
  };

  const [value, setValue] = useState(
    getSessionStorageOrDefault(),
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};
