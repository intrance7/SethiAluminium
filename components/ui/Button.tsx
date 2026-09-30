import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 min-h-[44px]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-dark",
  secondary:
    "border border-ink/20 text-ink hover:border-ink/60 dark:border-paper/30 dark:text-paper",
  ghost: "text-ink underline-offset-4 hover:underline dark:text-paper",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
  children,
  variant = "primary",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<React.ComponentProps<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
