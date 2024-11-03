import { Flex, Text } from "@components/ui";
import React, { useEffect, useState } from "react";
import { findFav } from "../../libs/storage";
import Colors from "../../res/colors";
import { responsive } from "../../res/responsive";
import { ISongNew } from "../../types/types";
import ImageItem from "./elements/ImageItem";
import StarNote from "./elements/StarNoteNew";

interface Props {
  item: ISongNew;
  onClick: () => void;
}

const HimnoItemNew = ({ item, onClick }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { title, code, musicalNote, paragraphs} = item;

  const getFavorite = () => {
    try {
      const inFav = findFav(item.id);
      setIsFavorite(!!inFav);
    } catch (error) {
      console.log(" Get Favorite Error:  ", error);
    }
  };

  useEffect(() => {
    getFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex >
      <button style={styles.container} onClick={onClick}>
        <ImageItem num={code} isFavorite={isFavorite} />

        <div style={styles.content}>
          <Flex
            justifyContent={"space-between"}
            alignItems={{ base: "start", md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
            textAlign="left"
          >
            <Text style={{ ...styles.title }} noOfLines={1}>
              {title}
            </Text>
            <Text style={{ ...styles.description }} noOfLines={1}>
              {paragraphs[0].paragraph}
            </Text>
          </Flex>
        </div>
      </button>
      <StarNote isFavorite={isFavorite} musicalNote={musicalNote} songId={item.id} />
    </Flex>
  );
};

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    overflowX: "hidden",
  },
  content: {
    display: "flex",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: Colors.bkgLight,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: responsive(20, 18),
    color: Colors.txtPrimary,
    textTransform: "uppercase",
    lineHeight: 1,
  },
  description: {
    fontSize: responsive(17, 16),
    color: Colors.txtBlack,
    paddingLeft: 8,
  },
};

export default HimnoItemNew;
