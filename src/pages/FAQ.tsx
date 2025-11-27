import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Plus,
  Minus,
  HelpCircle,
  BookOpen,
  Shield,
  CreditCard,
  Users,
  Smartphone,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: BookOpen,
      title: "Learning & Content",
      color: "text-blue-600",
      faqs: [
        {
          question: "Is the stock market education really free?",
          answer:
            "Yes! All our basic educational modules, including Technical Analysis, Options Trading, Risk Management, and Trading Psychology are completely free. You only pay for premium features like daily market insights and live trading levels.",
        },
        {
          question: "Do I need any prior experience to start learning?",
          answer:
            "Not at all! Our modules are designed for complete beginners. We start with the basics and gradually progress to advanced concepts. Each module builds upon the previous one, ensuring a smooth learning curve.",
        },
        {
          question: "How long does it take to complete all modules?",
          answer:
            "Our comprehensive course includes 8 modules totaling approximately 60+ hours of content. You can learn at your own pace - some students complete it in 2-3 months, while others take 6 months for thorough understanding.",
        },
        {
          question: "Are the modules updated regularly?",
          answer:
            "Yes, we regularly update our content to reflect current market conditions, new trading strategies, and regulatory changes. Premium members get early access to updated content.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Premium Features",
      color: "text-green-600",
      faqs: [
        {
          question: "What's included in the premium market access?",
          answer:
            "Premium access includes daily NIFTY and BANKNIFTY support/resistance levels, target prices, stop-loss recommendations, market sentiment analysis, and priority WhatsApp support.",
        },
        {
          question: "How much does premium access cost?",
          answer:
            "Contact us on WhatsApp for current pricing. We offer flexible packages including monthly, quarterly, and yearly subscriptions. Special discounts available for students and long-term subscribers.",
        },
        {
          question: "Can I cancel my premium subscription?",
          answer:
            "Yes, you can cancel anytime. There are no long-term commitments. Your access will continue until the end of your current billing period.",
        },
        {
          question: "How accurate are the trading levels provided?",
          answer:
            "Our levels are based on comprehensive technical analysis by experienced traders. While no predictions are 100% accurate, our historical accuracy rate is consistently high. Always use proper risk management.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Account & Security",
      color: "text-red-600",
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "Currently, premium accounts are created manually. Contact us on WhatsApp with your details, and we'll set up your account within 24 hours. This ensures personalized onboarding.",
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer:
            "Contact our support team via WhatsApp or email, and we'll help you reset your password securely. For security reasons, password resets are handled manually.",
        },
        {
          question: "Is my personal information safe?",
          answer:
            "Absolutely. We use industry-standard security measures and never share your personal information with third parties. Your data is encrypted and stored securely.",
        },
        {
          question: "Can I share my account with others?",
          answer:
            "Premium accounts are for individual use only. Sharing accounts violates our terms of service and may result in account suspension. We offer family and group discounts - contact us for details.",
        },
      ],
    },
    {
      icon: Smartphone,
      title: "Technical Support",
      color: "text-purple-600",
      faqs: [
        {
          question: "The website is not loading properly. What should I do?",
          answer:
            "Try clearing your browser cache and cookies, or use an incognito/private browsing window. If the issue persists, contact our technical support team with your browser and device details.",
        },
        {
          question: "Can I access the platform on mobile?",
          answer:
            "Yes! Our platform is fully responsive and works seamlessly on all devices - mobile phones, tablets, and desktops. No app download required.",
        },
        {
          question: "Are there any browser requirements?",
          answer:
            "We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, please use the latest version of your preferred browser.",
        },
        {
          question: "I'm having trouble logging in. Help!",
          answer:
            "First, ensure you're using the correct email and password. Clear your browser cache, disable ad blockers temporarily, and try again. If issues persist, contact us immediately.",
        },
      ],
    },
    {
      icon: Users,
      title: "Community & Support",
      color: "text-orange-600",
      faqs: [
        {
          question: "How can I join the trading community?",
          answer:
            "Join our WhatsApp community where traders share insights, discuss market trends, and support each other. The link is available in the footer or contact us for direct access.",
        },
        {
          question: "Do you provide personalized trading advice?",
          answer:
            "We provide general market analysis and educational content. For personalized advice, consider our premium mentorship programs. We never provide specific buy/sell recommendations for individual stocks.",
        },
        {
          question: "How quickly do you respond to support queries?",
          answer:
            "WhatsApp queries are typically answered within 1-2 hours during business hours (9 AM - 6 PM, Mon-Fri). Email responses within 24 hours. Premium members get priority support.",
        },
        {
          question: "Can I suggest new features or content topics?",
          answer:
            "Absolutely! We love feedback from our community. Send your suggestions via WhatsApp or email, and we'll consider them for future updates. Many of our features come from user suggestions.",
        },
      ],
    },
  ];

  const quickLinks = [
    {
      title: "Contact Support",
      description: "Need immediate help? Reach out to our team",
      action: "/contact",
      icon: MessageCircle,
      color: "bg-blue-600",
    },
    {
      title: "WhatsApp Chat",
      description: "Get instant support via WhatsApp",
      action: "https://wa.me/919082309058?text=Hi%2C%20I%20have%20a%20question",
      icon: MessageCircle,
      color: "bg-green-600",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-soft">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Got <span className="gradient-text">Questions?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find instant answers to common questions about our platform,
              learning modules, premium features, and more.
            </p>
            <div className="flex justify-center">
              <Link to="/">
                <Button variant="outline" size="lg" className="hover-lift">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.action}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors hover-lift"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center text-white`}
                >
                  <link.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{link.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.title} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={`w-10 h-10 rounded-lg bg-background ${category.color} flex items-center justify-center`}
                  >
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openItems.includes(globalIndex);

                    return (
                      <Card
                        key={faq.question}
                        className="hover-lift transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${faqIndex * 0.1}s` }}
                      >
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                          >
                            <h3 className="font-semibold pr-4">
                              {faq.question}
                            </h3>
                            {isOpen ? (
                              <Minus className="h-5 w-5 text-primary flex-shrink-0" />
                            ) : (
                              <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <div className="pt-4 border-t border-border">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to
            help! Reach out via WhatsApp for the fastest response, or send us an
            email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919082309058?text=Hi%2C%20I%20couldn't%20find%20my%20question%20in%20the%20FAQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="hover-lift">
                View All Contact Options
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
