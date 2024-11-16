import Colors from "@/src/res/colors";
import { responsive } from "@/src/utils/responsive";
import { Button } from "@chakra-ui/react";
// import { Flex } from "@chakra-ui/react";
// import { Text } from "@chakra-ui/react";
//import { Heading } from "@chakra-ui/react";
// import { Input } from "@chakra-ui/react";
// import { Image } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const Input = styled.input((props) => ({
  color: Colors.txtDark,
  marginTop: 22,
  marginBottom: 22,
  backgroundColor: Colors.grayLight,
  borderRadius: 50,
  fontSize: responsive(20, 16),
  padding: 22,
  paddingTop: 12,
  paddingBottom: 12,
  width: '100%',
}));
const Heading = styled.h1((props) => ({
  fontWeight: 'bold',
}));
const TextSingle = styled.p((props) => ({
  whiteSpace: 'nowrap',        /* Evita que el texto se divida en varias líneas */
  overflow: 'hidden',           /* Oculta el texto que excede el ancho del contenedor */
  textOverflow: 'ellipsis',
}));
const Box = styled.div((props) => ({}));
const Flex = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'row'
}));

export {
  Box,
  Flex,
  TextSingle,
  Button,
  Heading,
  Input,
  // Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
};
