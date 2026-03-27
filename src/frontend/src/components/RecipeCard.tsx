import type { Recipe } from "@/data/recipes";
import { Link } from "@tanstack/react-router";
import { Clock, Heart, MessageCircle, Star } from "lucide-react";
import { motion } from "motion/react";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      <Link to={"/recipe/$id"} params={{ id: String(recipe.id) }}>
        <div className="bg-card rounded-2xl shadow-card card-hover overflow-hidden group cursor-pointer h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Category badge */}
            <span
              className="absolute bottom-2 left-2 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: "oklch(var(--green-badge))" }}
            >
              {recipe.category}
            </span>
            {/* Difficulty badge */}
            <span className="absolute top-2 right-2 text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 text-white backdrop-blur-sm">
              {recipe.difficulty}
            </span>
          </div>

          {/* Body */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-card-foreground text-sm leading-snug mb-2 line-clamp-2 flex-1">
              {recipe.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star
                className="w-3.5 h-3.5 fill-current"
                style={{ color: "oklch(var(--star-gold))" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "oklch(var(--star-gold))" }}
              >
                {recipe.rating.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({recipe.ratingCount})
              </span>
            </div>

            {/* Meta row */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-1.5">
                <img
                  src={recipe.authorAvatar}
                  alt={recipe.author}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-xs text-muted-foreground truncate max-w-[80px]">
                  {recipe.author}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" />
                  <span className="text-xs">
                    {recipe.likes >= 1000
                      ? `${(recipe.likes / 1000).toFixed(1)}k`
                      : recipe.likes}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-xs">{recipe.commentsCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{recipe.cookTime}m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
