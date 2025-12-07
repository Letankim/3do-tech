"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SalesChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 bg-white">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative p-8 flex flex-col items-center text-center gap-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
            <MessageCircle className="h-10 w-10" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Chatbot hổ trợ bán hàng
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-md">
            Trợ lý AI giúp bạn tư vấn sản phẩm, hỗ trợ đặt hàng và kiểm tra tình
            trạng đơn nhanh chóng – 24/7.
          </p>

          <Button
            size="lg"
            className="w-full max-w-xs px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-transform transform hover:scale-105"
            onClick={() => (window.location.href = "chatbot")}
          >
            Trải Nghiệm Chatbot
          </Button>
        </div>
      </div>
    </div>
  );
}
