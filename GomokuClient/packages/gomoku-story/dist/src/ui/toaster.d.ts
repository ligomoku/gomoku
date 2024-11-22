import { ReactNode } from 'react';
interface ToastState {
    open: boolean;
    message: string;
    type: "info" | "error" | "warning" | "success";
}
export declare const toaster: {
    show: (message: string, type?: ToastState["type"]) => void;
};
export declare const ToasterProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=toaster.d.ts.map