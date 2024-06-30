import React from "react";

import Colors from "../res/colors";
import logo from "../assets/images/logoHome.png";
import imgChurch from "../assets/images/church.png";
import { Link } from "react-router-dom";
import { responsive, responsiveStr } from "../utils/responsive";

interface Props {}

const HimnoHomeScreen = ({}: Props) => {
  return (
    <div style={styles.container}>
      <img style={styles.logo} src={logo} alt="logo" />

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Link to="himno" style={{ ...styles.button }}>
          Ingresar
        </Link>
        <Link to="himnos" style={{ ...styles.button, ...styles.button2 }}>
          No Ingresar
        </Link>
      </div>

      <img style={styles.church} src={imgChurch} alt="logo" />

      <div style={styles.footer}>
        <p style={styles.textFooter}>Version 1.1.0</p>

        <p>
          Soporte: <a href="https://asbel.dev">asbel.dev</a>, Kairos
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
    padding: 20,
  },
  logo: {
    marginTop: 12,
    marginBottom: 30,
    maxWidth: responsiveStr(600, 180),
  },
  church: {
    maxWidth: responsiveStr(300, 100),
    margin: 12,
  },
  button: {
    width: "100%",
    textAlign: "center",
    backgroundColor: Colors.orangeDark,
    padding: responsiveStr(20, 10),
    paddingLeft: responsiveStr(46, 36),
    paddingRight: responsiveStr(46, 36),
    borderRadius: responsiveStr(46, 26),
    marginLeft: 24,
    marginRight: 24,
    marginBottom: "12px",

    color: "white",
    fontSize: responsiveStr(46, 26),
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  button2: {
    fontSize: 14,
    backgroundColor: 'red',
  },
  footer: {},
  textFooter: {
    color: Colors.txtDark,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default HimnoHomeScreen;
