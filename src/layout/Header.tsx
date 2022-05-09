import { Button, Flex, Image } from "@chakra-ui/react";
import logoName from "../images/logo+name.png";

// import logo from "../logo.svg";
// import { responsive } from "../utils/responsive";

const Header = () => {
  return (
    <header className="header bg-blue-800">
      {/* <Container> */}
      <Flex
        bg={"blue.header"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Image src={logoName} alt="logo" />
        <Button bg="transparent" color={"white"}>
          Nueva Alabanza
        </Button>
      </Flex>
      {/* </Container> */}
    </header>
  );
};

export default Header;
