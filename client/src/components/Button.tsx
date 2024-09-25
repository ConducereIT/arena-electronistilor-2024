import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`
        border-0 outline-none rounded-full py-3 text-base font-light tracking-wide cursor-pointer 
        transition-all duration-500 my-2 bg-violet-500 hover:bg-violet-600 focus:bg-violet-700 ${className}`}
      onClick={onClick}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
