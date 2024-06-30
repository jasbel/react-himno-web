import React from "react";
import Colors from "../../res/colors";
import iconChoir from "../../assets/images/verse.png";
import { responsive } from "../../utils/responsive";
import { Box } from "@chakra-ui/react";
import { useSetting } from "../../hooks/useSetting";

export interface ILetter {
  choirs: string[];
  paragraph: string;
}

interface Props {
  item: ILetter;
}

const ItemHimnoLetter = ({ item }: Props) => {
  const { customFontSize } = useSetting();
  return (
    <Box>
      <p
        style={{
          ...styles.paragraph,
          fontSize: customFontSize,
        }}
      >
        <span style={{ whiteSpace: "break-spaces" }}>{item.paragraph}</span>
        {/* whiteSpace: "pre" */}
      </p>
      {item.choirs.map((choir) => (
        <>
          {choir !== "" && (
            <>
              <div style={styles.containerIconChoir}>
                <img style={styles.iconChoir} src={iconChoir} />
              </div>
              <p
                style={{
                  ...styles.choir,
                  fontSize: customFontSize,
                }}
              >
                <span style={{ whiteSpace: "break-spaces" }}>{item.choirs}</span>
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
