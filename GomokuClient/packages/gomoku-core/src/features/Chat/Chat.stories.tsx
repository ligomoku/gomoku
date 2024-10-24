import { Meta, StoryFn } from "@storybook/react";
import { Chat, ChatProps } from "./Chat";
import { notification } from "@/shared/ui/notification";

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
    isConnected={true}
    messages={mockMessages}
    sendMessage={async () => notification.show("Sending message...")}
    username={"User1"}
  />
);

export const Default = Template.bind({});

Default.args = {};
