import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/Components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import {
  Menu,
  User,
  Home,
  Trophy,
  Calendar,
  CheckCircle,
  BarChart2,
  Book,
  LogOut,
} from "lucide-react";

const TopNav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Contests", icon: Trophy, href: "/contests" },
    { name: "MAANG Events", icon: Calendar, href: "/events" },
    { name: "Solved Questions", icon: CheckCircle, href: "/solvedQuestions" },
    { name: "Analytics", icon: BarChart2, href: "/rating" },
  ];

  const problemSets = [
    { name: "CSES", href: "https://cses.fi/problemset" },
    { name: "Love Babbar Sheet", href: "https://450dsa.com/" },
    {
      name: "Striver's SDE Sheet",
      href: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    },
  ];

  const handleLogout = () => {
    signOut(auth);
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/Yorigin.png" alt="Logo" className="h-18 w-20" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-1">
            {/* Problem Sets Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Book className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="font-medium" disabled>
                  Problem Sets
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {problemSets.map((set) => (
                  <DropdownMenuItem key={set.name}>
                    <a
                      href={set.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      {set.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/60"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-2 mt-2 border-t">
                <div className="px-3 py-2 text-sm font-medium text-foreground/60">
                  Problem Sets
                </div>
                {problemSets.map((set) => (
                  <a
                    key={set.name}
                    href={set.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-sm text-foreground/60 hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    {set.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;
