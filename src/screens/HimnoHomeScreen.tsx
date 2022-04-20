import React, { useEffect } from "react";

// import {img, Pressable, StyleSheet, p, div} from 'react-native';
import Colors from "../res/colors";
import logo from "../assets/images/logoHome.png";
import { percent } from "../res/responsive";
import { Link } from "react-router-dom";

interface Props {}

const HimnoHomeScreen = ({}: Props) => {
  return (
    <div style={styles.container}>
      <img style={styles.logo} src={logo} alt="logo" />
      <Link to="himno">
        <div style={styles.button}>
          <p style={styles.textButton}>Ingresar</p>
        </div>
      </Link>

      <div style={styles.footer}>
        <p style={styles.textFooter}> Version 1.9.0. By JAsbel & Kairos </p>
      </div>
    </div>
  );
};

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    backgroundColor: Colors.blueLight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    marginBottom: percent(25),
  },
  button: {
    backgroundColor: Colors.orangeDark,
    padding: percent(2),
    paddingLeft: percent(4.5),
    paddingRight: percent(4.5),
    borderRadius: percent(2.8),
    marginBottom: percent(10),
  },
  textButton: {
    color: "white",
    fontSize: percent(8.8),
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "bold",
    // textShadowColor: Colors.bkgDark,
    // textShadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // textShadowRadius: 5,
  },
  footer: {
    position: "absolute",
    bottom: 12,
  },
  textFooter: {
    color: Colors.txtDark,
    fontSize: percent(2.5),
    fontWeight: "bold",
  },
};

export default HimnoHomeScreen;
