import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Github,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Quick Links": [
      { name: "Home", href: "/" },
      { name: "Modules", href: "/#modules" },
      { name: "Blog", href: "/blog" },
      { name: "Premium Market", href: "/market" },
    ],
    Support: [
      { name: "Contact Us", href: "/contact" },
      {
        name: "WhatsApp",
        href: "https://wa.me/919082309058?text=Hi%2C%20I%20need%20help%20with%20stock%20market%20learning",
        target: "_blank",
      },
      { name: "FAQ", href: "/faq" },
      {
        name: "Community",
        href: "https://chat.whatsapp.com/HLdFAMVdTlU22KsrdVsgOc?mode=ems_copy_c",
        target: "_blank",
      }, // Updated Whatsapp link
    ],
    Legal: [
      { name: "Privacy Policy", href: "/legal#privacy-policy" },
      { name: "Terms of Service", href: "/legal#terms-of-service" },
      { name: "Disclaimer", href: "/legal#disclaimer" },
      { name: "Refund Policy", href: "/legal#refund-policy" },
    ],
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/thestockmarket.io?igsh=ZTk3Zmo0aXN3ZWE3&utm_source=qr", // Add your Instagram link
      color: "hover:text-pink-500",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/git-nash-init",
      color: "hover:text-gray-800",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/with_mehul38950", // Add your Twitter link
      color: "hover:text-blue-400",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/@stockmarket_education", // Add your YouTube link
      color: "hover:text-red-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mehulpalan",
      color: "hover:text-blue-600",
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                <BrandLogo size={20} />
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                India's free stock market education platform. Learn, practice,
                and master the art of trading with expert guidance and
                comprehensive resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://chat.whatsapp.com/HLdFAMVdTlU22KsrdVsgOc?mode=ems_copy_c" // Updated WhatsApp group link
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="bg-gradient-primary hover-lift shadow-soft"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join Community
                  </Button>
                </a>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfE8agTKWApt-YnxpJ4F0EbJm0b_-s_IuMWq6_Bx3bSXZPSpQ/viewform?usp=sharing&ouid=101167777236504313206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover-lift border-2 w-full sm:w-auto"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Reach Us Out
                  </Button>
                </a>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title}>
                    <h3 className="font-semibold text-foreground mb-4">
                      {title}
                    </h3>
                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            {...(link.target && {
                              target: link.target,
                              rel: "noopener noreferrer",
                            })}
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm">
              © {currentYear} TheStockMarket. All rights reserved.
              <span className="ml-2 text-xs">
                Educational content for learning purposes only.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground ${social.color} transition-colors p-2 rounded-lg hover:bg-secondary`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
