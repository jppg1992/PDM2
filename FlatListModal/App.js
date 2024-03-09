import { StyleSheet, Text, View, Modal, Button, Pressable } from "react-native";
import Lista from "./Lista";
import React, { useState } from "react";

export default function App() {
  //const [modalVisible, setModalVisible] = useState(false);
  const [modalListaVisible, setModalListaVisible] = useState(false);
  const [itemLista, setItemLista] = useState({
    ...itemLista,
    id: "",
    title: "",
  });

  return (
    <View style={styles.container}>
      <Modal
        visible={modalListaVisible}
        onRequestClose={() => setModalListaVisible(!modalListaVisible)}
      >
        <View style={styles.containerList}>
          <Lista
            setModalListaVisible={setModalListaVisible}
            setItemLista={setItemLista}
          ></Lista>
        </View>
      </Modal>
      {itemLista.title ? (
        <View style={styles.detalhe}>
          <View style={styles.textContainer}>
            <Text style={styles.textoLbl}>ID</Text>
            <Text style={styles.textoLbl}>{itemLista.id}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textoLbl}>Cidade</Text>
            <Text style={styles.textoLbl}> {itemLista.title}</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      <Pressable
        style={styles.btAbrir}
        onPress={() => {
          setModalListaVisible(true);
        }}
      >
        <Text style={styles.textoBt}> Abrir Modal Lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  detalhe: {
    flex: 1,
    backgroundColor: "#fcff",
    alignItems: "left",
    justifyContent: "left",
    maxHeight: "25%",
    width: 300,
    marginBottom: 50,
    padding: 15,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    height: 25,
    flex: 1,
    border: 10,
    borderStyle: "solid",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerList: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },

  btAbrir: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fcff",
  },
  textoBt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  textoLbl: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    minWidth: 100,
    marginRight: 25,
  },
});
