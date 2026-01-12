import React from "react";
import Colors from "@/utils/colors";
import iconChoir from "../../assets/images/verse.png";
import { responsive } from "../../utils/responsive";
import { Box } from "@components/ui";
import { useSetting } from "../../hooks/useSetting";
const Separe = ({ isSmall = false }: { isSmall: boolean }) => {
  return (
    <div style={styles.containerIconChoir}>
      <div>
        <img style={isSmall ? styles.iconChoirSmall : styles.iconChoir} src={iconChoir} />
      </div>
    </div>
  );
};


export interface ILetter {
  choirs: string[];
  paragraph: string;
}

interface Props {
  item: ILetter;
  isSmall?: boolean;
  hiddenSepare?: boolean;
}

const ItemHimnoLetter = ({ item, isSmall = false, hiddenSepare }: Props) => {
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
        <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{item.paragraph}</span>
      </p>
      {
         !hiddenSepare && <>
      <Separe isSmall={isSmall} />

         </>
      }

      {item.choirs.map((choir) => (
        <>
          {choir !== "" && (
            <>
              <p
                style={{
                  ...styles.choir,
                  fontSize: isSmall ? fontsmall : customFontSize,
                }}
              >
                <span className="whitespace-pre-wrap break-words">{item.choirs}</span>
              </p>
              {
                (!hiddenSepare && item.choirs.length > 0) && (
                  <>
                    <br />
                    <Separe isSmall={isSmall} />
                  </>
                )
              }

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
    width: responsive(350, 70),
    height: responsive(20, 11),
    margin: "auto",
  },
  iconChoirSmall: {
    width: 60,
    height: 8,
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
