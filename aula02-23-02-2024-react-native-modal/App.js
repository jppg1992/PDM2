import React, { useState } from "react";
import Modal from "react-native-modal";

import { Button, StyleSheet, Text, View } from "react-native";

function ModalReactNative() {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const switchModalVisibility = () => {
    setModalVisible(!isModalVisible);
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
          <Button title="Close modal" onPress={switchModalVisibility} />
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
  },
  viewModal: {
    flex: 1,
    backgroundColor: "#fcd",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 200,
    marginTop: 200,
  },
});
