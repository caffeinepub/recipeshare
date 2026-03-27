import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RECIPES, SAMPLE_COMMENTS } from "@/data/recipes";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChefHat,
  Clock,
  Heart,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function RecipeDetailPage() {
  const { id } = useParams({ from: "/recipe/$id" });
  const navigate = useNavigate();
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const recipe = RECIPES.find((r) => r.id === Number.parseInt(id));

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(recipe?.likes || 0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(
    SAMPLE_COMMENTS.filter((c) => c.recipeId === Number.parseInt(id)),
  );
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🍳</div>
        <h2 className="font-display text-2xl font-bold mb-3">
          Recipe not found
        </h2>
        <Button
          onClick={() =>
            navigate({
              to: "/recipes",
              search: { q: undefined, category: undefined },
            })
          }
          className="rounded-full"
          data-ocid="detail.secondary_button"
        >
          Browse Recipes
        </Button>
      </div>
    );
  }

  const handleLike = () => {
    if (!isLoggedIn) {
      login();
      return;
    }
    setLiked(!liked);
    setLikes((prev) => prev + (liked ? -1 : 1));
    if (!liked) toast.success("Added to your liked recipes!");
  };

  const handleBookmark = () => {
    if (!isLoggedIn) {
      login();
      return;
    }
    setBookmarked(!bookmarked);
    toast.success(
      bookmarked ? "Removed from saved recipes" : "Saved to your collection!",
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      login();
      return;
    }
    if (!commentText.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        recipeId: recipe.id,
        author: "You",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=me",
        text: commentText.trim(),
        date: "Just now",
      },
      ...prev,
    ]);
    setCommentText("");
    toast.success("Comment posted!");
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          navigate({
            to: "/recipes",
            search: { q: undefined, category: undefined },
          })
        }
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
        data-ocid="detail.link"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Recipes
      </button>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden mb-8 shadow-card"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 sm:h-96 object-cover"
        />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge
            className="rounded-full px-3"
            style={{
              backgroundColor: "oklch(var(--green-badge))",
              color: "white",
              borderColor: "transparent",
            }}
          >
            {recipe.category}
          </Badge>
          <Badge variant="secondary" className="rounded-full px-3">
            {recipe.cuisine}
          </Badge>
        </div>
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            type="button"
            onClick={handleLike}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
              liked ? "bg-primary text-white" : "bg-white/80 text-foreground"
            }`}
            data-ocid="detail.toggle"
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleBookmark}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
              bookmarked
                ? "bg-primary text-white"
                : "bg-white/80 text-foreground"
            }`}
            data-ocid="detail.toggle"
          >
            <Bookmark
              className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-foreground backdrop-blur-sm hover:bg-primary hover:text-white transition-all"
            data-ocid="detail.secondary_button"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Meta */}
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              {recipe.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {recipe.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <img
                  src={recipe.authorAvatar}
                  alt={recipe.author}
                  className="w-7 h-7 rounded-full"
                />
                <span className="font-medium">by {recipe.author}</span>
              </div>
              <div
                className="flex items-center gap-1"
                style={{ color: "oklch(var(--star-gold))" }}
              >
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{recipe.rating}</span>
                <span className="text-muted-foreground">
                  ({recipe.ratingCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <ChefHat className="w-4 h-4" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4">
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <motion.li
                  key={step.substring(0, 20)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 cursor-pointer"
                  onClick={() => toggleStep(i)}
                  data-ocid={`detail.item.${i + 1}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      completedSteps.includes(i)
                        ? "bg-green-500 text-white"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {completedSteps.includes(i) ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <p
                    className={`leading-relaxed pt-1 text-sm ${
                      completedSteps.includes(i)
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {step}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Comments */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4">
              Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="mb-6">
              <Textarea
                placeholder={
                  isLoggedIn
                    ? "Share your cooking experience..."
                    : "Login to leave a comment"
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="rounded-2xl resize-none mb-3"
                rows={3}
                data-ocid="comment.textarea"
              />
              <Button
                type="submit"
                className="rounded-full"
                onClick={!isLoggedIn ? () => login() : undefined}
                data-ocid="comment.submit_button"
              >
                {isLoggedIn ? "Post Comment" : "Login to Comment"}
              </Button>
            </form>

            {/* Comment List */}
            {comments.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="comment.empty_state"
              >
                <p>No comments yet. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment, i) => (
                  <div
                    key={comment.id}
                    className="flex gap-3"
                    data-ocid={`comment.item.${i + 1}`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={comment.authorAvatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {comment.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar — Ingredients */}
        <aside className="lg:col-span-1">
          <div className="bg-card rounded-2xl shadow-card p-6 sticky top-20">
            <h2 className="font-display text-xl font-bold mb-4">Ingredients</h2>
            <p className="text-xs text-muted-foreground mb-4">
              {recipe.servings} servings
            </p>
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ingredient, i) => (
                <li
                  key={ingredient.substring(0, 20)}
                  className="flex items-start gap-2.5 text-sm"
                  data-ocid={`ingredient.item.${i + 1}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: "oklch(var(--primary))" }}
                  />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-border">
              <h3 className="font-semibold text-sm mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Button
                className="flex-1 rounded-full gap-2"
                onClick={handleLike}
                variant={liked ? "default" : "outline"}
                data-ocid="detail.toggle"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}
              </Button>
              <Button
                className="flex-1 rounded-full gap-2"
                onClick={handleBookmark}
                variant={bookmarked ? "default" : "outline"}
                data-ocid="detail.toggle"
              >
                <Bookmark
                  className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
                />
                Save
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
