import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from 'lucide-react';
import { type ExternalToast, toast as sonnerToast } from 'sonner';

export const useToast = () => {
  const toast = {
    /**
     * Show a success toast notification
     */
    success: (message: string, options?: ExternalToast) => {
      return sonnerToast.success(message, {
        icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
        ...options,
      });
    },

    /**
     * Show an error toast notification
     */
    error: (message: string, options?: ExternalToast) => {
      return sonnerToast.error(message, {
        icon: <XCircleIcon className="h-4 w-4 text-red-500" />,
        ...options,
      });
    },

    /**
     * Show a warning toast notification
     */
    warning: (message: string, options?: ExternalToast) => {
      return sonnerToast(message, {
        icon: <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />,
        ...options,
      });
    },

    /**
     * Show an info toast notification
     */
    info: (message: string, options?: ExternalToast) => {
      return sonnerToast(message, {
        icon: <InfoIcon className="h-4 w-4 text-blue-500" />,
        ...options,
      });
    },

    /**
     * Show a default toast notification
     */
    default: (message: string, options?: ExternalToast) => {
      return sonnerToast(message, { ...options });
    },

    /**
     * Dismiss a toast by its ID
     */
    dismiss: (toastId?: string | number) => {
      sonnerToast.dismiss(toastId);
    },

    /**
     * Dismiss all toasts
     */
    dismissAll: () => {
      sonnerToast.dismiss();
    },
  };

  return toast;
};

export type ToastType = keyof ReturnType<typeof useToast>;
