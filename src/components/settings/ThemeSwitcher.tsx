import { useTheme } from "../ui/theme-provider";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeSwitcherProps {
  variant?: "button" | "toggle";
}

const ThemeSwitcher = ({ variant = "button" }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (variant === "toggle") {
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-5 w-5 text-gray-500" />
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${theme === "dark" ? "bg-primary" : "bg-input"}`}
          onClick={toggleTheme}
        >
          <span
            className={`${theme === "dark" ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-background transition-transform`}
          />
        </button>
        <Moon className="h-5 w-5 text-gray-500" />
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
