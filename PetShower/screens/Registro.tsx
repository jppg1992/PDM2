import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, firestore } from "../firebase";
import { Usuario } from "../model/Usuario";

const Registro = () => {
  const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});

  const refUsuario = firestore.collection("Usuario");

  const navigation = useNavigation();

  const criarRegistro = () => {
    auth
      .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
      .then((userCredentials) => {
        const user = userCredentials.user;

        const refComIdUsuario = refUsuario.doc(auth.currentUser.uid);

        // const usuario=new Usuario(formUsuario)

        refComIdUsuario.set({
          // usuario
          id: auth.currentUser.uid,
          nome: formUsuario.nome,
          email: formUsuario.email,
          // senha: formUsuario.senha,
          datanasc: formUsuario.datanasc,
        });

        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={formUsuario.nome}
        onChangeText={(nome) =>
          setFormUsuario({
            ...formUsuario,
            nome: nome,
          })
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={formUsuario.email}
        onChangeText={(email) =>
          setFormUsuario({
            ...formUsuario,
            email: email,
          })
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry={true}
        value={formUsuario.senha}
        onChangeText={(senha) =>
          setFormUsuario({
            ...formUsuario,
            senha: senha,
          })
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Data Nascimento"
        value={formUsuario.datanasc}
        onChangeText={(datanasc) =>
          setFormUsuario({
            ...formUsuario,
            datanasc: datanasc,
          })
        }
        style={styles.input}
      />

      <TouchableOpacity onPress={criarRegistro} style={styles.button}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#77f569",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "70%",
  },
});
