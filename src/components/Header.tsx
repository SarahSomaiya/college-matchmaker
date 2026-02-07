import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCollege } from "@/context/CollegeContext";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Find Colleges", path: "/find" },
  { name: "Compare", path: "/compare" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedColleges } = useCollege();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            CollegeXed
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={cn(
                  "relative",
                  location.pathname === item.path && "shadow-md"
                )}
              >
                {item.name}
                {item.name === "Compare" && selectedColleges.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center gradient-accent text-xs">
                    {selectedColleges.length}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.name}
                  {item.name === "Compare" && selectedColleges.length > 0 && (
                    <Badge className="ml-auto gradient-accent">{selectedColleges.length}</Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}