import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const Exemplo = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  handleConfirm = (date) => {
    console.warn(`A data é ${date.toLocaleString("pt-Br")}`);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar Data" onPress={showDatePicker} />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
    </View>
  );
};

export default Exemplo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
