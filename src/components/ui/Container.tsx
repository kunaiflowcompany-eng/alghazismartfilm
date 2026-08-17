import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-[1280px]",
        size === "wide" && "max-w-[1560px]",
        size === "narrow" && "max-w-[820px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
