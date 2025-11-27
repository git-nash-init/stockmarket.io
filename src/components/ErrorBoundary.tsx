import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <Card className="border-0 shadow-soft bg-gradient-card">
              <CardContent className="p-12 text-center">
                {/* Error Icon */}
                <div className="mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="h-16 w-16 text-destructive" />
                  </div>
                </div>

                {/* Error Message */}
                <h1 className="text-3xl font-bold mb-4 text-destructive">
                  Something went wrong
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  We encountered an unexpected error. Please try refreshing the
                  page or contact support if the problem persists.
                </p>

                {/* Error Details */}
                {this.state.error && (
                  <div className="bg-muted/50 rounded-lg p-4 mb-8 text-sm text-left">
                    <p className="text-muted-foreground mb-2 font-semibold">
                      Error Details:
                    </p>
                    <code className="bg-background px-3 py-1 rounded text-destructive font-mono text-xs break-all">
                      {this.state.error.message}
                    </code>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover-lift text-lg px-8 py-6 shadow-soft"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Refresh Page
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="hover-lift text-lg px-8 py-6 border-2"
                    asChild
                  >
                    <Link to="/">
                      <Home className="mr-2 h-5 w-5" />
                      Go Home
                    </Link>
                  </Button>
                </div>

                {/* Contact Support */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-muted-foreground mb-4">
                    Still having issues?
                  </p>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
