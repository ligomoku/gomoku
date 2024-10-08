import { Meta, StoryFn } from "@storybook/react";
import { Header, HeaderProps } from "@/shared/ui/Header/Header";

export default {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Header>;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  onCreateGame: () => alert("Create a Game clicked!"),
  onSignInClick: () => alert("Sign In clicked!"),
  onSignOutClick: () => alert("Sign Out clicked!"),
  isSignedIn: true,
  searchPlaceholder: "Search",
  logoText: "gomoku.org",
  menuItems: [
    { label: "LEARN", onClick: () => alert("Learn clicked!") },
    { label: "WATCH", onClick: () => alert("Watch clicked!") },
    { label: "COMMUNITY", onClick: () => alert("Community clicked!") },
  ],
  SignedInComponent: (
    <span className="text-lg hover:text-[#f0f0f0] sm:text-xl">Signed In</span>
  ),
  SignedOutComponent: (
    <span className="text-lg hover:text-[#f0f0f0] sm:text-xl">Sign Out</span>
  ),
  SignInButtonComponent: (
    <span className="text-lg text-[#dc9a3c] hover:underline sm:text-xl">
      Sign In
    </span>
  ),
  UserButtonComponent: (
    <span className="text-lg hover:text-[#f0f0f0] sm:text-xl">User</span>
  ),
};
