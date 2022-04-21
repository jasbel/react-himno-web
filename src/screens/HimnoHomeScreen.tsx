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

      <Link to="himno" style={{ ...styles.button, ...styles.textButton }}>
        Ingresar
      </Link>

      <div style={styles.footer}>
        <p style={styles.textFooter}> Version 1.0.0. By JAsbel & Kairos </p>
      </div>
    </div>
  );
};

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: 'column',
    backgroundColor: Colors.blueLight,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    minHeight: '100vh'
  },
  logo: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.orangeDark,
    padding: 36,
    paddingLeft: 46,
    paddingRight: 46,
    borderRadius: 46,
    marginBottom: 12,
  },
  textButton: {
    color: "white",
    fontSize: 50,
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
    // position: "absolute",
    
    bottom: 12,
  },
  textFooter: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default HimnoHomeScreen;
