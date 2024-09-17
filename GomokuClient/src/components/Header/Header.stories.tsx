import { Header } from "./Header";
import { ClerkProvider } from "@clerk/clerk-react";

export default {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story: never) => (
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error*/}
        <Story />
      </ClerkProvider>
    ),
  ],
};

export const Default = () => <Header />;
