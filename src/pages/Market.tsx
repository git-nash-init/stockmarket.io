import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Shield, 
  Target, 
  AlertTriangle, 
  Activity,
  RefreshCcw,
  Clock,
  BarChart3,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { MarketService } from '@/services/marketService';
import { MarketData } from '@/types/market';
import { useAuth } from '@/hooks/useAuth';


const Market = () => {
  const { user } = useAuth();
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Manual refresh function
  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const marketData = await MarketService.getLatestMarketData();
      
      if (marketData) {
        console.log("Fetched Market Data:", marketData);
        setData(marketData);
        setLastRefresh(new Date());
        toast({ title: "📈 Market data loaded successfully" });
      } else {
        console.log("No market data available.");
        setError("No market data available. Please check again later.");
        toast({ title: "⚠️ No market data available for today. Please check again later." });
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
      const errorMessage = error instanceof Error ? error.message : "Error fetching market data";
      setError(errorMessage);
      toast({ title: `❌ ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;
    
    console.log('Setting up real-time market data subscription...');
    setLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = MarketService.subscribeToMarketData(
      (marketData) => {
        console.log('Received real-time market data update:', marketData);
        
        if (marketData) {
          setData(marketData);
          setLastRefresh(new Date());
          setError(null);
          
          // Show update notification only after initial load
          if (!initialLoad) {
            toast({ title: "🔄 Market data updated automatically" });
          }
        } else {
          console.log('No market data received from subscription');
          setData(null);
          setError('No market data available. Admin needs to add market data first.');
        }
        
        setLoading(false);
        setInitialLoad(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      console.log('Cleaning up market data subscription');
      unsubscribe();
    };
  }, [user, initialLoad]); // Only depend on user and initialLoad

  const getSentimentBadgeColor = (sentiment: string) => {
    if (sentiment.toLowerCase().includes('bullish')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (sentiment.toLowerCase().includes('bearish')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  };

  // Loading State
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-card rounded-full p-4 shadow-lg">
              <RefreshCcw className="animate-spin w-8 h-8 text-blue-600" />
            </div>
            <span className="text-xl font-semibold text-foreground">Loading Premium Market Insights</span>
            <span className="text-sm text-muted-foreground">Fetching real-time market data...</span>
          </div>
        </div>
      </div>
    );
  }

  // If data is not available
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center bg-card rounded-2xl shadow-xl p-12 max-w-md mx-auto">
            <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No Market Data Available</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">Unable to fetch the latest market insights. Please check your connection and try again.</p>
            <Button onClick={fetchMarketData} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold shadow-lg">
              <RefreshCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 dark:from-slate-900 dark:to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 text-center lg:text-left">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  Premium Access
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Market Analysis
                <span className="block text-blue-300">Dashboard</span>
              </h1>
              <p className="text-xl opacity-90 max-w-lg mx-auto lg:mx-0">
                Real-time insights and analysis for NIFTY 50 & BANKNIFTY with professional trading levels
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <p className="text-sm opacity-75 mb-2">Market Sentiment</p>
                  <Badge className={`${getSentimentBadgeColor(data.marketSentiment)} px-4 py-2 text-sm font-semibold`}>
                    <Activity className="w-4 h-4 mr-2" />
                    {data.marketSentiment}
                  </Badge>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-6 py-3"
                onClick={fetchMarketData}
                disabled={loading}
              >
                <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* NIFTY 50 Card */}
          <Card className="bg-card shadow-2xl border-0 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-3xl">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white pb-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-3xl font-bold flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <BarChart3 className="w-7 h-7" />
                    </div>
                    NIFTY 50
                  </CardTitle>
                  <Badge className="bg-white/20 text-white border-0 px-3 py-1">NSE</Badge>
                </div>
                <p className="text-emerald-100 text-sm">National Stock Exchange</p>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-950 p-6 rounded-xl border border-green-100 dark:border-green-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">Resistance</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{data.niftyResistance}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950 p-6 rounded-xl border border-red-100 dark:border-red-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg mr-3">
                      <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-sm font-semibold text-red-700 dark:text-red-300">Support</span>
                  </div>
                  <p className="text-2xl font-bold text-red-800 dark:text-red-200">{data.niftySupport}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-xl border border-blue-100 dark:border-blue-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Target</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{data.niftyTarget}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-xl border border-amber-100 dark:border-amber-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-lg mr-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Stop Loss</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">{data.niftyStoploss}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BANKNIFTY Card */}
          <Card className="bg-card shadow-2xl border-0 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-3xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white pb-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-3xl font-bold flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <BarChart3 className="w-7 h-7" />
                    </div>
                    BANKNIFTY
                  </CardTitle>
                  <Badge className="bg-white/20 text-white border-0 px-3 py-1">NSE</Badge>
                </div>
                <p className="text-purple-100 text-sm">Bank Nifty Index</p>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-950 p-6 rounded-xl border border-green-100 dark:border-green-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">Resistance</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{data.bankniftyResistance}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950 p-6 rounded-xl border border-red-100 dark:border-red-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg mr-3">
                      <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-sm font-semibold text-red-700 dark:text-red-300">Support</span>
                  </div>
                  <p className="text-2xl font-bold text-red-800 dark:text-red-200">{data.bankniftySupport}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-xl border border-blue-100 dark:border-blue-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Target</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{data.bankniftyTarget}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-xl border border-amber-100 dark:border-amber-800 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-lg mr-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Stop Loss</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">{data.bankniftyStoploss}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Sentiment Section */}
        <Card className="bg-card shadow-xl border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-gray-700 dark:from-slate-700 dark:to-gray-800 text-white">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Activity className="w-6 h-6 mr-3" />
              Market Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-lg leading-relaxed text-foreground">{data.marketSentiment}</p>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button 
            onClick={fetchMarketData} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
          >
            <RefreshCcw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          
          <Link to="/">
            <Button 
              variant="outline" 
              className="border-2 border-border hover:border-muted-foreground text-foreground px-8 py-3 text-lg font-semibold shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Investment Disclaimer</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                This analysis is for educational purposes only and should not be considered as financial advice. 
                Please consult with a qualified financial advisor before making investment decisions. 
                Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
