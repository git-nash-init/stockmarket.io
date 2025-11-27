import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardContent className="p-12 text-center">
            {/* 404 Icon */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-16 w-16 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-destructive-foreground font-bold text-2xl">
                    !
                  </span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, you can always find your way back!
            </p>

            {/* Attempted Path */}
            <div className="bg-muted/50 rounded-lg p-4 mb-8 text-sm">
              <p className="text-muted-foreground mb-2">You tried to access:</p>
              <code className="bg-background px-3 py-1 rounded text-primary font-mono">
                {location.pathname}
              </code>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-primary hover-lift text-lg px-8 py-6 shadow-soft"
                asChild
              >
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hover-lift text-lg px-8 py-6 border-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-muted-foreground mb-4">
                Or try these popular pages:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/blog">Blog</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/market">Market</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/contact">Contact</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/faq">FAQ</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
