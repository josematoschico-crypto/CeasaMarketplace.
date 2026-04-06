import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  role: 'buyer' | 'seller' | 'driver';
  barracaId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (whatsapp: string, password: string) => Promise<void>;
  register: (whatsapp: string, password: string, name: string, barracaId: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getEmailFromWhatsapp = (whatsapp: string) => {
  const digits = whatsapp.replace(/\D/g, '');
  return `${digits}@ceasamarket.com`;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            setUser(null);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (whatsapp: string, password: string) => {
    const email = getEmailFromWhatsapp(whatsapp);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (whatsapp: string, password: string, name: string, barracaId: string) => {
    const email = getEmailFromWhatsapp(whatsapp);
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    
    const newUser: User = {
      id: firebaseUser.uid,
      name,
      email: '',
      whatsapp,
      role: 'seller',
      barracaId,
    };

    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      setUser(newUser);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
