import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Button } from "react-native";

function ModalTeste() {
  const [isModalVisible, setModalVisible] = useState(false);

  const switchModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Clique aqui" onPress={switchModalVisibility} />
      <Modal visible={isModalVisible} children>
        <View style={styles.modalView}>
          <Text>Olá Modal!!</Text>
          <Button
            title="Sair Modal"
            onPress={switchModalVisibility}
            style={styles.modalBtn}
          />
        </View>
      </Modal>
    </View>
  );
}

export default ModalTeste;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    marginBottom: 200,
    marginTop: 100,
    marginHorizontal: 25,
    borderRadius: 15,
  },
  modalBtn: {
    marginTop: 50,
    backgroundColor: "gray",
  },
});
