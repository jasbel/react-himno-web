import { Flex, TextSingle } from "@components/ui";
import React, { useEffect, useState } from "react";
import { findFav } from "../../libs/storage";
import Colors from "../../res/colors";
import { responsive } from "../../res/responsive";
import { type ID } from "../../types/types";
import ImageItem from "./elements/ImageItem";
import StarNote from "./elements/StarNoteNew";



interface Props {
  id: ID,
  title: string,
  num: string,
  note: string,
  description: string,
  style?: React.CSSProperties;
  onClick: () => void;
}

const HimnoItem = ({
  id,
  title,
  num,
  note,
  description,
  onClick,
  style
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavorite = () => {
    try {
      const inFav = findFav(id);
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
    <Flex style={{ ...style, order: isFavorite ? -1 : undefined }}>
      <button style={styles.container} onClick={onClick}>
        <ImageItem num={num} select={isFavorite} />

        <div style={styles.content}>
          <Flex
            style={{
              justifyContent: "space-between",
              alignItems: 'start',
              flexDirection: "column",
              textAlign: "left"
            }}
          >
            <TextSingle style={{ ...styles.title }}>
              {title}
            </TextSingle>
            <TextSingle style={{ ...styles.description }}>
              {description}
            </TextSingle>
          </Flex>
        </div>
      </button>
      <StarNote isFavorite={isFavorite} musicalNote={note} songId={id} />
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

export default HimnoItem;
