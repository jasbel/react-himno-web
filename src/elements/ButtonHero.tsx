import React, { useState } from "react";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import ArrowIcon from "@/assets/icons/arrow";

interface Props {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const ButtonHero = ({ title, onClick, style }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      color={Colors.bkgTransparentPrimary}
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...styles.headerButton, ...style, ...styles[hover ? "headerButtonHover" : ""] }}
    >
      <ArrowIcon color="white" size={20}></ArrowIcon>
      {title}
    </button>
  );
};

export default ButtonHero;

const styles: { [key in any]: React.CSSProperties } = {
  headerButton: {
    fontSize: responsive(30, 14),
    fontWeight: 'bold',
    lineHeight: 1,
    backgroundColor: Colors.bkgTransparentPrimary,
    margin: 4,
    color: Colors.txtWhite,
    borderWidth: 2,
    borderColor: Colors.bkgTransparentPrimary,
    borderStyle: "solid",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: responsive(40, 35),
    width: responsive(40, 35),
    // position: 'relative',
    // top: 6,
  },
  headerButtonHover: {
    backgroundColor: Colors.bkgPrimary,
    color: Colors.txtLight,
  },
  icon: {
    // backgroundColor: 'transparent',
    width: 18,
    // color: Colors.txtLight,
  },
};
