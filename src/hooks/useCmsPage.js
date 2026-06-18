import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Reusable hook to subscribe to real-time updates for a CMS-managed page
 * @param {string} pageId Firestore document ID (e.g. 'home', 'about', 'services', 'wellness')
 * @param {Array} defaultSections Fallback layout sections if Firestore is empty/loading
 */
export default function useCmsPage(pageId, defaultSections) {
  const [sections, setSections] = useState(defaultSections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'pages', pageId);
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists() && docSnap.data().sections) {
          setSections(docSnap.data().sections);
        } else {
          setSections(defaultSections);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`CMS: Real-time sync failed for page "${pageId}":`, error);
        setSections(defaultSections);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [pageId, defaultSections]);

  return { sections, loading };
}
