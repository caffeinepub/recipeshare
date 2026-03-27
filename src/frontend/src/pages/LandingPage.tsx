import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, RECIPES } from "@/data/recipes";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Search,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/recipes",
        search: { q: searchQuery, category: undefined },
      });
    }
  };

  const featuredRecipes = RECIPES.slice(0, 4);
  const newThisWeek = RECIPES.slice(4, 8);

  const trendingCategories = [
    { name: "Veg", icon: "🥗", count: 42 },
    { name: "Non-Veg", icon: "🍗", count: 78 },
    { name: "Desserts", icon: "🍰", count: 35 },
    { name: "Quick Meals", icon: "⚡", count: 56 },
    { name: "Breakfast", icon: "🥞", count: 29 },
    { name: "Dinner", icon: "🍽️", count: 63 },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden min-h-[480px] flex items-center"
        >
          {/* Hero image */}
          <img
            src="/assets/generated/hero-pasta.dim_1400x700.jpg"
            alt="Delicious food"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, oklch(0.94 0.033 72 / 0.92) 0%, oklch(0.94 0.033 72 / 0.70) 45%, transparent 75%)",
            }}
          />
          {/* Content */}
          <div className="relative z-10 max-w-xl px-8 py-12">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-primary/15 text-primary mb-4"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Trending Today
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4"
            >
              Discover, Cook &amp;
              <span className="text-primary block">
                {" "}
                Share Delicious Recipes
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              Join thousands of home chefs sharing their passion, one recipe at
              a time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                size="lg"
                className="rounded-full gap-2 px-8"
                onClick={() =>
                  navigate({
                    to: "/recipes",
                    search: { q: undefined, category: undefined },
                  })
                }
                data-ocid="hero.primary_button"
              >
                Browse Recipes <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-2"
                style={{
                  borderColor: "oklch(var(--green-badge))",
                  color: "oklch(var(--green-badge))",
                }}
                onClick={() =>
                  navigate({
                    to: "/recipes",
                    search: { q: undefined, category: undefined },
                  })
                }
                data-ocid="hero.secondary_button"
              >
                Discover Categories
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="max-w-2xl mx-auto px-4 -mt-4 mb-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSearch}
          className="flex gap-2 bg-card shadow-card rounded-full px-4 py-2"
        >
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0 my-auto" />
          <Input
            placeholder="Search for pasta, chicken, desserts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 shadow-none bg-transparent focus-visible:ring-0 text-base"
            data-ocid="hero.search_input"
          />
          <Button
            type="submit"
            className="rounded-full flex-shrink-0"
            data-ocid="hero.submit_button"
          >
            Search
          </Button>
        </motion.form>
      </section>

      {/* Trending Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Trending Categories
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {trendingCategories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() =>
                navigate({
                  to: "/recipes",
                  search: { q: undefined, category: cat.name },
                })
              }
              className="flex flex-col items-center gap-2 bg-card rounded-2xl p-4 shadow-xs hover:shadow-card transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              data-ocid="categories.tab"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-foreground">
                {cat.name}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {cat.count} recipes
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Featured Recipes
          </h2>
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/recipes",
                search: { q: undefined, category: undefined },
              })
            }
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
            data-ocid="featured.link"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredRecipes.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>
      </section>

      {/* New This Week */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              New This Week
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Fresh recipes just added by our community
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/recipes",
                search: { q: undefined, category: undefined },
              })
            }
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
            data-ocid="new.link"
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newThisWeek.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>
      </section>

      {/* Share Your Passion CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.145 55) 0%, oklch(0.60 0.12 50) 100%)",
          }}
        >
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Share Your Passion for Food
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join our community of home chefs. Upload your favorite recipes and
              inspire others to cook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 px-8 font-semibold"
                onClick={() => navigate({ to: "/upload" })}
                data-ocid="cta.primary_button"
              >
                Upload a Recipe
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 text-white hover:bg-white/10 px-8"
                onClick={() =>
                  navigate({
                    to: "/recipes",
                    search: { q: undefined, category: undefined },
                  })
                }
                data-ocid="cta.secondary_button"
              >
                Explore Recipes
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Recipes Shared", value: "12,840", icon: "🍳" },
            { label: "Active Chefs", value: "4,200+", icon: "👨‍🍳" },
            { label: "Countries", value: "85", icon: "🌍" },
            { label: "5-Star Reviews", value: "98,000+", icon: "⭐" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-5 text-center shadow-xs"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
