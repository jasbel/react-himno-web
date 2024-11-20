import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React, { FC } from "react";

interface Props {
  title: string;
  trigger: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  children: React.ReactNode;
}

export const Modal: FC<Props> = ({ open, onClose, title, trigger, onAccept, children }) => {
  const onPreAccept = () => {
    onAccept()
    onClose();
  }
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {children}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose} >Cancelar</AlertDialogCancel>
            <AlertDialogAction color="green" onClick={onPreAccept}>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
};
