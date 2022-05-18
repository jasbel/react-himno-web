import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { findFav } from "../../libs/storage";
import Colors from "../../res/colors";
import { responsive } from "../../res/responsive";
import { Songs } from "../../types/types";
import ImageItem from "./elements/ImageItem";
import StarNote from "./elements/StarNote";

interface Props {
  item: Songs;
  onClick: () => void;
}

const HimnoItem = ({ item, onClick }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { title_es, description_es, id, musicalNote } = item;

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
    <button style={styles.container} onClick={onClick}>
      <ImageItem id={id} isFavorite={isFavorite} />

      <div style={styles.content}>
        <Flex
          justifyContent={"space-between"}
          alignItems={{ base: "start", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          textAlign="left"
        >
          <Text style={{ ...styles.title }} noOfLines={1}>
            {title_es}
          </Text>
          <Text style={{ ...styles.description }} noOfLines={1}>
            {description_es}
          </Text>
        </Flex>

        <StarNote isFavorite={isFavorite} musicalNote={musicalNote} />
      </div>
    </button>
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

export default HimnoItem;
