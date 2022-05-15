import React, { useState } from "react";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";

interface Props {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonHero = ({title, onClick}: Props) => {
  const [hover, setHover] = useState(false)

  return (
    <button
      color={Colors.bkgTransparentPrimary}
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...styles.headerButton, ...styles[hover ? "headerButtonHover" : ""] }}
    >
     {title}
    </button>
  );
};

export default ButtonHero;

const styles: { [key in any]: React.CSSProperties } = {
  headerButton: {
    fontSize: responsive(40, 20),
    paddingRight: 12,
    paddingLeft: 12,
    backgroundColor: Colors.bkgTransparentPrimary,
    borderRadius: 100,
    margin: 4,
    color: Colors.txtWhite,
    borderWidth: 2,
    borderColor: Colors.bkgTransparentPrimary,
    borderStyle: "solid",
  },
  headerButtonHover: {
    backgroundColor: Colors.bkgPrimary,
    color: Colors.txtLight,

  }
};
