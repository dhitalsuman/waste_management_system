import React from "react";
import { Toaster } from "sonner";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Toaster position="top-center" richColors duration={2000} />
    </div>
  );
};

export default ToastProvider;
