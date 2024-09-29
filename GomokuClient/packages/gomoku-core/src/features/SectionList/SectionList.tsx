import { Card, CardContent } from "@/shared/ui/card";
import { ReactNode } from "react";

interface SectionListItem {
  id: string;
  title: string;
  icon: ReactNode;
}

export interface SectionListProps {
  title: string;
  items: SectionListItem[] | undefined;
  onItemClick?: (item: SectionListItem) => void;
}

export const SectionList = ({
  title,
  items,
  onItemClick,
}: SectionListProps) => {
  return (
    <Card className="mb-6 border-[#2b2b2b] bg-[#2b2b2b]">
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-[#bababa] sm:text-2xl">
          {title}
        </h2>
        <ul className="max-h-64 space-y-4 overflow-y-auto text-[#bababa]">
          {items && items?.length > 0 ? (
            items?.map((item, index) => (
              <li
                className="flex cursor-pointer items-center rounded p-2 transition-colors hover:bg-[#3b3b3b]"
                key={item.title + index}
                onClick={() => onItemClick?.(item)}
              >
                {item.icon}
                <span className="ml-2 text-base sm:text-xl">{item.title}</span>
              </li>
            ))
          ) : (
            <span>No online games were created</span>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

SectionList.displayName = "SectionList";
