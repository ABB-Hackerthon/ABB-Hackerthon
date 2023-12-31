import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import IdogLogo from "../../assets/images/idog-logo.png"
import HamburgerMenu from "../../assets/images/hamburger-menu-icon.png";
import SideMenu from "./SideMenu";

const MainHeader = () => {
  const [activeSideMenu, setActiveSideMenu] = useState<Boolean>(false);
  const clickHamburger = () => {
    switch (activeSideMenu) {
      case true:
        setActiveSideMenu(false);
        break;
      case false:
        setActiveSideMenu(true);
        break;
    }
  }

  const updateActiveSideMenu = (status : Boolean) => {
    setActiveSideMenu(status)
  }

  return (
    <>
        <View style={styles.header}>
            <Text style={styles.logo}>
              <Image source={IdogLogo} style={styles.idogLogo}/>
            </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
              <Image
                  source={HamburgerMenu}
                  style={styles.menuIcon}
              />
            </TouchableOpacity>
        </View>
        {
          activeSideMenu ?
          <SideMenu updateActiveSideMenu={updateActiveSideMenu}/>
          :
          <></>
        }
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "700",
    color: "#EE8A72",
  },
  idogLogo:{
    width:60,
    height:50,
    marginBottom:-6,
  },
  menuIcon: {
    marginRight: 20,
  },
});

export default MainHeader;