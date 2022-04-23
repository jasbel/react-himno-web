import React from "react";
import Colors from "../res/colors";
import { initialValues } from "../screens/HimnoSongScreen";

interface Props {
  title: string;
  changeFontSize?: (newSize: number) => void;
}

const Hero = ({ title, changeFontSize }: Props) => {
  const onPressFontSize = (valueFontSize: number) => {
    changeFontSize && changeFontSize(valueFontSize);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.bkgDark,
        marginLeft: -12,
        marginRight: -12,
      }}
    >
      <h1 style={{ color: Colors.txtWhite }}>{title}</h1>
      {!!changeFontSize && (
        <div>
          <div style={styles.headerRightContainer}>
            <button
              color={Colors.bkgTransparentPrimary}
              onClick={() =>
                onPressFontSize(-initialValues.fontSizeIncremental)
              }
              title="-T"
              style={{ fontSize: 20 }}
            >
              -T
            </button>
            <button
              color={Colors.bkgTransparentPrimary}
              onClick={() => onPressFontSize(initialValues.fontSizeIncremental)}
              title="+T"
              style={{ fontSize: 20 }}
            >
              +T
            </button>
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
};
