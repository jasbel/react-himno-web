import { Box, Flex, Heading } from "@components/ui";
import { useNavigate } from "react-router-dom";
import ButtonHero from "@/components/elements/ButtonHero";
import Colors from "@/utils/colors";
import { responsiveCalc } from "@/utils/responsive";

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
      <Box className="hidden md:block" style={{ position: "fixed", top: -2, zIndex: 10, left: 0 }}>
        <ButtonHero title="" onClick={() => onPreBefore()} />
      </Box>

      <Box style={{ backgroundColor:Colors.orangeDark, justifyContent: "center" , padding: "8px 4px"}}  >
        <Heading style={{fontSize: responsiveCalc(36, 20), color: Colors.txtWhite,textAlign: "center", padding: "0 8px"}}>
          {title}
        </Heading>
      </Box>
    </>
  );
};

export default Hero;
