import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Reusable hook to subscribe to real-time updates for global CMS settings
 * @param {string} settingsId Firestore settings document ID (e.g. 'navbar', 'footer')
 * @param {Object} defaultSettings Fallback settings if Firestore is empty/loading
 */
export default function useCmsSettings(settingsId, defaultSettings) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'settings', settingsId);
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        } else {
          setSettings(defaultSettings);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`CMS: Settings sync failed for "${settingsId}":`, error);
        setSettings(defaultSettings);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [settingsId, defaultSettings]);

  return { settings, loading };
}
