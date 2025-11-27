import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Home,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "financewithmehul@gmail.com",
      description: "Send us an email and we'll respond within 24 hours",
      action: "mailto:financewithmehul@gmail.com",
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+91 99884 40766",
      description: "Available for calls Monday to Friday, 9 AM - 6 PM",
      action: "tel:+919082309058",
      color: "text-green-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "Chat with us",
      description: "Get instant support via WhatsApp",
      action:
        "https://wa.me/919082309058?text=Hi%2C%20I%20need%20help%20with%20stock%20market%20learning",
      color: "text-green-500",
    },
    {
      icon: MapPin,
      title: "Location",
      info: "India",
      description: "Serving students across India with online education",
      action: "#",
      color: "text-red-600",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const supportTopics = [
    {
      icon: User,
      title: "Account Support",
      description: "Help with login, account access, and premium features",
    },
    {
      icon: MessageSquare,
      title: "Learning Support",
      description: "Questions about courses, modules, and educational content",
    },
    {
      icon: Send,
      title: "Technical Support",
      description: "Website issues, bugs, and technical difficulties",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about stock market learning? Need help with our
              platform? We're here to support your trading journey.
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

      {/* Contact Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((contact, index) => (
              <Card 
                key={contact.title} 
                className="hover-lift hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-background ${contact.color} mb-4`}
                  >
                    <contact.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {contact.description}
                  </p>
                  <a
                    href={contact.action}
                    target={
                      contact.action.startsWith("http") ? "_blank" : "_self"
                    }
                    rel={
                      contact.action.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-primary font-medium hover:underline"
                  >
                    {contact.info}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Business Hours */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {businessHours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-gradient-card rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Pro Tip:</strong> For fastest response, reach out
                    via WhatsApp during business hours!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Support Topics */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>How We Can Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportTopics.map((topic) => (
                  <div
                    key={topic.title}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center`}
                    >
                      <topic.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{topic.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919082309058?text=Hi%2C%20I%20need%20help%20with%20stock%20market%20learning"
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
              <a href="mailto:financewithmehul@gmail.com">
                <Button variant="outline" size="lg" className="hover-lift">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email
                </Button>
              </a>
              <a href="tel:+919082309058">
                <Button variant="outline" size="lg" className="hover-lift">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our comprehensive FAQ section for instant answers to
            common questions.
          </p>
          <Link to="/faq">
            <Button size="lg" variant="outline" className="hover-lift">
              View FAQ Section
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;

