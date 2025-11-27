// src/services/marketService.ts
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp,
  onSnapshot,
  DocumentReference,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MarketData, MarketFormData, MarketDataValidation } from '@/types/market';

export class MarketService {
  private static readonly COLLECTION_NAME = 'marketData';
  private static readonly DAILY_DOC_ID = 'latest';

  /**
   * Validate market form data
   */
  static validateMarketData(data: MarketFormData): MarketDataValidation {
    const errors: string[] = [];

    if (!data.date) {
      errors.push('Date is required');
    }

    // Check if at least one field is filled
    const hasAnyData = [
      data.niftyResistance,
      data.niftySupport,
      data.niftyTarget,
      data.niftyStoploss,
      data.bankniftyResistance,
      data.bankniftySupport,
      data.bankniftyTarget,
      data.bankniftyStoploss,
      data.marketSentiment
    ].some(field => field && field.trim().length > 0);

    if (!hasAnyData) {
      errors.push('At least one field must be filled');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Save market data to Firebase
   */
  static async saveMarketData(formData: MarketFormData, userId?: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase database is not initialized');
    }

    // Validate data
    const validation = this.validateMarketData(formData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    try {
      const now = Timestamp.now();
      const marketData: MarketData = {
        date: formData.date,
        niftyResistance: formData.niftyResistance.trim(),
        niftySupport: formData.niftySupport.trim(),
        niftyTarget: formData.niftyTarget.trim(),
        niftyStoploss: formData.niftyStoploss.trim(),
        bankniftyResistance: formData.bankniftyResistance.trim(),
        bankniftySupport: formData.bankniftySupport.trim(),
        bankniftyTarget: formData.bankniftyTarget.trim(),
        bankniftyStoploss: formData.bankniftyStoploss.trim(),
        marketSentiment: formData.marketSentiment.trim(),
        updatedAt: now,
        createdBy: userId
      };

      // Save to both locations for backward compatibility and real-time updates
      const batch = await Promise.all([
        // Save to date-specific document for historical data
        setDoc(doc(db, this.COLLECTION_NAME, formData.date), {
          ...marketData,
          createdAt: now
        }, { merge: true }),
        
        // Save to latest document for quick access
        setDoc(doc(db, this.COLLECTION_NAME, this.DAILY_DOC_ID), marketData, { merge: true })
      ]);

      console.log('Market data saved successfully to both locations');
    } catch (error) {
      console.error('Error saving market data:', error);
      throw new Error(`Failed to save market data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get market data for a specific date
   */
  static async getMarketDataByDate(date: string): Promise<MarketData | null> {
    if (!db) {
      throw new Error('Firebase database is not initialized');
    }

    try {
      const docRef = doc(db, this.COLLECTION_NAME, date);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MarketData;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching market data by date:', error);
      throw new Error(`Failed to fetch market data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get latest market data
   */
  static async getLatestMarketData(): Promise<MarketData | null> {
    if (!db) {
      throw new Error('Firebase database is not initialized');
    }

    try {
      // First try to get from latest document
      const latestDocRef = doc(db, this.COLLECTION_NAME, this.DAILY_DOC_ID);
      const latestDocSnap = await getDoc(latestDocRef);
      
      if (latestDocSnap.exists()) {
        return { id: latestDocSnap.id, ...latestDocSnap.data() } as MarketData;
      }

      // Fallback: get today's date
      const today = new Date().toISOString().split('T')[0];
      return await this.getMarketDataByDate(today);
    } catch (error) {
      console.error('Error fetching latest market data:', error);
      throw new Error(`Failed to fetch latest market data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Subscribe to real-time market data updates
   */
  static subscribeToMarketData(
    callback: (data: MarketData | null) => void,
    date?: string
  ): Unsubscribe {
    if (!db) {
      throw new Error('Firebase database is not initialized');
    }

    const docId = date || this.DAILY_DOC_ID;
    const docRef = doc(db, this.COLLECTION_NAME, docId);

    return onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          callback({ id: doc.id, ...doc.data() } as MarketData);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Error in market data subscription:', error);
        callback(null);
      }
    );
  }

  /**
   * Get recent market data (for analytics/history)
   */
  static async getRecentMarketData(limitCount = 10): Promise<MarketData[]> {
    if (!db) {
      throw new Error('Firebase database is not initialized');
    }

    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('updatedAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const marketData: MarketData[] = [];
      
      querySnapshot.forEach((doc) => {
        if (doc.id !== this.DAILY_DOC_ID) { // Exclude the latest document
          marketData.push({ id: doc.id, ...doc.data() } as MarketData);
        }
      });
      
      return marketData;
    } catch (error) {
      console.error('Error fetching recent market data:', error);
      throw new Error(`Failed to fetch recent market data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
