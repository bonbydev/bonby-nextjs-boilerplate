"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Modal, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "./modal";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "destructive";
  loading?: boolean;
  children?: ReactNode;
  className?: string;
};

export function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  loading,
  children,
  className,
}: DialogProps) {
  return (
    <Modal open={open} onClose={onClose} className={cn("max-w-md", className)}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
      </ModalHeader>

      {children && <div className="text-muted-foreground text-sm">{children}</div>}

      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant={variant} onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
