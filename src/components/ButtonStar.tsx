import React, { useEffect, useState } from "react";
import Colors from "@/utils/colors";
import { Box } from "@components/ui";
import { responsiveCalc } from "../utils/responsive";
import StarIcon from "../assets/icons/star";

export type TypeStar = "star" | "unstar";

interface Props {
  onToggle: (star: TypeStar) => void;
  initStar: boolean;
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
}

const ButtonStar = ({ onToggle, initStar, size = "medium", showLabel = false }: Props) => {
  const [isStar, setIsStar] = useState(initStar);
  const fav = initStar ? styles.containerFloatFavorite : {};

  const onPreToggle = () => {
    setIsStar(!isStar);
    onToggle(!isStar ? "star" : "unstar");
  };

  useEffect(() => {
    setIsStar(initStar);
  }, [initStar]);

  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return {
          iconSize: 20,
          padding: 6,
          containerWidth: 32,
          containerHeight: 32,
        };
      case "large":
        return {
          iconSize: 32,
          padding: 10,
          containerWidth: 44,
          containerHeight: 44,
        };
      default:
        return {
          iconSize: 26,
          padding: responsiveCalc(6, 4),
          containerWidth: responsiveCalc(30, 25),
          containerHeight: responsiveCalc(30, 25),
        };
    }
  };

  const sizeConfig = getSizeConfig();

  return (
    <Box style={{position: 'sticky', bottom: 0}}>
      <button
        onClick={() => onPreToggle()}
        style={{
          ...styles.containerFloat,
          ...fav,
          width: showLabel ? "auto" : sizeConfig.containerWidth,
          height: sizeConfig.containerHeight,
          minWidth: showLabel ? "auto" : sizeConfig.containerWidth,
        }}
        className={showLabel ? "flex items-center gap-2 px-3 py-2" : ""}
      >
        <span style={{
          ...styles.iconStar,
          width: size === "large" ? 32 : size === "small" ? 20 : responsiveCalc(30, 25),
          height: size === "large" ? 32 : size === "small" ? 20 : responsiveCalc(30, 25),
        }}>
          <StarIcon color={isStar ? Colors.select : Colors.white} size={sizeConfig.iconSize} />
        </span>
        {showLabel && (
          <span className="text-xs font-medium">
            {isStar ? "Favorito" : "No favorito"}
          </span>
        )}
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
