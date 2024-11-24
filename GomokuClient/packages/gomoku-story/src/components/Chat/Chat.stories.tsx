import { Chat } from "./Chat";

import type { Meta, StoryObj } from "@storybook/react";

import { toaster } from "@/ui/toaster";

const meta: Meta<typeof Chat> = {
  title: "Components/Chat",
  component: Chat,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A real-time chat component with message input, scrollable message history, and connection status.",
      },
    },
  },
  argTypes: {
    texts: {
      control: { type: "object" },
      description: "Customizable text content for the chat component",
      table: {
        type: { summary: "ChatTexts" },
        defaultValue: { summary: "defaultTexts" },
      },
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
    sendMessage: {
      description: "Callback function to handle message sending",
    },
  },
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof Chat>;

const mockMessages = [
  "User1: Hello from Gomoku!",
  "User2: Good luck with the game!",
  "User1: Thanks! This is my first time playing.",
  "User2: You'll get the hang of it quickly!",
  "System: Game started",
  "User1: Where should I place my first stone?",
  "User2: The center is usually a good starting point",
  "User1: Thanks for the tip!",
  "System: User1 placed stone at (7,7)",
  "User2: Nice move!",
];

const longMessages = [
  ...mockMessages,
  ...Array.from(
    { length: 20 },
    (_, i) => `User${(i % 2) + 1}: Message ${i + 1} - Testing scroll behavior`,
  ),
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
    sendMessage: async (message: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toaster.show(`Sent: ${message}`);
    },
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

export const ScrollableChat: Story = {
  args: {
    isConnected: true,
    messages: longMessages,
    username: "User1",
    texts: defaultTexts,
    sendMessage: async () => toaster.show("Sending message..."),
  },
};

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    texts: {
      ...defaultTexts,
      title: "💬 Game Chat",
      inputPlaceholder: "Write something nice...",
      sendButtonText: "→",
      noMessagesText: "Be the first to say hello!",
    },
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const ErrorHandling: Story = {
  args: {
    ...Default.args,
    sendMessage: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      throw new Error("Network error");
    },
  },
};

export const WithSystemMessages: Story = {
  args: {
    ...Default.args,
    messages: [
      "System: Welcome to the game!",
      "System: User1 has joined",
      "User1: Hello everyone!",
      "System: Game started",
      "User2: Hi User1!",
      "System: User1 placed stone at (7,7)",
    ],
  },
};

export const MessageTypes: Story = {
  args: {
    ...Default.args,
    messages: [
      "User1: Regular message",
      "System: 🎮 Game action",
      "User2: 😊 Message with emojis 🎲",
      "User1: https://example.com",
      "System: ⚠️ Warning message",
      "User2: *formatted* message",
    ],
  },
};

export const RealTimeSimulation: Story = {
  args: {
    ...Default.args,
    messages: mockMessages.slice(0, 3),
  },
  play: async ({ args }) => {
    let index = 3;
    const interval = setInterval(() => {
      if (index < mockMessages.length) {
        args.messages = [...args.messages, mockMessages[index]];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  },
};
