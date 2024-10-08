import { useRef } from "react";
import { useEffect, useState } from 'react';
const PREFIX = 'local-';

/**
 * 使用localstorage
 */
export function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const value = useRef(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value.current));
  }, [prefixedKey, value.current]);
  return [value.current, setValue];
}