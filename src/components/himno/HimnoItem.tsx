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
      const inFav = findFav(item.id)
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
        <div style={{ display: 'flex', flex: 1 , justifyContent: 'space-between', alignItems: 'center'}}>
          <p style={{ ...styles.title, ...styles.oneLine }}> {title_es}</p>
          <p style={{ ...styles.description, ...styles.oneLine }}> {description_es}</p>
        </div>

        <StarNote isFavorite={isFavorite} musicalNote={musicalNote} />
      </div>
    </button>
  );
};

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
    flex: 1,
    width: '100%'
  },
  content: {
    display: 'flex',
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
    textTransform: 'uppercase',
  },
  description: {
    fontSize: responsive(17, 16),
    color: Colors.txtBlack,
    paddingLeft: 8
  },
  oneLine: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
};

export default HimnoItem;
