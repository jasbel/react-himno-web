import { Button, Flex } from "@components/ui";

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
        {/* <Image src={logoName} alt="logo" /> */}
        <Button bg="transparent" color={"white"}>
          Crear Nueva Alabanza
        </Button>
      </Flex>
      {/* </Container> */}
    </header>
  );
};

export default Header;
