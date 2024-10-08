import { useState, ReactNode } from "react";
import { Input } from "@/shared/ui/input";
import { Menu, X } from "lucide-react";
import { Button } from "@/shared/ui/button";

export interface HeaderProps {
  onCreateGame: () => void;
  onSignInClick: () => void;
  onSignOutClick: () => void;
  isSignedIn: boolean;
  searchPlaceholder: string;
  logoText: string;
  logoOnClick: () => void;
  menuItems: Array<{ label: string; onClick: () => void }>;
  SignedInComponent: ReactNode;
  SignedOutComponent: ReactNode;
  SignInButtonComponent: ReactNode;
  UserButtonComponent: ReactNode;
}

export const Header = ({
  onSignInClick,
  isSignedIn,
  searchPlaceholder,
  logoText,
  logoOnClick,
  menuItems,
  SignedInComponent,
  SignedOutComponent,
  SignInButtonComponent,
  UserButtonComponent,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#2b2b2b] p-4 sm:p-6">
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
            className="sm:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-16 w-full flex-col items-start space-y-4 bg-[#2b2b2b] p-4 text-[#bababa] sm:relative sm:top-0 sm:flex sm:w-auto sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0 sm:bg-transparent sm:p-0`}
          style={{ zIndex: 100 }}
        >
          {menuItems.map((item, index) => (
            <span
              key={index}
              className="cursor-pointer text-lg hover:text-[#f0f0f0] sm:text-xl"
              onClick={item.onClick}
            >
              {item.label}
            </span>
          ))}

          {isSignedIn ? (
            <>{SignedInComponent ? <>{UserButtonComponent}</> : null}</>
          ) : (
            <>
              {SignedOutComponent ? (
                <>{SignInButtonComponent}</>
              ) : (
                <Button
                  onClick={onSignInClick}
                  className="cursor-pointer text-lg uppercase hover:text-[#f0f0f0] sm:text-xl"
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>

        <Input
          className="hidden h-10 w-32 border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] sm:block sm:h-12 sm:w-64 sm:text-lg"
          placeholder={searchPlaceholder}
        />
      </nav>
    </header>
  );
};
