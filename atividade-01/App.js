import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./screens/Login";
import Lista from "./screens/Lista";
import Agendamento from "./screens/Agendamento";

function LoginScreen() {
  return <Login />;
}

function AgendamentosScreen() {
  return <Lista />;
}

function AgendamentoScreen() {
  return <Agendamento />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Agendamentos" component={AgendamentosScreen} />
        <Drawer.Screen name="Agendamento" component={AgendamentoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
