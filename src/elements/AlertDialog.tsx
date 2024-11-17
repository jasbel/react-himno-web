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
  description: string;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  children: any;
}

export const AlertDialogStar: FC<Props> = ({ open, onClose, title, description, onAccept, children }) => {
  const onPreAccept = () => {
    onAccept()
    onClose();
  }
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
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
