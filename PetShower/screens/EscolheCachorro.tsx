import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Cachorro } from "../model/Cachorro";

export const EscolheCachorro = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true
  const [cachorros, setCachorros] = useState<Cachorro[]>([]); // Initial empty array
  const [isRefreshing, setIsRefreshing] = useState(true);

  const cachorroRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Cachorro");

  useEffect(() => {
    if (loading) {
      const subscriber = cachorroRef.onSnapshot((querySnapshot) => {
        const cachorros = [];
        querySnapshot.forEach((documentSnapshot) => {
          cachorros.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setCachorros(cachorros);
        setLoading(false);
      });
      return () => subscriber();
    }
  }, [cachorros]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const closeModal = (bool, item) => {
    console.log(item);
    props.setModalCachorroVisible(bool);
    props.setCachorro(item);
  };

  const renderCachorro = ({ item }: { item: Cachorro }) => {
    return (
      <View style={styles.itemCard} key={item.id}>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? "#f1f1f1" : "transparent" }, styles.listItem]}
          onLongPress={() => {
            closeModal(false, item);
          }}
          //onLongPress={() => deleteTipoUsuario(item)}
          //onPress={() => { editTipoUsuario(item) }}
          onPress={() => {
            closeModal(false, item);
          }}
        >
          {
            // <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
          }
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Nome: {item.nome ?? "-"}</Text>
            <Text>Raça: {item.raca.raca ?? "-"}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={meuestilo.containerlistar}>
      <FlatList data={cachorros} renderItem={renderCachorro} keyExtractor={(item) => item.id} refreshing={isRefreshing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  emptyList: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  itemCard: {
    backgroundColor: "#fff",
    shadowColor: "#222222",
    shadowOffset: { height: 1, width: 1 },
  },
  itemImage: {
    width: 64,
    height: 64,
    marginLeft: 10,
    marginRight: 15,
    backgroundColor: "#eee",
  },
});
