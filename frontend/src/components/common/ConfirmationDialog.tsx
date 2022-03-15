import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

type ConfirmationDialogProps = {
  title: string;
  children: ReactNode;
  /**
   * Overrides the default text used in the cancel button
   */
  cancelText?: string;
  /**
   * Overrides the default text used in the confirm button
   */
  confirmText?: string;

  onCancel: () => void;
  onConfirm: () => void;
} & DialogProps;

/**
 * A helper component for easy creation of Confirmation Dialogs
 */
export default function ConfirmationDialog({
  title,
  children,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  ...dialogProps
}: ConfirmationDialogProps): JSX.Element {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button type="button" autoFocus onClick={onCancel}>
          {cancelText ?? "Cancel"}
        </Button>
        <Button type="button" color="secondary" onClick={onConfirm}>
          {confirmText ?? "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
