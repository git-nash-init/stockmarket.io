import React from "react";
import { Link } from "react-router-dom";

interface BrandLogoProps {
  /**
   * Whether to show the text alongside the logo
   */
  withText?: boolean;
  /**
   * Size of the logo in Tailwind units (default: 10 = 2.5rem = 40px)
   */
  size?: number;
  /**
   * Whether to include the navigation link to home
   */
  asLink?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  withText = true,
  size = 16,
  asLink = false,
  className = "",
}) => {
  const getSizeClasses = (size: number) => {
    const sizeMap: { [key: number]: string } = {
      10: "h-10", // 40px - small size
      12: "h-12", // 48px - medium size
      16: "h-16", // 64px - default nav size (larger)
      20: "h-20", // 80px - extra large size
    };
    return sizeMap[size] || "h-16";
  };

  const logoContent = (
    <div className={`flex items-center gap-3 group ${className}`}>
      <img
        src="/logo.png"
        alt="TheStockMarket Logo"
        className={`${getSizeClasses(
          size
        )} w-auto transition-transform duration-300 group-hover:scale-105`}
      />
      {withText && (
        <span className="text-2xl font-bold tracking-tight text-foreground">
          The<span className="text-yellow-500">S</span>tock
          <span className="text-yellow-500">M</span>arket
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default BrandLogo;
