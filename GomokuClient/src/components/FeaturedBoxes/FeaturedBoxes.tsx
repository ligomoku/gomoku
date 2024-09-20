import { Card, CardContent } from "@/components/ui/card.tsx";

export const FeaturedBoxes = () => (
  <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="border-[#2b2b2b] bg-[#2b2b2b]">
        <CardContent className="p-4 sm:p-6">
          <div className="aspect-w-16 aspect-h-9 mb-4 bg-[#3e3e3e]"></div>
          <h3 className="text-xl font-bold text-[#bababa] sm:text-2xl">
            Featured Content {i}
          </h3>
          <p className="text-base text-[#999999] sm:text-lg">
            Description of featured Gomoku content...
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);
