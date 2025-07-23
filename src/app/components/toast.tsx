import React, { useContext, useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { AuthContext } from "../context/Authcontext";

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  onViewPost: () => void;
}
export default function Toast() {
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast, setToast }: any = useContext(AuthContext);
  useEffect(() => {
    if (toast.valid) {
      setIsAnimating(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      //   setVisible(false);
    }, 300);
  };
  type IconRendererProps = {
    iconName: keyof typeof LucideIcons;
    size?: number;
  };

  const IconRenderer: React.FC<IconRendererProps> = ({
    iconName,
    size = 24,
  }) => {
    const IconComponent: any = LucideIcons[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  if (!toast.valid) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
      <div
        className={`
          bg-blue-500 text-white rounded-xl px-4 py-3 shadow-2xl
          flex items-center space-x-3 min-w-[320px]
          transition-all duration-300 ease-out
          ${
            isAnimating
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }
        `}
      >
        {/* Success Icon with Animation */}
        <div className="relative">
          <CheckCircle
            size={24}
            className={`
              text-white transition-all duration-500
              ${isAnimating ? "scale-100 rotate-0" : "scale-0 rotate-180"}
            `}
          />
          {/* Ripple Effect */}
          <div
            className={`
              absolute inset-0 bg-white/20 rounded-full
              transition-all duration-700 ease-out
              ${isAnimating ? "scale-150 opacity-0" : "scale-100 opacity-100"}
            `}
          />
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-sm">{toast.msg}</p>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {toast.isFunction && (
            <button
              onClick={toast.function}
              className="text-white hover:text-blue-100 underline transition-colors"
            >
              {toast.isFunction}
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <IconRenderer iconName={"X"} />
          </button>
        </div>
      </div>
    </div>
  );
}
