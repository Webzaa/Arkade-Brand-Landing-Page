import { GraduationCap, HeartPulse, ShoppingBag, Trees, Landmark } from "lucide-react";

const icons = { education: GraduationCap, healthcare: HeartPulse, retail: ShoppingBag, nature: Trees, landmark: Landmark };

export const MarkerIcon = ({ cat }) => {
  const Icon = icons[cat] || Landmark;
  return <Icon x={-11} y={-11} width={22} height={22} color="#8A6A3B" strokeWidth={1.5} />;
};
