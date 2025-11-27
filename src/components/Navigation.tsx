import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user: currentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", href: "/", isRoute: true },
    { name: "Modules", href: "/#modules", isRoute: false },
    { name: "Blog", href: "/blog", isRoute: true },
    {
      name: "Premium Market",
      href: currentUser ? "/market" : "/login",
      isRoute: true,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  interface NavItem {
    name: string;
    href: string;
    isRoute: boolean;
  }

  const renderNavItem = (item: NavItem) => {
    const baseClasses =
      "relative text-foreground hover:text-white hover:bg-yellow-500 dark:hover:text-black transition-all duration-300 font-semibold text-sm tracking-wide px-4 py-2 rounded-lg group shadow-sm hover:shadow-md transform hover:scale-105";

    if (item.isRoute) {
      return (
        <Tooltip key={item.name}>
          <TooltipTrigger asChild>
            <Link to={item.href} className={baseClasses} title={item.name}>
              {item.name}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip key={item.name}>
          <TooltipTrigger asChild>
            <a href={item.href} className={baseClasses} title={item.name}>
              {item.name}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      );
    }
  };

  return (
    <TooltipProvider>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <BrandLogo asLink={true} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map(renderNavItem)}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Quick Access Icons */}
              <div className="flex items-center space-x-1 mr-4">
                <Link to="/faq">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-muted-foreground hover:text-white hover:bg-yellow-500 dark:hover:text-black border border-transparent hover:border-yellow-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                  title={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Auth Actions */}
              {currentUser ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-border hover:border-red-400 hover:text-red-600"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-border text-primary hover:bg-accent"
                  >
                    Login
                  </Button>
                </Link>
              )}

              <a
                href="https://wa.me/919082309058?text=I%20want%20to%20learn%20stockmarket%20for%20free"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="hover:bg-secondary"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  if (item.isRoute) {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-foreground hover:text-primary transition-all duration-300 font-medium px-2 py-1"
                      >
                        {item.name}
                      </Link>
                    );
                  } else {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-foreground hover:text-primary transition-all duration-300 font-medium px-2 py-1"
                      >
                        {item.name}
                      </a>
                    );
                  }
                })}
                <div className="flex items-center justify-between px-2 py-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="hover:text-white hover:bg-yellow-500 dark:hover:text-black border border-transparent hover:border-yellow-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    title={
                      theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </>
                    )}
                  </Button>
                  <div className="flex space-x-2">
                    {currentUser ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Link to="/login">
                        <Button variant="outline" size="sm">
                          Login
                        </Button>
                      </Link>
                    )}
                    <a
                      href="https://wa.me/919082309058?text=I%20want%20to%20learn%20stockmarket%20for%20free"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                      >
                        Get Started
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navigation;
