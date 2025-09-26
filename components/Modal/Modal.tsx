"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import css from "./Modal.module.css";

export default function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  return mounted
    ? createPortal(
        <div className={css.backdrop} onClick={onClose}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}
