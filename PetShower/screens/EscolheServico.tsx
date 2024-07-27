import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Servico } from "../model/Servico";

export const EscolheServico = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true
  const [servicos, setServicos] = useState<Servico[]>([]); // Initial empty array
  const [isRefreshing, setIsRefreshing] = useState(true);

  const servicoRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Servico");

  useEffect(() => {
    const subscriber = servicoRef.onSnapshot((querySnapshot) => {
      const servicosTmp = [];
      querySnapshot.forEach((documentSnapshot) => {
        servicosTmp.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setServicos(servicosTmp);
      setLoading(false);
    });
    return () => subscriber();
  }, [servicos]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const closeModal = (bool, item) => {
    console.log(item);
    props.setModalServicoVisible(bool);
    props.setServico(item);
  };

  const renderServico = ({ item }: { item: Servico }) => {
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
          {/* <Image source={{ uri: item.imageUri }} style={styles.itemImage} /> */}
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Serviço: {item.descricao}</Text>
            <Text>Valor: {item.valor}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={meuestilo.containerlistar}>
      <FlatList data={servicos} renderItem={renderServico} keyExtractor={(item) => item.id} refreshing={isRefreshing} />
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
