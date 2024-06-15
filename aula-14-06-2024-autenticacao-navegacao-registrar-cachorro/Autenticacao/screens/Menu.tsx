import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ManterCachorro from "./CachorroManter";
import HomeScreen from "./HomeScreen";

function ManterScreen({ navigation }) {
  return <ManterCachorro />;
}

function Logout({ navigation }) {
  return <HomeScreen></HomeScreen>;
}

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    <Drawer.Navigator initialRouteName="Manter Cachorro">
      <Drawer.Screen name="Manter Cachorro" component={ManterScreen} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}
