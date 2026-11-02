import {
  GraduationCap, HeartPulse, ShoppingBag, Trees, TrainFront, Mountain, TramFront, TrainTrack,
  Waves, Ship, LandPlot, Users, Building2, TrendingUp, Landmark, Route,
} from "lucide-react";
import { cn } from "@/lib/utils";

const map = {
  education: GraduationCap, healthcare: HeartPulse, retail: ShoppingBag, nature: Trees, landmark: Landmark,
  metro: TrainFront, tunnel: Mountain, metro2: TramFront, underground: TrainTrack, bridge: Route, waterway: Ship,
  land: LandPlot, family: Users, building: Building2, growth: TrendingUp, city: Waves,
};

// Tall capsule icon frame echoing the brochure's oval line-icons.
export const LineIcon = ({ name, className, size = "md" }) => {
  const Icon = map[name] || Landmark;
  const dims = size === "sm" ? "h-14 w-10" : "h-20 w-14";
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-full border border-gold/70 text-gold-deep", dims, className)} aria-hidden>
      <Icon strokeWidth={1.2} className={size === "sm" ? "h-5 w-5" : "h-6 w-6"} />
    </span>
  );
};
