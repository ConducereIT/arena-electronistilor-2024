import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  addNewContent?: string;
}

/**
 *
 * @param children The button content.
 * @param addNewContent A function to add new styles to the button. If you use `className`, it will overwrite all the styles.
 * @returns A button with custom styles or default styles.
 */

export default function Button({
  children,
  addNewContent,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`border-0 outline-none rounded-full py-3 text-base font-light tracking-wide bg-indigo-400 text-gray-950 cursor-pointer transition-all duration-500 w-full my-2 hover:bg-violet-500 focus:bg-violet-700 ${addNewContent}`}
      {...props}
    >
      {children}
    </button>
  );
}
