import { Meta, StoryFn } from "@storybook/react";
import Square, { SquareProps } from "./Square";

const meta: Meta = {
  title: "Components/Square",
  component: Square,
  argTypes: {
    value: {
      control: { type: "radio" },
      options: [null, "black", "white"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

const Template: StoryFn<SquareProps> = (args) => <Square {...args} />;

export const Default = Template.bind({});
Default.args = {
  row: 0,
  col: 0,
  value: null,
  onClick: (row: number, col: number, value: string | null) =>
    console.log(`Square clicked at row ${row}, col ${col} with value ${value}`),
} as SquareProps;

export const BlackPiece = Template.bind({});
BlackPiece.args = {
  row: 1,
  col: 1,
  value: "black",
  onClick: (row: number, col: number, value: string | null) =>
    console.log(`Square clicked at row ${row}, col ${col} with value ${value}`),
} as SquareProps;

export const WhitePiece = Template.bind({});
WhitePiece.args = {
  row: 2,
  col: 2,
  value: "white",
  onClick: (row: number, col: number, value: string | null) =>
    console.log(`Square clicked at row ${row}, col ${col} with value ${value}`),
} as SquareProps;
