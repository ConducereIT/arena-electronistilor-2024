import React from "react";

/**
 *
 * With this button, you can add a tooltip to the button showing the text when hovered.
 * @param children - The icon to be displayed
 * @param text - The text to be displayed as a tooltip
 * @param onClick - The function to be called when the button is clicked
 * @param type - The type of the button
 * @returns A button with a tooltip
 */

export default function ButtonInteractiveIcons({
  children,
  text = "tooltip",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <div className="sidebar-icon group" onClick={onClick}>
      <button type={type}>{children}</button>
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}
