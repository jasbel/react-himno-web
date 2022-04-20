import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Colors from "../../res/colors";
import { Songs } from "../../types/types";
import HimnoItem from "../himno/HimnoItem";
import FavoriteEmptyState from "./FavoriteEmptyState";

interface Props {
  // navigation: any;
  favorites: any[];
}

const Favorites = ({ favorites }: Props) => {
  const navigate = useNavigate();

  const handlePress = useCallback((himno: any) => {
    // navigation.navigate("HimnoSongScreen", { himno });
    console.log("TODO: manda a HimnoSongScreen", {himno});
    navigate("/himno-song", { replace: true });
  }, [navigate]);

  return (
    <div style={styles.container}>
      {!favorites.length && <FavoriteEmptyState />}

      {favorites.map((item: Songs) => (
        <HimnoItem key={item.id} item={item} onClick={() => handlePress(item)} />
      ))}
    </div>
  );
};

export default Favorites;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.bkgLight,
    paddingTop: 12,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.yellow,
    // marginBottom: 12,
  },
};
