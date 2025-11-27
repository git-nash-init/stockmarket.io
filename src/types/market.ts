// src/types/market.ts
export interface MarketData {
  id?: string;
  date: string;
  
  // NIFTY 50 Levels
  niftyResistance: string;
  niftySupport: string;
  niftyTarget: string;
  niftyStoploss: string;
  
  // BANKNIFTY Levels
  bankniftyResistance: string;
  bankniftySupport: string;
  bankniftyTarget: string;
  bankniftyStoploss: string;
  
  // Market Sentiment
  marketSentiment: string;
  
  // Metadata
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
}

export interface MarketFormData {
  date: string;
  niftyResistance: string;
  niftySupport: string;
  niftyTarget: string;
  niftyStoploss: string;
  bankniftyResistance: string;
  bankniftySupport: string;
  bankniftyTarget: string;
  bankniftyStoploss: string;
  marketSentiment: string;
}

export interface MarketDataValidation {
  isValid: boolean;
  errors: string[];
}
