import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { t } from "@lingui/macro";
import { notification } from "@/shared/ui/notification";
import { useMobileDesign } from "@/hooks/useMobileDesign";

export interface ChatProps {
  messages: string[];
  isConnected: boolean;
  sendMessage: (message: string) => Promise<void>;
  username: string;
}

export const Chat = ({
  messages,
  isConnected,
  sendMessage,
  username,
}: ChatProps) => {
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDesign(1488);
  const MAX_MESSAGE_LENGTH = 50;

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      setIsSending(true);
      try {
        await sendMessage(messageInput);
        setMessageInput("");
      } catch (error) {
        console.error("Failed to send message", error);
        notification.show("Error sending message", "error");
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      if (!isSending && messageInput.trim()) {
        handleSendMessage();
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    }, 0);
  }, [messages]);

  return (
    <Card
      className="h-[100%] w-full border-[#2b2b2b] bg-[#2b2b2b] text-[#bababa]"
      style={{
        maxWidth: isMobile ? "100%" : "350px",
        minWidth: isMobile ? "100%" : "350px",
      }}
    >
      <CardHeader>
        <CardTitle>{t`Chat`}</CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                    setMessageInput(e.target.value);
                  }
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-md border px-3 py-2"
                placeholder={"Type a message..."}
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <Button
                onClick={handleSendMessage}
                loading={isSending}
                disabled={!messageInput.trim() || isSending}
                className="border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl"
              >
                {isSending ? t`Sending...` : t`Send`}
              </Button>
            </div>
            <div className="text-sm text-[#bababa]">
              {messageInput.length}/{MAX_MESSAGE_LENGTH} {t`characters`}
            </div>
            <ScrollArea
              ref={scrollAreaRef}
              className="h-[100%] max-h-[550px] min-h-[550px] w-full overflow-y-auto rounded-md border p-4"
              style={{
                maxWidth: !isMobile ? 300 : "unset",
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  ref={index === messages.length - 1 ? scrollAreaRef : null}
                  className={`mb-2 rounded p-2 ${
                    msg.startsWith(`${username}:`)
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  style={{ wordWrap: "break-word", maxWidth: "100%" }}
                >
                  {msg}
                </div>
              ))}
            </ScrollArea>
          </div>
        ) : (
          <div>
            {t`Connecting...`}
            <div className="text-gray-500">
              {t`No messages yet. Start the conversation!`}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
