interface AlertDialogProps {
    title: string;
    secondaryTitle: string;
    text: string;
    acceptButtonText: string;
    declineButtonText: string;
    onAccept: () => void;
    onDecline: () => void;
}
export declare const AlertDialog: {
    ({ title, secondaryTitle, text, acceptButtonText, declineButtonText, onAccept, onDecline, }: AlertDialogProps): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
export {};
//# sourceMappingURL=alert-dialog.d.ts.map