import React from 'react';
import Colors from '../../res/colors';

const FavoriteEmptyState = () => {
    return (
        <div style={styles.container}>
            <p style={styles.text}> Aun no hay una alabanza en favoritos </p>
        </div>
    );
};

const styles : { [key in any]: React.CSSProperties } ={
    container: {
        // paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: Colors.bkgLight,
        // marginBottom: 12,
    },
    text: {
        backgroundColor: Colors.bkgLight,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        padding: 3,
        textAlign: 'center',
        borderRadius: 6,
    },
};

export default FavoriteEmptyState;
