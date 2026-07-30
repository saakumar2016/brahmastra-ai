import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

function Button({ children, onClick, variant = "primary", fullWidth = false }: ButtonProps) {
  const className = [
    styles.button,
    variant === "secondary" ? styles.secondary : styles.primary,
    fullWidth ? styles.fullWidth : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default Button;
