import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type Variant = "primary" | "secondary" | "accent" | "muted";

export function StatCard({
  title,
  value,
  Icon,
  variant = "primary",
}: {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  variant?: Variant;
}) {
  const colorMap: Record<Variant, string> = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary-foreground bg-secondary",
    accent: "text-accent-foreground bg-accent",
    muted: "text-muted-foreground bg-muted",
  };

  return (
    <Card className="p-4 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
        </div>
        <div className={`h-10 w-10 rounded-md grid place-items-center ${colorMap[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
