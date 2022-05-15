import React, { useState } from "react";
import ButtonHero from "../elements/ButtonHero";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { initialValues } from "../screens/HimnoSongScreen";

interface Props {
  title: string;
  changeFontSize?: (newSize: number) => void;
}

const Hero = ({ title, changeFontSize }: Props) => {
  const [hover, setHover] = useState(false);
  const onPressFontSize = (valueFontSize: number) => {
    changeFontSize && changeFontSize(valueFontSize);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.bkgDark,
        marginLeft: -12,
        marginRight: -12,
      }}
    >
      <ButtonHero title="<-" onClick={() => console.log('TODO: volver atras')} />

      <h1 style={{ color: Colors.txtWhite, fontSize: responsive(45, 22) }}>{title}</h1>
      {!!changeFontSize && (
        <div>
          <div style={styles.headerRightContainer}>
            <ButtonHero title="-T" onClick={() => onPressFontSize(-initialValues.fontSizeIncremental)} />

            <ButtonHero title="+T" onClick={() => onPressFontSize(initialValues.fontSizeIncremental)} />
          </div>
        </div>
      )}
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
