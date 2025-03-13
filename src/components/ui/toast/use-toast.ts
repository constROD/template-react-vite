import { type ExternalToast, toast as sonnerToast } from 'sonner';

const toast = {
  /**
   * Show a success toast notification
   */
  success: (message: string, options?: ExternalToast) => {
    return sonnerToast.success(message, { ...options });
  },

  /**
   * Show an error toast notification
   */
  error: (message: string, options?: ExternalToast) => {
    return sonnerToast.error(message, {
      ...options,
      className: 'bg-destructive text-destructive-foreground',
    });
  },

  /**
   * Show a warning toast notification
   */
  warning: (message: string, options?: ExternalToast) => {
    return sonnerToast(message, {
      ...options,
      className: 'bg-warning text-warning-foreground',
    });
  },

  /**
   * Show an info toast notification
   */
  info: (message: string, options?: ExternalToast) => {
    return sonnerToast(message, { ...options, className: 'bg-info text-info-foreground' });
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

export const useToast = () => toast;
export type ToastType = keyof typeof toast;
