import {
  AlertDialog as AlertDialog_,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const AlertDialog: FC<Props> = ({open, onClose, title, description, onAccept}) => {
  const cancelRef = React.useRef<any>();

  const onPreAccept = () => {
    onAccept()
    onClose();
  }

  return (
    <>
      <AlertDialog_ isOpen={open} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={onPreAccept} ml={3}>
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog_>
    </>
  );
};
