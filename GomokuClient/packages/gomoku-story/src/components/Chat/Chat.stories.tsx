import { Chat } from "./Chat";

import type { Meta, StoryObj } from "@storybook/react";

import { toaster } from "@/ui/toaster";

const meta: Meta<typeof Chat> = {
  title: "Components/Chat",
  component: Chat,
  argTypes: {
    texts: {
      control: { type: "object" },
      description: "Customizable text content for the chat component",
    },
    isConnected: {
      control: { type: "boolean" },
      description: "Connection status of the chat",
    },
    messages: {
      control: { type: "object" },
      description: "Array of chat messages",
    },
    username: {
      control: { type: "text" },
      description: "Current user username",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chat>;

const mockMessages = [
  "User1: Hello from Gomoku!",
  "User2: Hello from Gomoku!",
  "User3: Hello from Gomoku!",
  "User4: Hello from Gomoku!",
  "User5: Hello from Gomoku!",
  "User6: Hello from Gomoku!",
  "User7: Hello from Gomoku!",
  "User8: Hello from Gomoku!",
  "User9: Hello from Gomoku!",
  "User10: Hello from Gomoku!",
];

const defaultTexts = {
  title: "Chat",
  inputPlaceholder: "Type a message...",
  sendButtonText: "Send",
  sendingButtonText: "Sending...",
  charactersText: "characters",
  connectingText: "Connecting...",
  noMessagesText: "No messages yet. Start the conversation!",
  errorSendingMessage: "Error sending message",
};

export const Default: Story = {
  args: {
    isConnected: true,
    messages: mockMessages,
    username: "User1",
    texts: defaultTexts,
    sendMessage: async () => toaster.show("Sending message..."),
  },
};

export const Connecting: Story = {
  args: {
    isConnected: false,
    messages: [],
    username: "User1",
    texts: defaultTexts,
    sendMessage: async () => toaster.show("Sending message..."),
  },
};

export const EmptyChat: Story = {
  args: {
    isConnected: true,
    messages: [],
    username: "User1",
    texts: defaultTexts,
    sendMessage: async () => toaster.show("Sending message..."),
  },
};

export const CustomTexts: Story = {
  args: {
    isConnected: true,
    messages: mockMessages,
    username: "User1",
    texts: {
      ...defaultTexts,
      title: "Custom Chat Title",
      inputPlaceholder: "Write something nice...",
      sendButtonText: "→",
      noMessagesText: "Be the first to say hello!",
    },
    sendMessage: async () => toaster.show("Sending message..."),
  },
};
