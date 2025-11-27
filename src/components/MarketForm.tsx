// src/components/MarketForm.tsx
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MarketForm = () => {
  const [niftyResistance, setNiftyResistance] = useState("");
  const [niftySupport, setNiftySupport] = useState("");
  const [niftyTarget, setNiftyTarget] = useState("");
  const [niftyStoploss, setNiftyStoploss] = useState("");
  const [bankniftyResistance, setBankniftyResistance] = useState("");
  const [bankniftySupport, setBankniftySupport] = useState("");
  const [bankniftyTarget, setBankniftyTarget] = useState("");
  const [bankniftyStoploss, setBankniftyStoploss] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const marketData = {
        niftyResistance,
        niftySupport,
        niftyTarget,
        niftyStoploss,
        bankniftyResistance,
        bankniftySupport,
        bankniftyTarget,
        bankniftyStoploss,
        sentiment,
        lastUpdated: new Date().toISOString(),
      };

      await setDoc(doc(db, "marketData", "daily"), marketData);
      
      toast({
        title: "Market data updated successfully!",
        description: "The daily market insights have been updated.",
      });

      // Reset form
      setNiftyResistance("");
      setNiftySupport("");
      setNiftyTarget("");
      setNiftyStoploss("");
      setBankniftyResistance("");
      setBankniftySupport("");
      setBankniftyTarget("");
      setBankniftyStoploss("");
      setSentiment("");
    } catch (error) {
      console.error("Error updating market data:", error);
      toast({
        title: "Error updating market data",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">NIFTY 50 Levels</h3>
              <Input
                placeholder="Resistance Level"
                value={niftyResistance}
                onChange={(e) => setNiftyResistance(e.target.value)}
                required
              />
              <Input
                placeholder="Support Level"
                value={niftySupport}
                onChange={(e) => setNiftySupport(e.target.value)}
                required
              />
              <Input
                placeholder="Target Level"
                value={niftyTarget}
                onChange={(e) => setNiftyTarget(e.target.value)}
                required
              />
              <Input
                placeholder="Stoploss Level"
                value={niftyStoploss}
                onChange={(e) => setNiftyStoploss(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">BANKNIFTY Levels</h3>
              <Input
                placeholder="Resistance Level"
                value={bankniftyResistance}
                onChange={(e) => setBankniftyResistance(e.target.value)}
                required
              />
              <Input
                placeholder="Support Level"
                value={bankniftySupport}
                onChange={(e) => setBankniftySupport(e.target.value)}
                required
              />
              <Input
                placeholder="Target Level"
                value={bankniftyTarget}
                onChange={(e) => setBankniftyTarget(e.target.value)}
                required
              />
              <Input
                placeholder="Stoploss Level"
                value={bankniftyStoploss}
                onChange={(e) => setBankniftyStoploss(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Market Sentiment</h3>
            <Textarea
              placeholder="Today's market sentiment and analysis..."
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Market Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MarketForm;
