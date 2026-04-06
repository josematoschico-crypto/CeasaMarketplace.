import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, onSnapshot, doc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Stall, StallProduct } from '../types/index';
import { STALLS as MOCK_STALLS, STALL_PRODUCTS as MOCK_STALL_PRODUCTS } from '../data/mock';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface StallsContextType {
  stalls: Stall[];
  stallProducts: StallProduct[];
  addStall: (newStall: Stall) => Promise<void>;
  addStallProduct: (newProduct: StallProduct) => Promise<void>;
  updateStallProduct: (updatedProduct: StallProduct) => Promise<void>;
  batchUpdateStallProducts: (products: StallProduct[]) => Promise<void>;
  setStallProductsForStall: (stallId: string, products: StallProduct[]) => void;
}

const StallsContext = createContext<StallsContextType | undefined>(undefined);

export function StallsProvider({ children }: { children: ReactNode }) {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [stallProducts, setStallProducts] = useState<StallProduct[]>([]);

  useEffect(() => {
    const unsubscribeStalls = onSnapshot(collection(db, 'stalls'), (snapshot) => {
      const stallsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Stall));
      if (stallsData.length === 0 && auth.currentUser) {
        // Seed with mock data if empty (only if authenticated)
        MOCK_STALLS.forEach(async (stall) => {
          try {
            await setDoc(doc(db, 'stalls', stall.id), stall);
          } catch (error) {
            console.warn('Failed to seed stalls:', error);
          }
        });
      } else {
        setStalls(stallsData);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'stalls');
    });

    const unsubscribeProducts = onSnapshot(collection(db, 'stallProducts'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StallProduct));
      if (productsData.length === 0 && auth.currentUser) {
        // Seed with mock data if empty (only if authenticated)
        MOCK_STALL_PRODUCTS.forEach(async (product) => {
          try {
            await setDoc(doc(db, 'stallProducts', product.id), product);
          } catch (error) {
            console.warn('Failed to seed stallProducts:', error);
          }
        });
      } else {
        setStallProducts(productsData);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'stallProducts');
    });

    return () => {
      unsubscribeStalls();
      unsubscribeProducts();
    };
  }, []);

  const addStall = async (newStall: Stall) => {
    try {
      await setDoc(doc(db, 'stalls', newStall.id), newStall);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `stalls/${newStall.id}`);
    }
  };

  const addStallProduct = async (newProduct: StallProduct) => {
    try {
      await setDoc(doc(db, 'stallProducts', newProduct.id), newProduct);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `stallProducts/${newProduct.id}`);
    }
  };

  const updateStallProduct = async (updatedProduct: StallProduct) => {
    try {
      await setDoc(doc(db, 'stallProducts', updatedProduct.id), updatedProduct);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `stallProducts/${updatedProduct.id}`);
    }
  };

  const batchUpdateStallProducts = async (products: StallProduct[]) => {
    for (const product of products) {
      try {
        await setDoc(doc(db, 'stallProducts', product.id), product);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `stallProducts/${product.id}`);
      }
    }
  };

  const setStallProductsForStall = (stallId: string, products: StallProduct[]) => {
    // This is handled by onSnapshot, but we can keep it for immediate UI update if needed
    setStallProducts(prev => {
      const otherStallsProducts = prev.filter(p => p.stallId !== stallId);
      return [...products, ...otherStallsProducts];
    });
  };

  return (
    <StallsContext.Provider value={{ 
      stalls, 
      stallProducts, 
      addStall, 
      addStallProduct, 
      updateStallProduct,
      batchUpdateStallProducts,
      setStallProductsForStall
    }}>
      {children}
    </StallsContext.Provider>
  );
}

export function useStalls() {
  const context = useContext(StallsContext);
  if (context === undefined) {
    throw new Error('useStalls must be used within a StallsProvider');
  }
  return context;
}
