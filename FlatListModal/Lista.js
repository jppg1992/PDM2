import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

const DATA = [
  {
    id: "4301602",
    title: "Bagé",
  },
  {
    id: "4304358",
    title: "Candiota",
  },
  {
    id: "4300034",
    title: "Aceguá",
  },
];

const Item = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemList} onPress={onPress}>
    <Text style={styles.textItem}>{item.title}</Text>
  </TouchableOpacity>
);

const Lista = (props) => {
  const [selectedId, setSelectedId] = useState("");
  const closeModal = (bool, item) => {
    props.setModalListaVisible(bool);
    props.setItemLista(item);
  };

  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => closeModal(false, item)} />;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    gap: 5,
  },
  itemList: {
    flex: 1,
    width: 200,
    border: "1px solid ",
    borderRadius: 10,
    backgroundColor: "#fcff",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: 5,
  },
  textItem: {
    color: "#fff",
    fontWeight: "bold",
    width: 100,
    textAlign: "center",
    fontSize: 25,
  },
});
export default Lista;
