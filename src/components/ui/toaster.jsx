import { useToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { motion, AnimatePresence } from "framer-motion";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <div className="fixed bottom-0 right-0 z-[100] p-4 flex flex-col gap-3 w-full max-w-[420px]">
        <AnimatePresence mode="popLayout">
          {toasts.map(function ({ id, title, description, action, open, onOpenChange, ...props }) {
            if (!open) return null;
            
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              >
                <Toast {...props}>
                  <div className="grid gap-1 text-left">
                    {title && <ToastTitle>{title}</ToastTitle>}
                    {description && (
                      <ToastDescription>{description}</ToastDescription>
                    )}
                  </div>
                  {action}
                  <ToastClose />
                </Toast>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}