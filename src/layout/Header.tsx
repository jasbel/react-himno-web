import { Button, Flex } from "@components/ui";
import Colors from "../res/colors";

// import logo from "../logo.svg";
// import { responsive } from "../utils/responsive";

const Header = () => {
  return (
    <header className="header bg-blue-800">
      <Flex
        style={{
          backgroundColor: Colors.bkgPrimary,
          justifyContent: 'space-between',
          alignItems:  "center",
        }}
      >
        <Button bg="transparent" color={"white"}>
          Crear Nueva Alabanza
        </Button>
      </Flex>
    </header>
  );
};

export default Header;
