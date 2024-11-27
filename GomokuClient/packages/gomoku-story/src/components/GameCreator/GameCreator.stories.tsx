import { useState } from "react";

import { GameCreator } from "./GameCreator";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/ui";

const meta: Meta<typeof GameCreator> = {
  title: "Components/GameCreator",
  component: GameCreator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal dialog for creating new games with customizable board size.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Controls the visibility of the dialog",
    },
    onClose: {
      description: "Callback function when the dialog is closed",
    },
    onCreate: {
      description: "Callback function when a game is created",
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Loading state during game creation",
    },
  },
} satisfies Meta<typeof GameCreator>;

export default meta;
type Story = StoryObj<typeof GameCreator>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Dialog closed"),
    onCreate: (boardSize) =>
      console.log(`Creating game with board size: ${boardSize}`),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    isOpen: false,
  },
};

const ButtonTriggerExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-[#629924] text-white hover:bg-[#58881f]"
      >
        Create New Game
      </Button>

      <GameCreator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={(boardSize) => {
          console.log(`Creating game with board size: ${boardSize}`);
          setTimeout(() => setIsOpen(false), 1000);
        }}
        isLoading={false}
      />
    </div>
  );
};

export const WithButton = {
  render: () => <ButtonTriggerExample />,
};

export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

const InteractiveDemoExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (boardSize: number) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`Created game with board size: ${boardSize}`);
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-[#629924] text-white hover:bg-[#58881f]"
      >
        Create New Game
      </Button>

      <GameCreator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleCreate}
        isLoading={isLoading}
      />
    </div>
  );
};

export const InteractiveDemo = {
  render: () => <InteractiveDemoExample />,
};
