import { SwaggerTypes } from '@gomoku/api';
export interface FeaturedBoxesProps {
    games: SwaggerTypes.GetAvailableGamesResponse[];
    onGameClick: (game: SwaggerTypes.GetAvailableGamesResponse) => void;
    noGamesText: string;
    onGameClickLoading?: boolean;
}
export declare const FeaturedBoxes: ({ games, onGameClick, noGamesText, onGameClickLoading, }: FeaturedBoxesProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FeaturedBoxes.d.ts.map