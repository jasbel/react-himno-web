import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonHero from "../elements/ButtonHero";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { initialValues } from "../screens/HimnoSongScreen";

interface Props {
  title: string;
  changeFontSize?: (newSize: number) => void;
  hrefBefore: string;
}

const Hero = ({ title, changeFontSize, hrefBefore }: Props) => {
  const navigate = useNavigate();

  const onPressFontSize = (valueFontSize: number) => {
    changeFontSize && changeFontSize(valueFontSize);
  };

  const onPreBefore = () => {
    navigate(hrefBefore);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.bkgDark,
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <ButtonHero title="<<" onClick={() => onPreBefore()} />

      <h1 style={{ color: Colors.txtWhite, fontSize: responsive(45, 28) }}>{title}</h1>
      <div>
        {!!changeFontSize && (
          <div style={styles.headerRightContainer}>
            <ButtonHero title="-T" onClick={() => onPressFontSize(-initialValues.fontSizeIncremental * 3)} />

            <ButtonHero title="+T" onClick={() => onPressFontSize(initialValues.fontSizeIncremental * 3)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

const styles: { [key in any]: React.CSSProperties } = {
  headerRightContainer: {
    flexDirection: "row",
  },
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
  },
};
