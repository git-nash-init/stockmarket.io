import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={heroImage}
          alt="Stock Market Education"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-soft">
            <TrendingUp className="h-4 w-4" />
            India's Leading Stock Market Education Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Master the <span className="gradient-text">Stock Market</span>
            <br />
            with Expert Guidance
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn technical analysis, options trading, and risk management
            through our comprehensive modules. Get daily market insights and
            support levels to trade with confidence.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/start-learning">
              <Button
                size="lg"
                className="bg-gradient-primary hover-lift text-lg px-8 py-6 shadow-soft"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
            </Link>

            <a
              href="https://chat.whatsapp.com/HLdFAMVdTlU22KsrdVsgOc?mode=ems_copy_c"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="hover-lift text-lg px-8 py-6 border-2"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Learning Modules</div>
            </div>
            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-3xl font-bold text-primary mb-2">2000+</div>
              <div className="text-muted-foreground">Students Taught</div>
            </div>
            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-3xl font-bold text-primary mb-2">₹0</div>
              <div className="text-muted-foreground">Course Fee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-primary rounded-full opacity-10 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  );
};

export default Hero;
