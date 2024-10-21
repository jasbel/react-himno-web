import React, { useEffect, useState } from "react";
import Colors from "../res/colors";
import star from "../assets/images/star.png";
import unstar from "../assets/images/unstar-white.png";
import { Box } from "@components/ui";
import { responsive } from "../utils/responsive";

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
    <Box position={'sticky'} bottom={0}>
      <button
        onClick={() => onPreToggle()}
        style={{
          ...styles.containerFloat,
          ...fav,
        }}
      >
        <img style={styles.iconStar} src={isStar ? star : unstar} />
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
    margin: responsive(6, 4),
    width: responsive(30, 25),
    height: responsive(30, 25),
  },
};
