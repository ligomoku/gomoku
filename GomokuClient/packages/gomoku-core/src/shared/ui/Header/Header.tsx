import { Link } from "@tanstack/react-router";
import { Input } from "@/shared/ui/input";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useCreateGameAndNavigate } from "@/hooks/useCreateGame";
import { useAuthToken } from "@/context";
import { typedStorage } from "@/shared/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { jwtToken } = useAuthToken();
  const handleCreateGame = useCreateGameAndNavigate(
    jwtToken || typedStorage.getItem("jwtToken") || "",
  );

  return (
    <header className="bg-[#2b2b2b] p-4 sm:p-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <span className="mr-4 text-2xl font-bold text-[#bababa] sm:text-3xl">
              ◯ gomoku.org
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div
          className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-16 w-full flex-col items-start space-y-4 bg-[#2b2b2b] p-4 text-[#bababa] sm:relative sm:top-0 sm:flex sm:w-auto sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0 sm:bg-transparent sm:p-0`}
          //TODO: investigate better gazillion classnames handling
          style={{ zIndex: 100 }}
        >
          <span
            className="text-lg hover:text-[#f0f0f0] sm:text-xl"
            onClick={handleCreateGame}
          >
            PLAY
          </span>
          <Link href="#" className="text-lg hover:text-[#f0f0f0] sm:text-xl">
            LEARN
          </Link>
          <Link href="#" className="text-lg hover:text-[#f0f0f0] sm:text-xl">
            WATCH
          </Link>
          <Link href="#" className="text-lg hover:text-[#f0f0f0] sm:text-xl">
            COMMUNITY
          </Link>
          <header>
            <SignedOut>
              <SignInButton>
                <Link
                  //TODO: check possibility to generate types from custom clerk UI routes
                  href="/sign-in"
                  className="text-lg text-[#dc9a3c] hover:underline sm:text-xl"
                >
                  SIGN IN
                </Link>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {/* TODO: check possibility to have just sign out text with custom clerk UI */}
              <UserButton />
            </SignedIn>
          </header>
        </div>
        <Input
          className="hidden h-10 w-32 border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] sm:block sm:h-12 sm:w-64 sm:text-lg"
          placeholder="Search"
        />
      </nav>
    </header>
  );
};
