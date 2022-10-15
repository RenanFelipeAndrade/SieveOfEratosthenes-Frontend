import { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-3 py-1 bg-primary-darker text-white rounded hover:bg-primary-darker-hover transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
