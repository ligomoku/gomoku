import * as Toast from "@radix-ui/react-toast";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface ToastState {
  open: boolean;
  message: string;
}

let setToastState: Dispatch<SetStateAction<ToastState>> | null = null;

export const notification = {
  show: (message: string) => {
    if (setToastState) {
      setToastState({ open: true, message });
    }
  },
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [toastState, setInternalToastState] = useState<ToastState>({
    open: false,
    message: "",
  });

  useEffect(() => {
    setToastState = setInternalToastState;
    return () => {
      setToastState = null;
    };
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      {children}
      <Toast.Root
        open={toastState.open}
        onOpenChange={(open) => setInternalToastState((s) => ({ ...s, open }))}
        className="rounded-lg bg-[#333] p-4 text-white"
      >
        <Toast.Title>{toastState.message}</Toast.Title>
        <Toast.Action altText="Close" asChild>
          <button
            onClick={() =>
              setInternalToastState((s) => ({ ...s, open: false }))
            }
            className="ml-4 text-white"
          >
            Close
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 p-4" />
    </Toast.Provider>
  );
};
