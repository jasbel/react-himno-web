import React from "react";

import Colors from "../res/colors";
import logo from "../assets/images/logoHome.png";
import imgChurch from "../assets/images/church.png";
import { Link } from "react-router-dom";
import { responsiveStr } from "../utils/responsive";
import { ERoutes } from "../res/enum";
import { Button } from "@/components/ui/button";

interface Props {}

const HimnoHomeScreen = ({}: Props) => {
  return (
    <div style={styles.container}>
      <img style={styles.logo} src={logo} alt="logo" />

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/*  */}
        <Link to={ERoutes.home}>
          <Button style={{ ...styles.button }}>Ingresar</Button>
        </Link>
        
        <Link to={ERoutes.homeQuechua} >
          <Button style={{ ...styles.button }}>Quechua</Button>
        </Link>

        <Link to={ERoutes.homeList}>
          <Button style={{ ...styles.button }}>Listado</Button>
        </Link>

        {/* <Link to={ERoutes.addHimno} >
          <Button style={{ ...styles.button, backgroundColor: Colors.bkgPrimary }}>Nuevo Himno</Button>
        </Link> */}

        <Link to={ERoutes.homeOld}>
          <Button style={{ ...styles.button,  ...styles.button2 }}>Version Anterior</Button>
        </Link>

        <a style={{ ...styles.button,  ...styles.buttonHref }} href="https://6822c3930e3cddbf77471418--heroic-praline-747316.netlify.app/himno-ibb.apk" download>
          Descargar APK
        </a>
      </div>

      <img style={styles.church} src={imgChurch} alt="logo" />

      <div style={styles.footer}>
        <p style={styles.textFooter}>Version 1.2.0</p>

        <p>
          Soporte: <a href="https://asbel.dev" className="text-blue-900 ">asbel.dev</a>, Kairos
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
    backgroundColor: Colors.orangeDark,
    color: "white",
    fontSize: responsiveStr(32, 20),
    marginBottom: 20,

  },
  button2: {
    fontSize: 14,
    backgroundColor: 'red',
  },
  buttonHref: {
    // fontSize: 14,
    padding:"2px 24px",
    borderRadius: "25px",
    fontWeight: 'bold',
    textTransform: "uppercase",
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
