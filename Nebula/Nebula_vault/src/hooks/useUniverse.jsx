
import { useState, useEffect, useRef } from "react";
import { ref, onChildAdded, onValue, off } from "firebase/database";
import { db } from "../firebase";

export function useUniverse(universeName) {
  const [items, setItems] = useState([]);
  const itemsRef = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const universeRef = ref(db, `universes/${universeName}`);

    const handleValue = (snapshot) => {
      const data = snapshot.val() || {};
      const arr = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
      setItems(arr);
      itemsRef.current = arr;
      setLoading(false);
    };

    onValue(universeRef, handleValue);

    return () => off(universeRef, "value", handleValue);
  }, [universeName]);

  return { items, loading };
}
