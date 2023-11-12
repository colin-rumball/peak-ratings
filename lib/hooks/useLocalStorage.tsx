import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue?: T) {
  const isClient = typeof window !== "undefined"; // Check if we're on the client side

  // Get the current value from localStorage, or use the initialValue if it's not set
  const [storedValue, setStoredValue] = useState<T | undefined>();

  useEffect(() => {
    if (isClient) {
      try {
        const item = localStorage.getItem(key);
        const ret = item ? (JSON.parse(item) as T) : initialValue;
        setStoredValue(ret as T);
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        setStoredValue(initialValue as T);
      }
    } else {
      setStoredValue(initialValue as T); // On the server, return the initial value
    }
  }, []);

  // Update localStorage whenever the state changes (only on the client side)
  useEffect(() => {
    if (isClient) {
      try {
        // TODO: implement correctly
        // localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, []);

  return storedValue;
}

export default useLocalStorage;
