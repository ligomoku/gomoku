import { Button } from "@/shared/ui/button";
import { DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Dialog } from "@/shared/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Slider } from "@/shared/ui/slider";

interface GameCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameCreator = ({ isOpen, onClose }: GameCreatorProps) => {
  const [minutes, setMinutes] = useState(3);
  const [increment, setIncrement] = useState(9);
  const [isRated, setIsRated] = useState(true);
  const [ratingRange, setRatingRange] = useState([-500, 500]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#2e2e2e] text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">
            Create a game
          </DialogTitle>
          <Button
            variant="ghost"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="variant" className="text-right">
              Variant
            </label>
            <Select defaultValue="standard">
              <SelectTrigger className="col-span-3 bg-[#3e3e3e]">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="chess960">Chess960</SelectItem>
                <SelectItem value="crazyhouse">Crazyhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="timeControl" className="text-right">
              Time control
            </label>
            <Select defaultValue="realTime">
              <SelectTrigger className="col-span-3 bg-[#3e3e3e]">
                <SelectValue placeholder="Select time control" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realTime">Real time</SelectItem>
                <SelectItem value="correspondence">Correspondence</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="minutes" className="text-right">
              Minutes per side
            </label>
            <div className="col-span-3">
              <Slider
                id="minutes"
                min={1}
                max={30}
                step={1}
                value={[minutes]}
                onValueChange={(value) => setMinutes(value[0])}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
              <div className="mt-1 text-center">{minutes}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="increment" className="text-right">
              Increment in seconds
            </label>
            <div className="col-span-3">
              <Slider
                id="increment"
                min={9}
                max={30}
                step={1}
                value={[increment]}
                onValueChange={(value) => setIncrement(value[0])}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
              <div className="mt-1 text-center">{increment}</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant={isRated ? "ghost" : "secondary"}
              onClick={() => setIsRated(false)}
            >
              Casual
            </Button>
            <Button
              variant={isRated ? "secondary" : "ghost"}
              onClick={() => setIsRated(true)}
            >
              Rated
            </Button>
          </div>
          <div className="space-y-2">
            <label htmlFor="ratingRange" className="block text-center">
              Rating range
            </label>
            <Slider
              id="ratingRange"
              min={-500}
              max={500}
              step={10}
              value={ratingRange}
              onValueChange={setRatingRange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
            <div className="flex justify-between">
              <span>{ratingRange[0]}</span>
              <span>{ratingRange[1]}</span>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="h-12 w-12 rounded-full">
              ♔
            </Button>
            <Button variant="secondary" className="h-12 w-12 rounded-full">
              ♚
            </Button>
            <Button variant="outline" className="h-12 w-12 rounded-full">
              ♔♚
            </Button>
          </div>
          <div className="text-center">Rating: 1933 Blitz</div>
        </div>
        <Button className="w-full bg-[#629924] text-white hover:bg-[#58881f]">
          Create game
        </Button>
      </DialogContent>
    </Dialog>
  );
};

GameCreator.displayName = "GameCreator";

export const GameCreatorButton = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <div onClick={handleOpen} style={{ display: "inline-block" }}>
        {children}
      </div>

      <GameCreator isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
};
