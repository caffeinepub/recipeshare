import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, CUISINES, DIFFICULTIES, RECIPES } from "@/data/recipes";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

export default function RecipesPage() {
  const search = useSearch({ from: "/recipes" });
  const [searchQuery, setSearchQuery] = useState(
    (search as { q?: string }).q || "",
  );
  const [category, setCategory] = useState(
    (search as { category?: string }).category || "All",
  );
  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState("Any");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      if (
        searchQuery &&
        !r.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
        return false;
      if (
        category !== "All" &&
        r.category !== category &&
        !r.tags.includes(category)
      )
        return false;
      if (cuisine !== "All" && r.cuisine !== cuisine) return false;
      if (difficulty !== "All" && r.difficulty !== difficulty) return false;
      if (maxTime !== "Any") {
        const max = Number.parseInt(maxTime);
        if (r.cookTime > max) return false;
      }
      return true;
    });
  }, [searchQuery, category, cuisine, difficulty, maxTime]);

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("All");
    setCuisine("All");
    setDifficulty("All");
    setMaxTime("Any");
  };

  const hasFilters =
    searchQuery ||
    category !== "All" ||
    cuisine !== "All" ||
    difficulty !== "All" ||
    maxTime !== "Any";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          All Recipes
        </h1>
        <p className="text-muted-foreground">
          Explore our collection of {RECIPES.length}+ handpicked recipes
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside
          className={`${
            sidebarOpen ? "fixed inset-0 z-40 flex" : "hidden"
          } lg:relative lg:flex flex-col w-64 flex-shrink-0`}
        >
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={() => setSidebarOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Close filters"
            />
          )}
          <div className="relative z-10 bg-card rounded-2xl shadow-card p-5 space-y-5 lg:sticky lg:top-20 w-64 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">Filters</h3>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                  data-ocid="filters.cancel_button"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      category === cat
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                    data-ocid="filters.tab"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Cuisine */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Cuisine
              </p>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger
                  className="h-9 text-sm rounded-xl"
                  data-ocid="filters.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CUISINES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Difficulty
              </p>
              <div className="flex gap-1.5">
                {DIFFICULTIES.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all flex-1 ${
                      difficulty === d
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                    data-ocid="filters.tab"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Cook Time */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Max Cook Time
              </p>
              <Select value={maxTime} onValueChange={setMaxTime}>
                <SelectTrigger
                  className="h-9 text-sm rounded-xl"
                  data-ocid="filters.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any time</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search + Mobile filter toggle */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ingredient, cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-full h-10"
                data-ocid="recipes.search_input"
              />
            </div>
            <Button
              variant="outline"
              className="lg:hidden rounded-full gap-1.5"
              onClick={() => setSidebarOpen(true)}
              data-ocid="recipes.toggle"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
          </div>

          {/* Active Filters Summary */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {category !== "All" && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {category}{" "}
                  <button
                    type="button"
                    onClick={() => setCategory("All")}
                    data-ocid="filters.cancel_button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {cuisine !== "All" && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {cuisine}{" "}
                  <button
                    type="button"
                    onClick={() => setCuisine("All")}
                    data-ocid="filters.cancel_button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-20" data-ocid="recipes.empty_state">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-display text-xl font-semibold mb-2">
                No recipes found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button
                onClick={clearFilters}
                className="rounded-full"
                data-ocid="recipes.secondary_button"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((recipe, i) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
