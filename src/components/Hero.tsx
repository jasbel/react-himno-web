import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonHero from "../elements/ButtonHero";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { SettingContext } from "../state/SettingContext";

interface Props {
  title: string;
  hiddenFS?: boolean;
  hrefBefore: string;
}

const Hero = ({ title, hiddenFS, hrefBefore }: Props) => {
  const { decrementFontSize, incrementFontSize } = useContext(SettingContext);
  const navigate = useNavigate();

  const onPreBefore = () => {
    navigate(hrefBefore);
  };

  return (
    <>
      <Flex bg={Colors.bkgDark} justifyContent="center" px={2} py={1}>
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

const styles: { [key in any]: React.CSSProperties } = {
  headerRightContainer: {
    flexDirection: "row",
  },
  headerButton: {
    fontSize: responsive(40, 20),
    paddingRight: 12,
    paddingLeft: 12,
    backgroundColor: Colors.bkgTransparentPrimary,
    borderRadius: 100,
    margin: 4,
    color: Colors.txtWhite,
    borderWidth: 2,
    borderColor: Colors.bkgTransparentPrimary,
    borderStyle: "solid",
  },
  headerButtonHover: {
    backgroundColor: Colors.bkgPrimary,
    color: Colors.txtLight,
  },
};
