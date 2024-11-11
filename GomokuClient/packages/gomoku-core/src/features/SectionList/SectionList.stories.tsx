import { Trophy, Users, Zap } from "lucide-react";

import { SectionList } from "./SectionList";

import type { SectionListProps } from "./SectionList";
import type { Meta, StoryFn } from "@storybook/react";



const mockItems = [
  {
    id: "DailyGomokuChallenge",
    title: "Daily Gomoku Challenge",
    icon: <Trophy className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
  },
  {
    id: "WeeklyOpenTournament",
    title: "Weekly Open Tournament",
    icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
  },
  {
    id: "BlitzBonanza",
    title: "Blitz Bonanza",
    icon: <Zap className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
  },
];

export default {
  title: "Components/SectionList",
  component: SectionList,
} as Meta<typeof SectionList>;

const Template: StoryFn<SectionListProps> = (args) => <SectionList {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: "Game Types",
  items: mockItems,
  noItemsText: "No online games were created",
};

export const EmptyList = Template.bind({});
EmptyList.args = {
  title: "Game Types",
  items: [],
  noItemsText: "No online games were created",
};
