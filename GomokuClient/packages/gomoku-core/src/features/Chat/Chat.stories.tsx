import { Chat } from "./Chat";

import type { ChatProps } from "./Chat";
import type { Meta, StoryFn } from "@storybook/react";


import { toaster } from "@/shared/ui/toaster";

export default {
  title: "Components/Chat",
  component: Chat,
} as Meta<typeof Chat>;

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

const Template: StoryFn<ChatProps> = () => (
  <Chat
    isConnected
    messages={mockMessages}
    sendMessage={async () => toaster.show("Sending message...")}
    username={"User1"}
  />
);

export const Default = Template.bind({});

Default.args = {};
