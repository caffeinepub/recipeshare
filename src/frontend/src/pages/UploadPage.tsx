import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, CUISINES, DIFFICULTIES } from "@/data/recipes";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useNavigate } from "@tanstack/react-router";
import { ImageIcon, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function UploadPage() {
  const navigate = useNavigate();
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    cuisine: "",
    difficulty: "",
    cookTime: "",
    servings: "",
  });
  const [ingredients, setIngredients] = useState([
    { id: "ing-1", value: "" },
    { id: "ing-2", value: "" },
    { id: "ing-3", value: "" },
  ]);
  const [steps, setSteps] = useState([
    { id: "step-1", value: "" },
    { id: "step-2", value: "" },
  ]);
  let nextId = 10;

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addIngredient = () =>
    setIngredients((prev) => [...prev, { id: `ing-${nextId++}`, value: "" }]);
  const removeIngredient = (id: string) =>
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  const updateIngredient = (id: string, val: string) =>
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: val } : item)),
    );

  const addStep = () =>
    setSteps((prev) => [...prev, { id: `step-${nextId++}`, value: "" }]);
  const removeStep = (id: string) =>
    setSteps((prev) => prev.filter((item) => item.id !== id));
  const updateStep = (id: string, val: string) =>
    setSteps((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: val } : item)),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      login();
      return;
    }
    if (!form.title || !form.category || !form.cuisine || !form.difficulty) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    toast.success("Recipe uploaded successfully! 🎉");
    setTimeout(
      () =>
        navigate({
          to: "/recipes",
          search: { q: undefined, category: undefined },
        }),
      1500,
    );
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Upload a Recipe
        </h1>
        <p className="text-muted-foreground mb-8">
          Share your culinary creation with the community
        </p>

        {!isLoggedIn && (
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <p className="text-sm text-foreground">
              You need to be logged in to upload a recipe.
            </p>
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => login()}
              data-ocid="upload.primary_button"
            >
              Login
            </Button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
          data-ocid="upload.modal"
        >
          {/* Basic Info */}
          <div className="bg-card rounded-2xl shadow-card p-6 space-y-5">
            <h2 className="font-semibold text-foreground">Basic Information</h2>

            <div className="space-y-1.5">
              <Label htmlFor="title">Recipe Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Grandma's Secret Lasagna"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
                className="rounded-xl"
                data-ocid="upload.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Tell us what makes your recipe special..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="rounded-xl resize-none"
                data-ocid="upload.textarea"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => update("category", v)}
                >
                  <SelectTrigger
                    className="rounded-xl"
                    data-ocid="upload.select"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Cuisine *</Label>
                <Select
                  value={form.cuisine}
                  onValueChange={(v) => update("cuisine", v)}
                >
                  <SelectTrigger
                    className="rounded-xl"
                    data-ocid="upload.select"
                  >
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    {CUISINES.filter((c) => c !== "All").map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label>Difficulty *</Label>
                <Select
                  value={form.difficulty}
                  onValueChange={(v) => update("difficulty", v)}
                >
                  <SelectTrigger
                    className="rounded-xl"
                    data-ocid="upload.select"
                  >
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.filter((d) => d !== "All").map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cookTime">Cook Time (min)</Label>
                <Input
                  id="cookTime"
                  type="number"
                  placeholder="30"
                  value={form.cookTime}
                  onChange={(e) => update("cookTime", e.target.value)}
                  className="rounded-xl"
                  data-ocid="upload.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  placeholder="4"
                  value={form.servings}
                  onChange={(e) => update("servings", e.target.value)}
                  className="rounded-xl"
                  data-ocid="upload.input"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-card rounded-2xl shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Recipe Image</h2>
            <div className="space-y-1.5">
              <Label htmlFor="imageUrl">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  placeholder="https://images.unsplash.com/..."
                  value={form.imageUrl}
                  onChange={(e) => update("imageUrl", e.target.value)}
                  className="rounded-xl flex-1"
                  data-ocid="upload.input"
                />
              </div>
            </div>
            {form.imageUrl ? (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl"
              />
            ) : (
              <div
                className="w-full h-48 bg-muted rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground"
                data-ocid="upload.dropzone"
              >
                <ImageIcon className="w-8 h-8" />
                <p className="text-sm">Image preview will appear here</p>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className="bg-card rounded-2xl shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Ingredients</h2>
            <div className="space-y-2.5">
              {ingredients.map((ing, idx) => (
                <div key={ing.id} className="flex gap-2">
                  <Input
                    placeholder={`Ingredient ${idx + 1}`}
                    value={ing.value}
                    onChange={(e) => updateIngredient(ing.id, e.target.value)}
                    className="rounded-xl flex-1"
                    data-ocid="ingredient.input"
                  />
                  {ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(ing.id)}
                      className="text-destructive hover:text-destructive rounded-xl"
                      data-ocid="ingredient.delete_button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addIngredient}
              className="rounded-full gap-1.5"
              data-ocid="ingredient.secondary_button"
            >
              <Plus className="w-3.5 h-3.5" /> Add Ingredient
            </Button>
          </div>

          {/* Steps */}
          <div className="bg-card rounded-2xl shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Cooking Steps</h2>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-2">
                    {idx + 1}
                  </div>
                  <Textarea
                    placeholder={`Step ${idx + 1}: Describe what to do...`}
                    value={step.value}
                    onChange={(e) => updateStep(step.id, e.target.value)}
                    rows={2}
                    className="rounded-xl resize-none flex-1"
                    data-ocid="step.textarea"
                  />
                  {steps.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStep(step.id)}
                      className="text-destructive hover:text-destructive rounded-xl mt-1"
                      data-ocid="step.delete_button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStep}
              className="rounded-full gap-1.5"
              data-ocid="step.secondary_button"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </Button>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="submit"
              size="lg"
              className="flex-1 rounded-full gap-2"
              disabled={isSubmitting}
              data-ocid="upload.submit_button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Upload Recipe
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={() => navigate({ to: "/" })}
              data-ocid="upload.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
