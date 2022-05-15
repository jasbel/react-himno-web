import React, { useEffect } from "react";

// import {img, Pressable, StyleSheet, p, div} from 'react-native';
import Colors from "../res/colors";
import logo from "../assets/images/logoHome.png";
import imgChurch from "../assets/images/church.png";
import { percent } from "../res/responsive";
import { Link } from "react-router-dom";
import { responsive } from "../utils/responsive";

interface Props {}

const HimnoHomeScreen = ({}: Props) => {
  return (
    <div style={styles.container}>
      <img style={styles.logo} src={logo} alt="logo" />

      <Link to="himno" style={{ ...styles.button, ...styles.textButton }}>
        Ingresar
      </Link>

      <img style={styles.church} src={imgChurch} alt="logo" />

      <div style={styles.footer}>
        <p style={styles.textFooter}>
          {" "}
          Version 1.0.1. By
          <a href="https://asbel.dev">asbel.dev</a>& Kairos{" "}
        </p>
      </div>
    </div>
  );
};

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    minHeight: "100vh",
    padding: 12,
  },
  logo: {
    marginTop: 12,
    marginBottom: 30,
  },
  church: {
    maxWidth: responsive(300, 100),
    margin: 12,
  },
  button: {
    backgroundColor: Colors.orangeDark,
    padding: responsive(20, 16),
    paddingLeft: responsive(46, 36),
    paddingRight: responsive(46, 36),
    borderRadius: responsive(46, 36),
    marginBottom: 12,
  },
  textButton: {
    color: "white",
    fontSize: responsive(46, 32),
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  footer: {},
  textFooter: {
    color: Colors.txtDark,
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default HimnoHomeScreen;
