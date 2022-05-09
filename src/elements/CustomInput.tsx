import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

interface Props {
  id: string;
  label: string;
}

const CustomInput = ({id, label}: Props) => {
  return (
    <FormControl variant="floating" id={id} isRequired isInvalid>
      <Input placeholder=" " />
      {/* It is important that the Label comes after the Control due to css selectors */}
      <FormLabel>{label}</FormLabel>
      <FormHelperText>Keep it very short and sweet!</FormHelperText>
      <FormErrorMessage>Your First name is invalid</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
