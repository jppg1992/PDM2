import { StatusBar } from "expo-status-bar";
import { useState, useNavigator } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [login, setLogin] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Login "
          onChangeText={(val1) => setLogin(val1 === "" ? 0 : val1)}
          value={login}
        ></TextInput>

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(val2) => setPassword(val2 === "" ? 0 : val2)}
          value={password}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.btAbrir}
        onPress={() => navigation.navigate("Agendamentos")}
        onLongPress={() => navigation.navigate("Agendamentos")}
      >
        <View style={styles.detalheItem}>
          <Text style={styles.textoBt}>Entrar</Text>
        </View>
      </TouchableOpacity>
      {
        // <StatusBar style="auto" />
      }
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: "20%",
  },
  input: {
    backgroundColor: "#A0A0A0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 32,
  },
  itemImage: {
    width: 32,
    height: 32,
    marginLeft: 4,
    marginRight: 8,
    backgroundColor: "#eee",
    borderRadius: 40,
    elevation: 2,
  },
  detalheItem: {
    display: "flex",
    flexDirection: "row",
  },
  textItem: {
    color: "#fff",
    fontWeight: "bold",
    width: 100,
    textAlign: "center",
    fontSize: 25,
  },
  btAbrir: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
    textAlign: "center",
  },
  textoBt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
