import { Box, Flex, Heading } from "@components/ui";
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
      <Box style={{ position: "fixed", top: -2, zIndex: 10, left: 0 }}>
        <ButtonHero title="" onClick={() => onPreBefore()} />
      </Box>
      
      <Box style={{ backgroundColor:Colors.orangeDark, justifyContent: "center" , padding: 2}}  >
        <Heading style={{fontSize: responsive(36, 22), color: Colors.txtWhite,textAlign: "center"}}>
          {title}
        </Heading>
      </Box>
    </>
  );
};

export default Hero;
