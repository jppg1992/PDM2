import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePicker from "react-native-modal-datetime-picker";

import { useNavigation } from "@react-navigation/native";
const Agendamento = () => {
  const [modalListaVisible, setModalListaVisible] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [dataAgenda, setDataAgenda] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  handleConfirm = (date) => {
    setDataAgenda(date.toLocaleString("pt-Br"));
    //console.warn(`A data é ${date.toLocaleString("pt-Br")}`);
    hideDatePicker();
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Modal
        visible={modalListaVisible}
        onRequestClose={() => setModalListaVisible(!modalListaVisible)}
      >
        <View style={styles.container}>
          <Text>Salvo Com sucesso</Text>
          <Image
            source={require("../assets/mark2.gif")}
            style={{ width: 180, height: 180 }}
          />

          <TouchableOpacity
            style={styles.btAbrir}
            onPress={() => {
              setModalListaVisible(false);
              navigation.navigate("Agendamentos");
            }}
            onLongPress={() => {
              setModalListaVisible(false);
              navigation.navigate("Agendamentos");
            }}
          >
            <View style={styles.detalheItem}>
              <Text style={styles.textoBt}>Ok</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descrição Agenda"
          onChangeText={(val1) => setDescricao(val1 === "" ? 0 : val1)}
          value={descricao}
        ></TextInput>
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Data Agenda "
          value={dataAgenda}
        ></TextInput>
        <Button title="Selecionar Data" onPress={showDatePicker} />
        <DateTimePicker
          style={styles.inputDatetime}
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />

        <TouchableOpacity
          style={styles.btAbrir}
          onPress={() => setModalListaVisible(true)}
          onLongPress={() => setModalListaVisible(true)}
        >
          <View style={styles.detalheItem}>
            <Text style={styles.textoBt}>Salvar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Agendamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    padding: 10,
    gap: 15,
  },
  input: {
    backgroundColor: "#A0A0A0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: "white",
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
    justifyContent: "center",
  },
  btAbrir: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "green",
    textAlign: "center",
  },
  textoBt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
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
