import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { ChefHat, Instagram, Send, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "oklch(var(--footer-dark))" }}
      className="text-white/80 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Recipe<span className="text-primary">Share</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              A community where food lovers share, discover, and celebrate great
              cooking.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2">
              {["Browse Recipes", "Categories", "Top Chefs", "Trending"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/recipes"
                      search={{ q: undefined, category: undefined }}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Community
            </h4>
            <ul className="space-y-2">
              {[
                "Upload a Recipe",
                "Your Profile",
                "Saved Recipes",
                "Recipe Tips",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/upload"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Stay Inspired
            </h4>
            <p className="text-xs text-white/60 mb-3">
              Get weekly recipes in your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex gap-2"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-9 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full"
                data-ocid="footer.input"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full h-9 w-9 flex-shrink-0"
                data-ocid="footer.submit_button"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="hover:text-white transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
