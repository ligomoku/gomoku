import { ReactNode } from 'react';
interface SectionListItem {
    id: string;
    title: string;
    icon: ReactNode;
}
export interface SectionListProps {
    title: string;
    items: SectionListItem[] | undefined;
    onItemClick?: (item: SectionListItem) => void;
    noItemsText: string;
}
export declare const SectionList: {
    ({ title, items, onItemClick, noItemsText, }: SectionListProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export {};
//# sourceMappingURL=SectionList.d.ts.map