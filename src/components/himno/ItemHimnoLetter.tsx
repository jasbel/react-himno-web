import React from "react";
import Colors from "../../res/colors";
import iconChoir from "../../assets/images/verse.png";
import { responsive } from "../../utils/responsive";
import { Box } from "@components/ui";
import { useSetting } from "../../hooks/useSetting";

export interface ILetter {
  choirs: string[];
  paragraph: string;
}

interface Props {
  item: ILetter;
  isSmall?: boolean;
}

const ItemHimnoLetter = ({ item, isSmall = false }: Props) => {
  const fontsmall = 12;
  const { customFontSize } = useSetting();
  return (
    <Box>
      <p
        style={{
          marginBottom: 24,
          ...styles.paragraph,
          fontSize: isSmall ? fontsmall : customFontSize,
        }}
      >
        <span style={{ whiteSpace: "pre-line" }}>{item.paragraph}</span>
      </p>
      {item.choirs.map((choir) => (
        <>
          {choir !== "" && (
            <>
              <div style={styles.containerIconChoir}>
                <img style={isSmall ? styles.iconChoirSmall : styles.iconChoir} src={iconChoir} />
              </div>
              <p
                style={{
                  ...styles.choir,
                  fontSize: isSmall ? fontsmall : customFontSize,
                }}
              >
                <span style={{ whiteSpace: "pre-line" }}>{item.choirs}</span>
              </p>
              <br />
            </>
          )}
        </>
      ))}
    </Box>
  );
};

export default ItemHimnoLetter;

const styles: { [key in any]: React.CSSProperties } = {
  containerIconChoir: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: responsive(15, 10),
    marginBottom: responsive(15, 10),
  },
  iconChoir: {
    width: responsive(500, 120),
    height: responsive(35, 11),
    margin: "auto",
  },
  iconChoirSmall: {
    width: 70,
    height: 10,
    margin: "auto",
  },
  paragraph: {
    textAlign: "center",
    color: Colors.txtBlack,
    lineHeight: 1,
  },
  choir: {
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    color: Colors.txtDark,
    lineHeight: 1,
  },
};
