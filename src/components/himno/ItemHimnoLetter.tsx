import React from "react";
import Colors from "../../res/colors";
import { widthScreen } from "../../res/responsive";
import iconChoir from  "../../assets/images/verse.png";

interface ILetter {
  choir: string;
  paragraph: string;
}

interface Props {
  item: ILetter;
  isFinalVerse?: boolean;
  customFontSize?: number;
}

const ItemHimnoLetter = ({ item, isFinalVerse, customFontSize }: Props) => {

  console.log({item})

  return (
    <div>
      <p
        style={{
          ...styles.paragraph,
          fontSize: customFontSize,
          lineHeight: 1,
        }}
      >
        {`${item.paragraph}`} {"\n"}
      </p>
      {item.choir !== "" && (
        <>
          <div style={styles.containerIconChoir}>
            <img style={styles.iconChoir} src={iconChoir} />
          </div>
          <p
            style={{
              ...styles.choir,
              fontSize: customFontSize,
              lineHeight: 1,
            }}
          >
            {item.choir} {"\n"}
          </p>
        </>
      )}
      {isFinalVerse && <div style={styles.spaceBottom} />}
    </div>
  );
};

export default ItemHimnoLetter;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.bkgWhite,
    position: "relative",
  },
  headerButton: {},
  headerRightContainer: {
    flexDirection: "row",
  },
  spaceTop: {
    position: "absolute",
    top: 0,
    width: widthScreen,
    zIndex: 10,
  },
  spaceLinearGradient: {
    height: 18,
    width: "100%",
  },
  containerFloat: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.bkgTransparentPrimary,
    borderRadius: 50,
  },
  containerFloatFavorite: {
    backgroundColor: Colors.bkgTransparentDark,
  },
  iconStar: {
    margin: 6,
    width: 30,
    height: 30,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  paragraph: {
    fontFamily: "sans-serif-medium",
    textAlign: "center",
    color: Colors.txtBlack,
  },
  containerIconChoir: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -15,
    marginBottom: 15,
    width: 170,
  },
  iconChoir: {
    width: 170,
    height: 15,
  },
  choir: {
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    color: Colors.txtDark,
  },
  spaceBottom: {
    height: 48,
  },
};
