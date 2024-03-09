import React, { useState } from "react";
import Modal from "react-native-modal";

import { Button, StyleSheet, Text, View, Image } from "react-native";

function ModalReactNative() {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalSaveVisible, setModalSaveVisible] = React.useState(false);

  const switchModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const switchModalSaveVisibility = () => {
    setModalSaveVisible(!isModalSaveVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Open modal" onPress={switchModalVisibility} />
      <Modal
        isVisible={isModalVisible}
        animationIn={"slideInUp"}
        animationInTiming={500}
        animationOutTiming={500}
        backdropColor="black"
      >
        <View style={styles.viewModal}>
          <Text>Nosso novo modal</Text>
          <Image
            source={require("./assets/ninja.gif")}
            style={{ width: 180, height: 180 }}
          />
          <Button title="Close modal" onPress={switchModalVisibility} />
        </View>
      </Modal>

      <Button title="Salvar" onPress={switchModalSaveVisibility} />
      <Modal
        isVisible={isModalSaveVisible}
        animationIn={"slideInUp"}
        animationInTiming={500}
        animationOutTiming={500}
        backdropColor="black"
      >
        <View style={styles.viewModalSave}>
          <Text>Salvo Com sucesso</Text>
          <Image
            source={require("./assets/mark2.gif")}
            style={{ width: 180, height: 180 }}
          />
          <Button title="Close modal" onPress={switchModalSaveVisibility} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalReactNative;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  viewModal: {
    flex: 1,
    backgroundColor: "#fcd",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    marginTop: 100,
  },

  viewModalSave: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    marginTop: 100,
  },
});
