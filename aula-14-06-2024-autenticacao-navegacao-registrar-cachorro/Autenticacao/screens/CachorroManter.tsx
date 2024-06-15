import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, firestore, storage } from "../firebase";
import { Cachorro } from "../model/Cachorro";

import meuestilo from "../meuestilo";

const ManterCachorro = () => {
  // todo: criar a view de registrar os doguinhos

  const [formCachorro, setFormCachorro] = useState<Partial<Cachorro>>({});

  const navigation = useNavigation();

  const refCachorro = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Cachorro");

  const salvar = () => {
    const cachorroRefComId = refCachorro.doc();
    const cachorro = new Cachorro(formCachorro);

    cachorro.id = cachorroRefComId;

    console.log(cachorro);

    cachorroRefComId.set(cachorro.toFirestore()).then(() => {
      alert("Cachorro " + cachorro.nome + " adicionado com sucesso.");
      cancelar();
    });
  };

  const cancelar = () => {
    setFormCachorro({});
  };

  return (
    <KeyboardAvoidingView style={meuestilo.container}>
      <View style={meuestilo.inputContainer}>
        <TextInput
          placeholder="Nome"
          value={formCachorro.nome}
          onChangeText={(nome) =>
            setFormCachorro({
              ...formCachorro,
              nome: nome,
            })
          }
          style={meuestilo.input}
        />
        <TextInput
          placeholder="Raça"
          value={formCachorro.raca}
          onChangeText={(raca) =>
            setFormCachorro({
              ...formCachorro,
              raca: raca,
            })
          }
          style={meuestilo.input}
        />
        <TextInput
          placeholder="Sexo"
          value={formCachorro.sexo}
          onChangeText={(sexo) =>
            setFormCachorro({
              ...formCachorro,
              sexo: sexo,
            })
          }
          style={meuestilo.input}
        />
        <TextInput
          placeholder="Data Nascimento"
          value={formCachorro.datanasc}
          onChangeText={(datanasc) =>
            setFormCachorro({
              ...formCachorro,
              datanasc: datanasc,
            })
          }
          style={meuestilo.input}
        />
      </View>

      <View style={meuestilo.buttonContainer}>
        <TouchableOpacity onPress={salvar} style={meuestilo.button}>
          <Text style={meuestilo.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={cancelar}
          style={[meuestilo.button, meuestilo.buttonOutline]}
        >
          <Text style={meuestilo.buttonOutlineText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ManterCachorro;
