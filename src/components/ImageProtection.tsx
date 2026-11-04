"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Wraps children (typically the layout or page) and prevents
 * right-click context menus, image dragging, and image selection
 * to deter casual image theft of product photos.
 */
export default function ImageProtection({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "IMG" ||
        target.closest("img") ||
        target.tagName === "SVG" ||
        target.closest("svg") ||
        target.closest("[data-protected]")
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "IMG" ||
        target.closest("img") ||
        target.closest("[data-protected]")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return <>{children}</>;
}
