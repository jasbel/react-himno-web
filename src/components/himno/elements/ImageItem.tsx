import React from "react";
import Colors from "../../../res/colors";
import { responsive } from "../../../res/responsive";
import icon from "../../../assets/images/play.png";

interface Props {
  num: string;
  isFavorite: boolean;
}

const ImageItem = ({ isFavorite, num }: Props) => {
  const favWrap = !!isFavorite ? styles.figureIsFavorite : {};
  const fav = !!isFavorite ? styles.numberHimnoFavorite : {};

  const getNumber = () => {
    if (typeof Number(num) !== "number") return num;
    return parseInt(num, 10) + 1;
  };

  return (
    <div style={{ ...styles.figure, ...favWrap }}>
      <p style={{ ...styles.numberHimno, ...fav }}>{getNumber()}</p>
      <img style={styles.icon} src={icon} />
    </div>
  );
};

export default ImageItem;

const styles: { [key in any]: React.CSSProperties } = {
  numberHimno: {
    fontFamily: "sans-serif-condensed",
    fontSize: responsive(16, 15),
    lineHeight: 1,
    fontWeight: "bold",
    position: "absolute",
    top: 3,
    left: 2,
    color: Colors.bkgTransparentPrimary,
  },
  numberHimnoFavorite: {
    color: Colors.bkgPrimary,
  },
  icon: {
    width: responsive(30, 23),
    height: responsive(34, 28),
  },
  figure: {
    backgroundColor: Colors.white,
    borderColor: Colors.bkgLight,
    borderRadius: 8,
    borderWidth: 2,
    paddingTop: 10,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 2,
    marginRight: 5,
    alignSelf: "center",
    position: "relative",
  },
  figureIsFavorite: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.primary,
  },
};
