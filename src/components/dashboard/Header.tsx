import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "../settings/ThemeSwitcher";

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
  onLogout?: () => void;
  onHelp?: () => void;
}

const Header = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  avatarUrl = "",
  onLogout = () => console.log("Logout clicked"),
  onHelp = () => console.log("Help clicked"),
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <header className="w-full h-20 px-6 bg-background border-b border-border flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary">
          Financial Portfolio Tracker
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeSwitcher />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon" onClick={onHelp}>
          <HelpCircle className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 h-10 px-2"
            >
              <Avatar>
                <AvatarImage src={avatarUrl} alt={userName} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
