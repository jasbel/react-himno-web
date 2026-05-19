import React from "react";
import Colors from "@/utils/colors";
import iconChoir from "../../assets/images/verse.png";
import { responsiveCalc } from "../../utils/responsive";
import { Box } from "@components/ui";
import { useSetting } from "../../hooks/useSetting";
import ChordLyrics from "./ChordLyrics";
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
export interface ILetterExpand {
  chorusPos: string[];
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
  const hasChords = item.paragraph.includes('[') && item.paragraph.includes(']');

  return (
    <Box>
      <p
        style={{
          marginBottom: 24,
          ...styles.paragraph,
          fontSize: customFontSize,
        }}
      >
        {hasChords ? (
          <ChordLyrics text={item.paragraph} fontSize={customFontSize} />
        ) : (
          <span className="whitespace-pre-wrap break-words">{item.paragraph}</span>
        )}
      </p>
      {
         !hiddenSepare && <>
      <Separe isSmall={isSmall} />

         </>
      }

      {(item.choirs).map((choir, idx) => {
        const hasChordChoir = choir.includes('[') && choir.includes(']');
        return (
          <React.Fragment key={idx}>
            {choir !== "" && (
              <>
                <p
                  style={{
                    ...styles.choir,
                    fontSize: isSmall ? fontsmall : customFontSize,
                  }}
                >
                  {hasChordChoir ? (
                    <ChordLyrics text={choir} fontSize={isSmall ? fontsmall : customFontSize} />
                  ) : (
                    <span className="whitespace-pre-wrap break-words">{choir}</span>
                  )}
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
          </React.Fragment>
        )
      })}

    </Box>
  );
};

export default ItemHimnoLetter;

const styles: { [key in any]: React.CSSProperties } = {
  containerIconChoir: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: responsiveCalc(15, 10),
    marginBottom: responsiveCalc(15, 10),
  },
  iconChoir: {
    width: responsiveCalc(200, 100),
    height: "auto",
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
    lineHeight: 1.4,
  },
  choir: {
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    color: Colors.txtDark,
    lineHeight: 1.3,
  },
};
