import { GameCreatorProps } from './GameCreator';
import { Meta } from '@storybook/react';
declare const _default: Meta<GameCreatorProps>;
export default _default;
export declare const Default: {
    (args: GameCreatorProps): import("react/jsx-runtime").JSX.Element;
    args: {
        isOpen: boolean;
        onClose: () => void;
        onCreate: (boardSize: number) => void;
        isLoading: boolean;
        timeControl: {
            duration: number;
            increment: number;
        };
    };
};
//# sourceMappingURL=GameCreator.stories.d.ts.map