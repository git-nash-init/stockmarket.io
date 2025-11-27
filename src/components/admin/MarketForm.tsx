import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { MarketService } from '@/services/marketService';
import { MarketFormData } from '@/types/market';
import { useAuth } from '@/hooks/useAuth';

const MarketForm: React.FC = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // NIFTY 50 Levels
  const [niftyResistance, setNiftyResistance] = useState('');
  const [niftySupport, setNiftySupport] = useState('');
  const [niftyTarget, setNiftyTarget] = useState('');
  const [niftyStoploss, setNiftyStoploss] = useState('');
  
  // BANKNIFTY Levels
  const [bankniftyResistance, setBankniftyResistance] = useState('');
  const [bankniftySupport, setBankniftySupport] = useState('');
  const [bankniftyTarget, setBankniftyTarget] = useState('');
  const [bankniftyStoploss, setBankniftyStoploss] = useState('');
  
  // Market Sentiment
  const [marketSentiment, setMarketSentiment] = useState('');
  
  const [preview, setPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper function to clear form fields
  const clearFormFields = () => {
    setNiftyResistance('');
    setNiftySupport('');
    setNiftyTarget('');
    setNiftyStoploss('');
    setBankniftyResistance('');
    setBankniftySupport('');
    setBankniftyTarget('');
    setBankniftyStoploss('');
    setMarketSentiment('');
  };

  // Load existing data when date changes
  useEffect(() => {
    const loadExistingData = async () => {
      if (!date) return;
      
      try {
        setLoading(true);
        const existingData = await MarketService.getMarketDataByDate(date);
        
        if (existingData) {
          // NIFTY 50 fields
          setNiftyResistance(existingData.niftyResistance || '');
          setNiftySupport(existingData.niftySupport || '');
          setNiftyTarget(existingData.niftyTarget || '');
          setNiftyStoploss(existingData.niftyStoploss || '');
          
          // BANKNIFTY fields
          setBankniftyResistance(existingData.bankniftyResistance || '');
          setBankniftySupport(existingData.bankniftySupport || '');
          setBankniftyTarget(existingData.bankniftyTarget || '');
          setBankniftyStoploss(existingData.bankniftyStoploss || '');
          
          // Market sentiment
          setMarketSentiment(existingData.marketSentiment || '');
          
          toast.success('Loaded existing market data for this date');
        } else {
          // Clear fields for new date
          clearFormFields();
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
        toast.error('Failed to load existing data');
        clearFormFields();
      } finally {
        setLoading(false);
      }
    };

    loadExistingData();
  }, [date]);

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      const selectedDate = date || new Date().toISOString().split('T')[0];
      const formData: MarketFormData = {
        date: selectedDate,
        niftyResistance,
        niftySupport,
        niftyTarget,
        niftyStoploss,
        bankniftyResistance,
        bankniftySupport,
        bankniftyTarget,
        bankniftyStoploss,
        marketSentiment,
      };

      await MarketService.saveMarketData(formData, user?.uid);
      
      toast.success('✅ Market data saved successfully! Premium market page will update automatically.');
      setPreview(false);
    } catch (error) {
      console.error('Error submitting market update:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save market update';
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="my-6">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">Post Market Update</h2>

        <div className="flex items-center gap-4">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="max-w-sm"
          />
          {loading && <span className="text-sm text-muted-foreground">Loading existing data...</span>}
        </div>

        {/* NIFTY 50 Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-600">📈 NIFTY 50 Levels</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Resistance Level"
              value={niftyResistance}
              onChange={(e) => setNiftyResistance(e.target.value)}
            />
            <Input
              placeholder="Support Level"
              value={niftySupport}
              onChange={(e) => setNiftySupport(e.target.value)}
            />
            <Input
              placeholder="Target Level"
              value={niftyTarget}
              onChange={(e) => setNiftyTarget(e.target.value)}
            />
            <Input
              placeholder="Stop Loss Level"
              value={niftyStoploss}
              onChange={(e) => setNiftyStoploss(e.target.value)}
            />
          </div>
        </div>

        {/* BANKNIFTY Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-600">🏦 BANKNIFTY Levels</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Resistance Level"
              value={bankniftyResistance}
              onChange={(e) => setBankniftyResistance(e.target.value)}
            />
            <Input
              placeholder="Support Level"
              value={bankniftySupport}
              onChange={(e) => setBankniftySupport(e.target.value)}
            />
            <Input
              placeholder="Target Level"
              value={bankniftyTarget}
              onChange={(e) => setBankniftyTarget(e.target.value)}
            />
            <Input
              placeholder="Stop Loss Level"
              value={bankniftyStoploss}
              onChange={(e) => setBankniftyStoploss(e.target.value)}
            />
          </div>
        </div>

        {/* Market Sentiment Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-600">💭 Market Sentiment</h3>
          <Textarea
            placeholder="Today's market sentiment (Bullish/Bearish outlook, key factors, market mood)"
            value={marketSentiment}
            onChange={(e) => setMarketSentiment(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setPreview(!preview)}>
            {preview ? 'Edit' : 'Preview'}
          </Button>
          <Button disabled={submitting} onClick={handleSubmit}>
            {submitting ? 'Submitting...' : 'Submit Update'}
          </Button>
        </div>

        {preview && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Live Preview:</h3>
            <div className="prose max-w-none space-y-4">
              <p><strong>Date:</strong> {date}</p>
              
              {/* NIFTY 50 Preview */}
              {(niftyResistance || niftySupport || niftyTarget || niftyStoploss) && (
                <div>
                  <h4 className="text-lg font-semibold text-yellow-600 mb-2">📈 NIFTY 50 Levels</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {niftyResistance && <p><strong>Resistance:</strong> {niftyResistance}</p>}
                    {niftySupport && <p><strong>Support:</strong> {niftySupport}</p>}
                    {niftyTarget && <p><strong>Target:</strong> {niftyTarget}</p>}
                    {niftyStoploss && <p><strong>Stop Loss:</strong> {niftyStoploss}</p>}
                  </div>
                </div>
              )}
              
              {/* BANKNIFTY Preview */}
              {(bankniftyResistance || bankniftySupport || bankniftyTarget || bankniftyStoploss) && (
                <div>
                  <h4 className="text-lg font-semibold text-yellow-600 mb-2">🏦 BANKNIFTY Levels</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {bankniftyResistance && <p><strong>Resistance:</strong> {bankniftyResistance}</p>}
                    {bankniftySupport && <p><strong>Support:</strong> {bankniftySupport}</p>}
                    {bankniftyTarget && <p><strong>Target:</strong> {bankniftyTarget}</p>}
                    {bankniftyStoploss && <p><strong>Stop Loss:</strong> {bankniftyStoploss}</p>}
                  </div>
                </div>
              )}
              
              {/* Market Sentiment Preview */}
              {marketSentiment && (
                <div>
                  <h4 className="text-lg font-semibold text-yellow-600 mb-2">💭 Market Sentiment</h4>
                  <p className="whitespace-pre-line">{marketSentiment}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketForm;
