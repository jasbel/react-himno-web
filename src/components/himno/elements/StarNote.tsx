import React from 'react';
import { responsive } from '../../../res/responsive';
import Colors from '../../../res/colors';

import star from '../../../assets/images/star.png';
import unstar from '../../../assets/images/unstar.png';

interface Props {
  isFavorite: boolean;
  musicalNote: string;
}

const StarNote = ({isFavorite, musicalNote}: Props) => {
  return (
    <div style={styles.wrapIcon}>
      <img style={styles.iconStar} src={isFavorite ? star : unstar} />
      <p style={styles.note}> {musicalNote}</p>
    </div>
  );
};

export default StarNote;

const styles : { [key in any]: React.CSSProperties } ={
  wrapIcon: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    alignItems: 'flex-end',
  },
  iconStar: {
    width: 25,
    height: 25,
  },
  note: {
    fontWeight: 'bold',
    fontSize: responsive(16, 14),
    color: Colors.txtPrimary,
    // textShadowColor: Colors.txtBlack,
    // textShadowRadius: 0.1,
  },
};
