import { useState } from "react";

import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

interface AlertDialogProps {
  title: string;
  secondaryTitle: string;
  text: string;
  acceptButtonText: string;
  declineButtonText: string;
  onAccept: () => void;
  onDecline: () => void;
}

export const AlertDialog = ({
  title,
  secondaryTitle,
  text,
  acceptButtonText,
  declineButtonText,
  onAccept,
  onDecline,
}: AlertDialogProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(true);
    onAccept();
  };
  const handleDecline = () => {
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md border-gray-800 bg-[#2A2A2A]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-gray-100">{title}</CardTitle>
          <CardDescription className="text-gray-400">{secondaryTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300">{text}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            className="flex-1 bg-[#98C379] font-medium text-black hover:bg-[#89b46c]"
            size="lg"
            onClick={handleAccept}
          >
            {acceptButtonText}
          </Button>
          <Button
            className="flex-1 bg-gray-700 text-gray-100 hover:bg-gray-600"
            size="lg"
            variant="outline"
            onClick={handleDecline}
          >
            {declineButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

AlertDialog.displayName = "AlertDialog";
