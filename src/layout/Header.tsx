import { Flex } from "@components/ui";
import Colors from "@/utils/colors";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="header bg-blue-800">
      <Flex
        style={{
          // backgroundColor: Colors.bkgPrimary,
          justifyContent: 'space-between',
          alignItems:  "center",
        }}
      >
        <Button className={`text-white`} variant="secondary">
          Crear Nueva Alabanza
        </Button>
      </Flex>
    </header>
  );
};

export default Header;
