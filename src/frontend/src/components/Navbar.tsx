import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChefHat,
  Menu,
  Moon,
  Search,
  Sun,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = loginStatus === "success" && !!identity;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/recipes",
        search: { q: searchQuery, category: undefined },
      });
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Recipes", to: "/recipes" },
    { label: "Categories", to: "/recipes" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{ backgroundColor: "oklch(var(--header-bg))" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">
              <span style={{ color: "oklch(0.35 0.05 50)" }}>Recipe</span>
              <span className="text-primary">Share</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to as "/"}
                className={`nav-link ${
                  location.pathname === link.to
                    ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
                    : ""
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xs"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="nav.search_input"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-full bg-background/80 border-border text-sm h-9"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/upload">
              <Button
                size="sm"
                className="rounded-full gap-1.5"
                data-ocid="nav.upload_button"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </Button>
            </Link>

            <button
              type="button"
              onClick={onToggleDark}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              data-ocid="nav.toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>

            {isLoggedIn ? (
              <Link to="/profile">
                <Avatar className="w-8 h-8 cursor-pointer" data-ocid="nav.link">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${identity?.getPrincipal().toString()}`}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => login()}
                data-ocid="nav.primary_button"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-border px-4 py-4 space-y-3"
            style={{ backgroundColor: "oklch(var(--header-bg))" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to as "/"}
                className="block nav-link py-2"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-full"
                  data-ocid="nav.search_input"
                />
              </div>
            </form>
            <div className="flex items-center gap-3 pt-2">
              <Link to="/upload" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="rounded-full gap-1.5"
                  data-ocid="nav.upload_button"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </Button>
              </Link>
              <button
                type="button"
                onClick={onToggleDark}
                className="p-2 rounded-full hover:bg-muted"
                data-ocid="nav.toggle"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setMobileOpen(false);
                  }}
                  className="text-sm text-muted-foreground"
                >
                  Logout
                </button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => login()}
                  data-ocid="nav.primary_button"
                >
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
