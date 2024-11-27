import * as Toast from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

import type { Dispatch, SetStateAction, ReactNode } from "react";

interface ToastState {
  open: boolean;
  message: string;
  type: "info" | "error" | "warning" | "success";
}

let setToastState: Dispatch<SetStateAction<ToastState>> | null = null;

export const toaster = {
  show: (message: string, type: ToastState["type"] = "info") => {
    if (setToastState) {
      setToastState({
        open: true,
        message,
        type,
      });
    }
  },
};

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toastState, setInternalToastState] = useState<ToastState>({
    open: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    setToastState = setInternalToastState;
    return () => {
      setToastState = null;
    };
  }, []);

  const getBorderColor = (type: ToastState["type"]) => {
    switch (type) {
      case "error":
        return "border-red-500";
      case "warning":
        return "border-yellow-500";
      case "success":
        return "border-green-500";
      case "info":
      default:
        return "border-blue-500";
    }
  };

  return (
    <Toast.Provider swipeDirection="right" duration={5000}>
      {children}
      <Toast.Root
        open={toastState.open}
        duration={5000}
        onOpenChange={(open) =>
          setInternalToastState((s) => ({
            ...s,
            open,
          }))
        }
        className="animate-in fade-in slide-in-from-top-4 fixed left-1/2 top-4 z-50
          w-[calc(100%-2rem)] max-w-[600px] -translate-x-1/2"
      >
        <div
          className={`rounded-lg border bg-[#202020] p-6 text-[#e0e0e0] shadow-lg
            ${getBorderColor(toastState.type)} flex items-center justify-between`}
        >
          <Toast.Title className="pr-8 text-lg font-light leading-tight">
            {toastState.message}
          </Toast.Title>
          <Toast.Action asChild altText="Close">
            <button
              onClick={() =>
                setInternalToastState((s) => ({
                  ...s,
                  open: false,
                }))
              }
              className="rounded-full p-1 text-[#e0e0e0] transition-colors hover:bg-white/10
                hover:text-white"
              aria-label="Close notification"
            >
              <X className="h-6 w-6" />
            </button>
          </Toast.Action>
        </div>
      </Toast.Root>
      {/*TODO: Make this dynamic to control the position*/}
      {/*<Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-full max-w-sm list-none flex-col gap-2 p-6 outline-none" />*/}
      <Toast.Viewport
        className="fixed bottom-0 left-1/2 z-50 mb-20 flex w-full max-w-sm -translate-x-1/2
          transform list-none flex-col gap-2 p-6 outline-none"
      />
    </Toast.Provider>
  );
};
