import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "4301602",
    title: "Evento a",
    dataEvento: "15/03/2024 8:30:00",
  },
  {
    id: "4301603",
    title: "Evento a",
    dataEvento: "15/03/2024 8:30:00",
  },
  {
    id: "4301604",
    title: "Evento a",
    dataEvento: "15/03/2024 8:30:00",
  },
];

const Item = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemList} onPress={onPress}>
    <Text style={styles.textItem}>{item.title}</Text>
    <Text style={styles.textItem}>{item.dataEvento}</Text>
  </TouchableOpacity>
);

const Lista = () => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return (
      <Item item={item} onPress={() => navigation.navigate("Agendamento")} />
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </View>
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
    backgroundColor: "#A0A0A0",
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
    fontSize: 15,
  },
});
export default Lista;
