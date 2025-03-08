import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState('');

  const showToast = (message : string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3000); // Auto-hide after 3 seconds
  };

  return { toast, showToast };
}