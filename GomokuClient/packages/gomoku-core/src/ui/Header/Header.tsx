import { Input, Button } from "@gomoku/story";
import { Menu, X, Search, Bell } from "lucide-react";
import { useState } from "react";

import type { ReactNode } from "react";

import { typedStorage } from "@/utils";

export interface HeaderProps {
  isSignedIn: boolean;
  searchPlaceholder: string;
  logoText: string;
  logoOnClick: () => void;
  menuItems: Array<{
    label: string;
    onClick: () => void;
  }>;
  SignedInComponent: ReactNode;
  SignedOutComponent: ReactNode;
  SignInButtonComponent: ReactNode;
  UserButtonComponent: ReactNode;
  onSignInClick: () => void;
}

export const Header = ({
  onSignInClick,
  isSignedIn,
  searchPlaceholder,
  logoText,
  logoOnClick,
  menuItems,
  SignedOutComponent,
  SignInButtonComponent,
  UserButtonComponent,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  if (SignedOutComponent) typedStorage.clear();

  return (
    <header className="z-30 bg-[#2b2b2b] p-4 transition-opacity duration-300 sm:p-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <span
            className="mr-4 cursor-pointer text-2xl font-bold text-[#bababa] sm:text-3xl"
            onClick={logoOnClick}
          >
            ◯ {logoText}
          </span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#bababa] sm:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-16 w-full flex-col
            items-start space-y-4 bg-[#2b2b2b] p-4 text-[#bababa] sm:relative sm:top-0
            sm:flex sm:w-auto sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0
            sm:bg-transparent sm:p-0`}
          //TODO: not very good solution, should be fixed in the future
          style={{ zIndex: 30 }}
        >
          {menuItems.map((item) => (
            <span
              key={item.label}
              className="cursor-pointer text-lg hover:text-[#f0f0f0] sm:text-xl"
              onClick={item.onClick}
            >
              {item.label}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {BETA_FEATURES && (
            <>
              <Input
                className="hidden h-10 w-32 border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] sm:block
                  sm:h-12 sm:w-64 sm:text-lg"
                placeholder={searchPlaceholder}
              />
              <button
                aria-label="Search"
                className="text-[#bababa] hover:text-[#f0f0f0] sm:hidden"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                aria-label="Notifications"
                className="text-[#bababa] hover:text-[#f0f0f0]"
              >
                <Bell className="h-5 w-5" />
              </button>
            </>
          )}
          {isSignedIn ? (
            <div className="hidden items-center space-x-2 text-[#bababa] hover:text-[#f0f0f0] sm:flex">
              {UserButtonComponent ? UserButtonComponent : null}
            </div>
          ) : SignedOutComponent ? (
            SignInButtonComponent
          ) : (
            <Button
              onClick={onSignInClick}
              variant="ghost"
              className="hidden items-center space-x-2 text-[#bababa] hover:text-[#f0f0f0] sm:flex"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
