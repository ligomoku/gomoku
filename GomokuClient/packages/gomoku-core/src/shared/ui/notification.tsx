import * as Toast from "@radix-ui/react-toast";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Button } from "@/shared/ui/button";

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
        return "bg-red-600 text-red-12";
      case "warning":
        return "bg-yellow-600 text-yellow-12";
      case "success":
        return "bg-green-600 text-green-12";
      case "info":
      default:
        return "bg-blue-600 text-blue-12";
    }
  };

  return (
    <Toast.Provider swipeDirection="down">
      {children}
      <Toast.Root
        open={toastState.open}
        onOpenChange={(open) => setInternalToastState((s) => ({ ...s, open }))}
        className={`grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md p-[15px] shadow-[0_10px_38px_-10px_rgba(0,0,0,0.35),0_10px_20px_-15px_rgba(0,0,0,0.2)] ${getToastClass(
          toastState.type,
        )} data-[state=closed]:animate-hide data-[state=open]:animate-slideIn [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
      >
        <Toast.Title className="mb-[5px] text-[15px] font-medium [grid-area:_title]">
          {toastState.message}
        </Toast.Title>
        <Toast.Action altText="Close" asChild>
          <Button
            onClick={() =>
              setInternalToastState((s) => ({ ...s, open: false }))
            }
            className="inline-flex h-[25px] items-center justify-center rounded px-2.5 text-xs font-medium leading-[25px] shadow-[inset_0_0_0_1px] hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]"
          >
            Close
          </Button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-4 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
};
