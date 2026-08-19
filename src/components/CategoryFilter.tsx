import { cn } from "@/lib/utils";
import { type Category, CATEGORIES } from "@/hooks/use-tasks";

type FilterValue = "all" | Category;

const filters: FilterValue[] = ["all", ...CATEGORIES];

const categoryLabels: Record<FilterValue, string> = {
  all: "All",
  wellness: "Wellness",
  work: "Work",
  home: "Home",
  personal: "Personal",
};

export function CategoryFilter({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            value === filter
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {categoryLabels[filter]}
        </button>
      ))}
    </div>
  );
}
