import * as Toast from "@radix-ui/react-toast";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { X } from "lucide-react";

interface ToastState {
  open: boolean;
  message: string;
  type: "info" | "error" | "warning" | "success";
}

let setToastState: Dispatch<SetStateAction<ToastState>> | null = null;

export const notification = {
  show: (message: string, type: ToastState["type"] = "info") => {
    if (setToastState) {
      setToastState({ open: true, message, type });
    }
  },
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
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

  const getToastClass = (type: ToastState["type"]) => {
    switch (type) {
      case "error":
        return "bg-red-100 border-l-4 border-red-500 text-red-700";
      case "warning":
        return "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700";
      case "success":
        return "bg-green-100 border-l-4 border-green-500 text-green-700";
      case "info":
      default:
        return "bg-blue-100 border-l-4 border-blue-500 text-blue-700";
    }
  };

  return (
    <Toast.Provider swipeDirection="right">
      {children}
      <Toast.Root
        open={toastState.open}
        onOpenChange={(open) => setInternalToastState((s) => ({ ...s, open }))}
        className={`${getToastClass(
          toastState.type,
        )} flex transform items-center justify-between rounded-md p-4 shadow-md transition-all duration-300 ease-in-out data-[state=closed]:translate-y-full data-[state=open]:translate-y-0`}
      >
        <Toast.Title className="text-sm font-medium">
          {toastState.message}
        </Toast.Title>
        <Toast.Action asChild altText="Close">
          <button
            onClick={() =>
              setInternalToastState((s) => ({ ...s, open: false }))
            }
            className="ml-4 rounded-full p-1 transition-colors duration-200 hover:bg-black/10"
          >
            <X className="h-4 w-4" />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-full max-w-sm list-none flex-col gap-2 p-6 outline-none" />
    </Toast.Provider>
  );
};
