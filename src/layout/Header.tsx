import { Flex } from "@components/ui";
import Colors from "../res/colors";
import { Button } from "@/components/ui/button";

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
        <Button style={{backgroundColor: Colors.bkgDark}} color={"white"}>
          Crear Nueva Alabanza
        </Button>
      </Flex>
    </header>
  );
};

export default Header;
