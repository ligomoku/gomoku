import type { Preview } from "@storybook/react";
import { withGlobalStorybookDecorator } from "../src/utils/storybook-utils";
import "../src/styles/index.css";

const decorators = [withGlobalStorybookDecorator];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators,
};

export default preview;
