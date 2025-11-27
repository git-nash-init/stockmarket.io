import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "+919082309058"; // Updated phone number
  const message = "Hi, I need help with stock market learning";

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    "+",
    ""
  )}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
