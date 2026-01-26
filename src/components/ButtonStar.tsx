import React, { useEffect, useState } from "react";
import Colors from "@/utils/colors";
import { Box } from "@components/ui";
import { responsiveCalc } from "../utils/responsive";
import StarIcon from "../assets/icons/star";

export type TypeStar = "star" | "unstar";

interface Props {
  onToggle: (star: TypeStar) => void;
  initStar: boolean;
}

const ButtonStar = ({ onToggle, initStar }: Props) => {
  const [isStar, setIsStar] = useState(initStar);
  const fav = initStar ? styles.containerFloatFavorite : {};

  const onPreToggle = () => {
    setIsStar(!isStar);
    onToggle(!isStar ? "star" : "unstar");
  };

  useEffect(() => {
    setIsStar(initStar);
  }, [initStar]);

  return (
    <Box style={{position: 'sticky', bottom: 0}}>
      <button
        onClick={() => onPreToggle()}
        style={{
          ...styles.containerFloat,
          ...fav,
        }}
      >
        <span style={styles.iconStar}>
          <StarIcon color={isStar ? Colors.select : Colors.white} size={26} />
        </span>
      </button>
    </Box>
  );
};

export default ButtonStar;

const styles: { [key in any]: React.CSSProperties } = {
  containerFloat: {
    position: "absolute",
    bottom: 4,
    right: 2,
    backgroundColor: Colors.bkgTransparentPrimary,
    borderRadius: 50,
  },
  iconStar: {
    margin: responsiveCalc(6, 4),
    width: responsiveCalc(30, 25),
    height: responsiveCalc(30, 25),
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
