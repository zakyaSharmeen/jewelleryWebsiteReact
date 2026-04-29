import type { Badge as BadgeType } from "../../types";

interface Props {
  badge: BadgeType;
}

const styles: Record<NonNullable<BadgeType>, string> = {
  new: "bg-emerald-500 text-white",
  trending: "bg-amber-500 text-white",
};

const labels: Record<NonNullable<BadgeType>, string> = {
  new: "New",
  trending: "Trending",
};

export default function Badge({ badge }: Props) {
  if (!badge) return null;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles[badge]}`}>
      {labels[badge]}
    </span>
  );
}
