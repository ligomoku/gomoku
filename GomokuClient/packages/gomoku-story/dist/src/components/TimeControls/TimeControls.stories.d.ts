import { TimeControls, TimeControlsProps } from './TimeControls';
import { Meta } from '@storybook/react';
export declare const gameTypes: {
    timeLabel: string;
    type: string;
    boardSize: number;
    timeControl: {
        initialTimeInSeconds: number;
        incrementPerMove: number;
    };
}[];
declare const _default: Meta<typeof TimeControls>;
export default _default;
export declare const Default: import('@storybook/csf').AnnotatedStoryFn<import('@storybook/react').ReactRenderer, TimeControlsProps>;
//# sourceMappingURL=TimeControls.stories.d.ts.map