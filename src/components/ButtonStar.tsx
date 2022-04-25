import React, { useEffect, useState } from 'react'
import Colors from '../res/colors';
import star from "../assets/images/star.png";
import unstar from "../assets/images/unstar-white.png";

export type TypeStar = 'star' | 'unstar'

interface Props {
  onToggle: (star: TypeStar) => void;
  initStar: boolean;
}

const ButtonStar = ({onToggle: toggleFavorite, initStar}: Props) => {
  const [isStar, setIsStar] = useState(initStar)
  const fav = initStar ? styles.containerFloatFavorite : {};

  const onPreToggle = () => {
    setIsStar(!isStar)
    toggleFavorite(!isStar ? 'star' : 'unstar')
  }

  useEffect(() => {
    setIsStar(initStar)
  }, [initStar])
  
  return (
    <button
        onClick={() => onPreToggle()}
        style={{
          ...styles.containerFloat,
          ...fav,
        }}
      >
        <img style={styles.iconStar} src={isStar ? star : unstar} />
      </button>
  )
}

export default ButtonStar 



const styles: { [key in any]: React.CSSProperties } = {

  containerFloat: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.bkgTransparentPrimary,
    borderRadius: 50,
  },
  iconStar: {
    margin: 6,
    width: 30,
    height: 30,
  },
};
