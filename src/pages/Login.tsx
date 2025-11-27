import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/market");
    } catch (error) {
      toast({
        title: "Premium Access Only",
        description: "Please message us on WhatsApp to get login credentials.",
        variant: "destructive",
      });
    }
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919082309058?text=Hi%2C%20I'm%20interested%20in%20getting%20premium%20access%20to%20StockMarket.io",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md shadow-lg border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login to Premium Access</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">Want access?</p>
            <Button
              onClick={openWhatsApp}
              variant="secondary"
              className="mt-2 w-full"
            >
              Message Us on WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
