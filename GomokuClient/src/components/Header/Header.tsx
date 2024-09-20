import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input.tsx";

export const Header = () => {
  return (
    <header className="bg-[#2b2b2b] p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-[#bababa]">
          <Link to="/" className="text-[#dc9a3c]">
            <span className="text-2xl font-bold text-[#bababa]">
              ⚪️ gomoku.org
            </span>
          </Link>
          <Link to={"/game"} className="hover:text-[#f0f0f0]">
            PLAY
          </Link>
          <a href="#" className="hover:text-[#f0f0f0]">
            PUZZLES
          </a>
          <a href="#" className="hover:text-[#f0f0f0]">
            LEARN
          </a>
          <a href="#" className="hover:text-[#f0f0f0]">
            WATCH
          </a>
          <a href="#" className="hover:text-[#f0f0f0]">
            COMMUNITY
          </a>
          <a href="#" className="hover:text-[#f0f0f0]">
            TOOLS
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-[#dc9a3c] hover:underline">
            DONATE
          </a>
          <Input
            className="bg-[#3e3e3e] border-[#3e3e3e] text-[#bababa]"
            placeholder="Search"
          />
        </div>
      </nav>
    </header>
  );
};
