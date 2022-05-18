import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonHero from "../elements/ButtonHero";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";

interface Props {
  title: string;
  hiddenFS?: boolean;
  hrefBefore: string;
}

const Hero = ({ title, hiddenFS, hrefBefore }: Props) => {
  const navigate = useNavigate();

  const onPreBefore = () => {
    navigate(hrefBefore);
  };

  return (
    <>
      <Flex bg={Colors.orangeDark} justifyContent="center" px={2} py={1}>
        <Heading as="h1" fontSize={responsive(36, 22)} color={Colors.txtWhite} textAlign="center" noOfLines={1}>
          {title}
        </Heading>
      </Flex>

      <Box style={{ position: "sticky", top: 1, zIndex: 10 }}>
        <Box position={"absolute"} width={6} zIndex={1}>
          <ButtonHero title="<" onClick={() => onPreBefore()} style={{ fontWeight: "bold" }} />
        </Box>
      </Box>
    </>
  );
};

export default Hero;
