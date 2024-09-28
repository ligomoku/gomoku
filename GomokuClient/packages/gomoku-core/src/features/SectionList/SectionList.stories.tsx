import { Meta, StoryFn } from "@storybook/react";
import { SectionList, SectionListProps } from "./SectionList";
import { Trophy, Users, Zap } from "lucide-react";

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

const Template: StoryFn<SectionListProps> = () => (
  <SectionList title="Tournaments" items={mockItems} />
);

export const Default = Template.bind({});

Default.args = {};
