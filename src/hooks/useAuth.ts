import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ADMIN_EMAIL = 'financewithmehul@gmail.com';

export interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  claims: any;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState<any>(null);

  useEffect(() => {
    if (!auth) {
      console.warn('Firebase Auth is not initialized. Using fallback authentication.');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // Get custom claims (for admin role)
          const idTokenResult = await user.getIdTokenResult();
          setClaims(idTokenResult.claims);
        } catch (error) {
          console.error('Error fetching user claims:', error);
          setClaims(null);
        }
      } else {
        setClaims(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check admin status via custom claims first, fallback to email check
  const isAdmin = claims?.admin === true || user?.email === ADMIN_EMAIL;

  return {
    user,
    isAdmin,
    loading,
    claims,
  };
};
