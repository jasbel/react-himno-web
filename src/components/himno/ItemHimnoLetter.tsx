import React from "react";
import Colors from "../../res/colors";
import { widthScreen } from "../../res/responsive";
import iconChoir from "../../assets/images/verse.png";
import { responsive } from "../../utils/responsive";

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

  return (
    <div>
      <p
        style={{
          ...styles.paragraph,
          fontSize: customFontSize,
          lineHeight: 1,
        }}
      >
        <span style={{ whiteSpace: "break-spaces" }}>{item.paragraph}</span>
        {/* <span style={{ whiteSpace: "pre" }}>{item.paragraph}</span> */}
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
            <span style={{ whiteSpace: "break-spaces" }}>{item.choir}</span>
          </p>
          <br />

        </>
      )}
      {isFinalVerse && <div style={styles.spaceBottom} />}
    </div>
  );
};

export default ItemHimnoLetter;

const styles: { [key in any]: React.CSSProperties } = {
  paragraph: {
    fontFamily: "sans-serif-medium",
    textAlign: "center",
    color: Colors.txtBlack,
  },
  containerIconChoir: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 15,
    // width: responsive(1000, 170),
    // textAlign: 'center',
    // backgroundColor: 'red',
  },
  iconChoir: {
    width: responsive(500, 170),
    height: responsive(35, 17),
    margin: "auto",
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
