import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  ArrowUp,
  Shield,
  Clock,
  Target
} from 'lucide-react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

// Firebase imports - using existing Firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  state: string;
}

const StartLearning: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    state: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Self-healing DOM check on component mount
  useEffect(() => {
    performDOMSelfHeal();
    
    // Back to top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Self-healing algorithm: Checks for missing DOM elements and creates them
   * This ensures the page works even if some elements are missing
   */
  const performDOMSelfHeal = () => {
    const requiredElements = [
      { id: 'hero', tag: 'section', className: 'min-h-screen bg-gradient-hero flex items-center', parent: 'main' },
      { id: 'features', tag: 'section', className: 'py-20 bg-background', parent: 'main' },
      { id: 'testimonials', tag: 'section', className: 'py-20 bg-secondary/30', parent: 'main' },
      { id: 'pricing', tag: 'section', className: 'py-20 bg-background', parent: 'main' },
      { id: 'leadForm', tag: 'section', className: 'py-20 bg-gradient-hero', parent: 'main' }
    ];

    const healedElements: string[] = [];

    requiredElements.forEach(({ id, tag, className, parent }) => {
      if (!document.getElementById(id)) {
        const element = document.createElement(tag);
        element.id = id;
        element.className = className;
        element.innerHTML = `<div class="container mx-auto px-4"><p class="text-center text-muted-foreground">Section placeholder created by self-healing system</p></div>`;
        
        const parentElement = document.querySelector(parent) || document.body;
        parentElement.appendChild(element);
        
        healedElements.push(`#${id}`);
        console.info(`Self-heal: Created missing element #${id}`);
      }
    });

    // Show toast notification if elements were healed
    if (healedElements.length > 0) {
      toast.info(`Self-heal completed: Added ${healedElements.join(', ')}`, {
        duration: 3000,
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    
    if (!formData.state.trim()) {
      toast.error('Please select your state');
      return;
    }

    setIsSubmitting(true);

    try {
      if (db) {
        // Submit to Firebase Firestore
        await addDoc(collection(db, 'leads'), {
          ...formData,
          createdAt: serverTimestamp()
        });
        
        toast.success('🎉 Registration Confirmed! Our customer support team will get in touch with you soon.');
        
        // Reset form
        setFormData({ name: '', email: '', phone: '', state: '' });
      } else {
        // Fallback if Firebase not configured
        console.log('Lead data (Firebase not configured):', formData);
        toast.success('Registration received! Firebase configuration needed for persistence.');
        setFormData({ name: '', email: '', phone: '', state: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Lakshadweep', 'Puducherry', 'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu'
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Modules',
      description: 'Learn from basic to advanced concepts with our structured curriculum covering technical analysis, fundamental analysis, and risk management.'
    },
    {
      icon: TrendingUp,
      title: 'Live Market Data',
      description: 'Access real-time market data and practice with live examples from NSE and BSE to understand market movements.'
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Join thousands of learners in our active community. Get your doubts cleared by experts and experienced traders.'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Earn certificates upon completion of modules to showcase your knowledge and skills to potential employers.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Learn proper position sizing, stop-loss strategies, and portfolio management to protect your capital.'
    },
    {
      icon: Target,
      title: 'Practical Trading',
      description: 'Apply your learning with paper trading exercises and real market simulations before risking real money.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      state: 'Karnataka',
      content: 'TheStockMarket transformed my understanding of the stock market. The modules are easy to follow and the community support is amazing!',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      state: 'Maharashtra',
      content: 'I started with zero knowledge and now I can confidently analyze stocks. The practical approach and live examples made all the difference.',
      rating: 5
    },
    {
      name: 'Anjali Patel',
      role: 'Student',
      state: 'Gujarat',
      content: 'Free, comprehensive, and practical - everything you need to learn stock market trading. The WhatsApp community is super active and helpful!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-gradient-hero flex items-center pt-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                🎯 India's #1 Free Stock Market Education Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Master the{' '}
              <span className="gradient-text">Stock Market</span>
              <br />
              Start Learning Today
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join over 10,000+ students learning stock market trading, technical analysis, 
              and investment strategies through our comprehensive free modules and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover-lift text-lg px-8 py-6"
                onClick={() => scrollToSection('leadForm')}
              >
                Start Learning Free
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 hover-lift text-lg px-8 py-6"
                onClick={() => scrollToSection('features')}
              >
                Explore Features
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Community Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">Free</div>
                <div className="text-sm text-muted-foreground">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a successful stock market trader, 
              all in one comprehensive platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real success stories from students who transformed their 
              trading journey with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift bg-background border-0 shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>
                        {testimonial.role} • {testimonial.state}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Value Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need, Absolutely Free
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No hidden costs, no subscription fees. Quality stock market 
              education accessible to everyone.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="hover-lift bg-gradient-card border-2 border-primary/20 shadow-glow">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4">
                  <span className="text-5xl font-bold gradient-text">₹0</span>
                  <span className="text-xl text-muted-foreground ml-2">Forever</span>
                </div>
                <CardTitle className="text-2xl mb-2">Complete Learning Package</CardTitle>
                <CardDescription className="text-lg">
                  Everything you need to master stock market trading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Comprehensive Video Modules',
                    'Live Market Data Access',
                    'Expert Community Support',
                    'Practice Worksheets',
                    'Real-time Notifications',
                    'Mobile App Access',
                    'Certification on Completion',
                    'Lifetime Updates'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover-lift text-lg px-8 py-6"
                    onClick={() => scrollToSection('leadForm')}
                  >
                    Get Started Now
                    <ArrowUp className="ml-2 h-5 w-5 rotate-45" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="leadForm" className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-muted-foreground">
                Register now and get instant access to all our learning modules
              </p>
            </div>
            
            <Card className="shadow-glow border-0 bg-background">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Free Registration</CardTitle>
                <CardDescription className="text-center text-base">
                  Join thousands of successful traders who started here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium">
                      State *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('state', value)} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover-lift text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-5 w-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        Start Learning Free
                        <TrendingUp className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground text-center mt-6">
                  By registering, you agree to our Terms of Service and Privacy Policy. 
                  We'll never spam you or share your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 shadow-glow hover-lift"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default StartLearning;
